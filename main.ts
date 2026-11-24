// Entry for make.fun bounty: u-febri-yudila-one-line-to-stop-the-scroll-e8b18425
// "One Line to Stop the Scroll" — one line of text, at most 200 characters,
// that makes a stranger stop scrolling and smile.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));

export const ENTRY =
  "My phone's screen time report called me \"brave\" for opening it at 3 a.m. again.";

// Rule: single line, at most 200 chars, no hidden whitespace or control chars.
export function validateEntry(entry: string): void {
  if (!entry || entry.trim().length === 0) {
    throw new Error("entry must not be empty");
  }
  if (entry.length > 200) {
    throw new Error(`entry is ${entry.length} chars, over the 200-char limit`);
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (entry.includes(" ")) {
    throw new Error("entry must not contain non-breaking spaces (U+00A0)");
  }
  if (/[\u0000-\u001F\u007F]/.test(entry)) {
    throw new Error("entry must not contain control characters");
  }
}

const entry = ENTRY;
validateEntry(entry);

const outDir = join(scriptDir, "output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, entry + "\n", "utf8");

// Verify byte-identical round-trip against output/entry.txt
const roundTrip = readFileSync(outPath, "utf8").trimEnd();
if (roundTrip !== entry) {
  throw new Error("round-trip mismatch: output/entry.txt does not match ENTRY");
}

console.log(entry);
