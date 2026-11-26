// The Robot Vacuum's Funniest Excuse — make.fun entry.
// Writes one line (<=120 chars) to /output/entry.txt: the excuse a robot
// vacuum gives for missing a spot. Node 22, stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// The line itself: first-person vacuum voice, a dust-bunny picket line.
const LINE =
  "I skipped that corner because the dust bunny there unionized, and I don't cross picket lines.";

function gate(line) {
  // Count characters as Unicode code points, not UTF-16 units.
  const length = [...line].length;
  if (typeof line !== "string" || length < 1 || length > 120) {
    throw new Error(`entry must be 1-120 characters, got ${length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
}

gate(LINE);
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, LINE, "utf8");

// Read the file back and confirm it is byte-identical to the gated line.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== LINE) {
  throw new Error("written entry does not match the gated line");
}
console.log(`wrote ${OUT_FILE} (${[...LINE].length} characters)`);
