from __future__ import annotations

import argparse
import json
import platform
import sys
from datetime import datetime, timezone
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

from playwright.sync_api import Browser, Page, expect, sync_playwright

ROOT = Path(__file__).resolve().parents[1]
WIDTHS = (320, 390, 768, 1024, 1440, 1920)


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format: str, *args: object) -> None:
        pass


def main() -> int:
    parser = argparse.ArgumentParser(description="Render and exercise the interface studies.")
    parser.add_argument("--chromium", type=str)
    parser.add_argument("--render-only", action="store_true")
    parser.add_argument("--output", type=Path, default=ROOT / "evidence" / "generated")
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    results: list[dict[str, object]] = []
    skipped: list[str] = []
    server: ThreadingHTTPServer | None = None
    base = ""

    if not args.render_only:
        handler = partial(QuietHandler, directory=str(ROOT))
        server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
        Thread(target=server.serve_forever, daemon=True).start()
        base = f"http://127.0.0.1:{server.server_port}"
    else:
        skipped.extend([
            "Real HTTP navigation and link-following",
            "Object and sound deep links, Back, Forward, and reload integration",
            "Persistent browser storage across navigation and browser restart",
        ])

    def check(name: str, condition: bool, details: str = "") -> None:
        results.append({"name": name, "passed": bool(condition), "details": details})
        if not condition:
            raise AssertionError(name + (": " + details if details else ""))

    def open_page(browser: Browser, name: str, query: str = "", corrupt_store: bool = False) -> tuple[Page, list[str]]:
        page = browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=1)
        errors: list[str] = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        if corrupt_store:
            injection = "Object.defineProperty(window, 'localStorage', {value: {getItem(){return '{broken'},setItem(){}}, configurable:true})"
            if args.render_only:
                page.evaluate(injection)
            else:
                page.add_init_script(injection)
        relative = "index.html" if name == "index" else f"{name}/index.html"
        if args.render_only:
            page.set_content((ROOT / relative).read_text(), wait_until="load")
        else:
            page.goto(f"{base}/{relative}{query}", wait_until="load")
        return page, errors

    exit_code = 0
    browser_version = "not launched"
    try:
        with sync_playwright() as playwright:
            options = {"args": ["--no-sandbox"]}
            if args.chromium:
                options["executable_path"] = args.chromium
            browser = playwright.chromium.launch(**options)
            browser_version = browser.version
            for name in ("index", "objects", "listening"):
                page, errors = open_page(browser, name)
                check(f"{name}: one main landmark", page.locator("main").count() == 1)
                check(f"{name}: one page heading", page.locator("h1").count() == 1)
                check(f"{name}: no duplicate IDs", page.evaluate("new Set([...document.querySelectorAll('[id]')].map(el=>el.id)).size === document.querySelectorAll('[id]').length"))
                check(f"{name}: all buttons have names", page.evaluate("[...document.querySelectorAll('button')].every(el => (el.getAttribute('aria-label') || el.textContent).trim().length > 0)"))
                page.screenshot(path=str(args.output / f"{name}-desktop.png"), full_page=True)
                for width in WIDTHS:
                    page.set_viewport_size({"width": width, "height": 900})
                    check(f"{name}: no horizontal overflow at {width}px", page.evaluate("document.documentElement.scrollWidth <= innerWidth"))
                    if width == 390:
                        page.screenshot(path=str(args.output / f"{name}-mobile.png"), full_page=True)
                check(f"{name}: no JavaScript exceptions", not errors, "; ".join(errors))
                page.close()

            page, errors = open_page(browser, "objects")
            page.get_by_role("button", name="Moss finish", exact=True).click()
            check("objects: finish changes artwork and accessible description", "moss" in page.locator("#hero-art").get_attribute("aria-label") and page.locator("#finish-name").inner_text() == "Moss")
            page.get_by_role("switch").uncheck()
            check("objects: light changes visible and accessible state", "off" in page.locator("#hero-art").get_attribute("aria-label") and "light-on" not in page.locator("#hero-art").get_attribute("class"))
            opener = page.get_by_role("button", name="A closer look", exact=True)
            opener.click()
            expect(page.get_by_role("dialog", name="Luma", exact=True)).to_be_visible()
            check("objects: detail receives initial focus", page.get_by_role("button", name="Close object details").evaluate("el => el === document.activeElement"))
            for key in ("Tab", "Tab", "Shift+Tab", "Tab"):
                page.keyboard.press(key)
                check(f"objects: dialog focus containment {key} step {len(results)}", page.evaluate("document.activeElement.closest('dialog')?.id === 'detail'"))
            page.get_by_role("button", name="Save object", exact=True).click()
            check("objects: save updates collection", page.locator("#saved-count").inner_text() == "1")
            check("objects: confirmation is inside the modal", bool(page.locator("#detail-status").inner_text()))
            if args.render_only:
                check("objects: unavailable storage is explained", "storage is unavailable" in page.locator("#detail-status").inner_text())
            expect(page.get_by_role("button", name="Remove from collection", exact=True)).to_have_attribute("aria-pressed", "true")
            page.screenshot(path=str(args.output / "objects-detail.png"), full_page=True)
            page.keyboard.press("Escape")
            expect(page.locator("#detail")).not_to_be_visible()
            check("objects: Escape restores originating focus", opener.evaluate("el => el === document.activeElement"))
            if not args.render_only:
                page.reload()
                check("objects: saved collection survives reload", page.locator("#saved-count").inner_text() == "1")
            page.locator("#open-saved").click()
            page.get_by_role("button", name="Remove Luma from collection").click()
            check("objects: removal and empty state", page.locator("#saved-count").inner_text() == "0" and "Nothing here yet" in page.locator("#saved-content").inner_text())
            check("objects: removal preserves a useful focus target", page.locator("#saved-title").evaluate("el => el === document.activeElement"))
            page.screenshot(path=str(args.output / "objects-empty.png"), full_page=True)
            page.get_by_role("button", name="Explore objects", exact=True).click()
            check("objects: empty state leads to the collection", page.locator(".object-open").first.evaluate("el => el === document.activeElement"))
            arc = page.get_by_role("button", name="Explore Arc occasional stool")
            arc.click()
            expect(page.get_by_role("dialog", name="Arc", exact=True)).to_be_visible()
            page.emulate_media(reduced_motion="reduce")
            check("objects: reduced motion removes dialog animation", page.locator("#detail").evaluate("el => getComputedStyle(el).animationName === 'none'"))
            page.keyboard.press("Escape")
            check("objects: a different trigger gets its own focus back", arc.evaluate("el => el === document.activeElement"))
            check("objects: interaction path has no JavaScript exceptions", not errors, "; ".join(errors))
            page.close()

            page, errors = open_page(browser, "objects", corrupt_store=True)
            check("objects: malformed saved state is safely ignored", page.locator("#saved-count").inner_text() == "0" and not errors)
            page.close()

            page, errors = open_page(browser, "listening")
            check("listening: no audio context or playback on load", page.evaluate("context === null && playing === false"))
            page.locator("#play").click()
            expect(page.locator("#status")).to_have_text("Playing Blue hour.")
            page.wait_for_timeout(350)
            check("listening: audio clock advances", page.evaluate("playing && context.state === 'running' && position() > .1"))
            page.evaluate("window.testAnalyser=context.createAnalyser();output.connect(window.testAnalyser)")
            page.wait_for_timeout(100)
            signal = page.evaluate("(()=>{const samples=new Float32Array(window.testAnalyser.fftSize);window.testAnalyser.getFloatTimeDomainData(samples);return [...samples].some(value=>Math.abs(value)>.00001)})()")
            check("listening: synthesizer produces a nonzero audio signal", signal, "Digital signal only. This does not verify speaker output or listening quality.")
            page.locator("#play").click()
            paused_at = page.evaluate("position()")
            page.wait_for_timeout(150)
            check("listening: pause holds position", page.evaluate("!playing") and abs(page.evaluate("position()") - paused_at) < .01)
            page.locator("#seek").fill("10")
            check("listening: seeking while paused updates position", abs(page.evaluate("position()") - 10) < .2)
            page.locator("#play").click()
            expect(page.locator("#status")).to_have_text("Playing Blue hour.")
            check("listening: playback resumes from the selected position", page.evaluate("position() >= 10"))
            page.locator("#mute").click()
            check("listening: mute changes control state", page.locator("#mute").get_attribute("aria-pressed") == "true" and page.evaluate("muted"))
            page.locator("#mute").click()
            page.locator("#volume").fill("20")
            check("listening: volume changes application gain setting", page.evaluate("volume === .2 && !muted"))
            page.get_by_role("button", name="Play Soft focus", exact=True).click()
            expect(page.locator("#status")).to_have_text("Playing Soft focus.")
            check("listening: track change updates artwork and timing", page.locator("#cover-title").inner_text() == "Soft focus" and page.locator("#seek").get_attribute("max") == "32")
            page.screenshot(path=str(args.output / "listening-soft-focus.png"), full_page=True)
            page.locator("#next").click()
            expect(page.locator("#status")).to_have_text("Playing First light.")
            check("listening: next preserves playing state", page.evaluate("playing && index === 2"))
            page.locator("#play").click()
            page.locator("#previous").click()
            check("listening: previous preserves paused state", page.evaluate("!playing && index === 1"))
            page.locator("#play").click()
            page.locator("#seek").fill("31.8")
            page.wait_for_timeout(450)
            check("listening: piece ends without autoplaying another", page.evaluate("!playing && index === 1 && offset === 32"))
            page.locator("#about-open").click()
            page.keyboard.press("Escape")
            check("listening: about dialog restores focus", page.locator("#about-open").evaluate("el => el === document.activeElement"))
            check("listening: interaction path has no JavaScript exceptions", not errors, "; ".join(errors))
            page.close()

            page, errors = open_page(browser, "listening")
            page.evaluate("window.AudioContext=undefined;window.webkitAudioContext=undefined")
            page.locator("#play").click()
            expect(page.locator("#status")).to_contain_text("Sound could not start")
            check("listening: audio failure retains an enabled retry", page.locator("#play").is_enabled() and not errors)
            page.close()

            if not args.render_only:
                page, errors = open_page(browser, "objects", "?object=fold")
                expect(page.get_by_role("dialog", name="Fold", exact=True)).to_be_visible()
                page.keyboard.press("Escape")
                check("objects: direct-linked dialog closes without leaving page", "object=" not in page.url)
                page.get_by_role("button", name="A closer look", exact=True).click()
                page.go_back()
                expect(page.locator("#detail")).not_to_be_visible()
                page.go_forward()
                expect(page.get_by_role("dialog", name="Luma", exact=True)).to_be_visible()
                check("objects: browser Back and Forward synchronize dialog", not errors)
                page.close()
                page, errors = open_page(browser, "listening", "?sound=first-light")
                check("listening: deep link selects without autoplay", page.locator("#cover-title").inner_text() == "First light" and page.evaluate("context === null && !playing"))
                page.locator("#next").click()
                page.go_back()
                check("listening: Back restores selection without autoplay", page.locator("#cover-title").inner_text() == "First light" and page.evaluate("!playing"))
                page.close()
            browser.close()
    except Exception as error:
        results.append({"name": "run completed", "passed": False, "details": f"{type(error).__name__}: {error}"})
        exit_code = 1
    finally:
        if server:
            server.shutdown()
            server.server_close()
        report = {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "mode": "in-memory rendering" if args.render_only else "local HTTP",
            "browser": f"Chromium {browser_version}",
            "platform": platform.platform(),
            "widths": WIDTHS,
            "checks": results,
            "not_run": skipped + [
                "Physical-device audio and mobile virtual keyboards",
                "Safari, Firefox, screen-reader testing, and complete accessibility audit",
                "Human preference study or claim of aesthetic superiority",
            ],
        }
        (args.output / "report.json").write_text(json.dumps(report, indent=2) + "\n")
        passed = sum(item["passed"] is True for item in results)
        print(f"{passed}/{len(results)} checks passed in {report['mode']} mode.")
        print(f"Report and screenshots: {args.output.resolve()}")
        if exit_code:
            print(results[-1]["details"], file=sys.stderr)
    return exit_code


if __name__ == "__main__":
    raise SystemExit(main())
