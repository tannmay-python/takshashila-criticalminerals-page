import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../index.qmd", import.meta.url), "utf8");
const workflow = await readFile(
  new URL("../.github/workflows/deploy-pages.yml", import.meta.url),
  "utf8",
);

const expectedTeam = [
  "Pranay Kotasthane",
  "Shobhankita Reddy",
  "Tannmay Kumarr Baid",
];

const expectedPositionText = [
  "Exploration is the leverage point. Reducing the costs of exploration will, in turn, increase interest in extraction.",
  "Urban mining can turn India’s growing e-waste stream into a domestic source of rare earths.",
  "Providing long-term offtake guarantees will help cushion investment against China flooding the critical minerals market later.",
  "Classifying critical minerals into categories based on supply-demand variables can lead to a sharper solution set.",
  "Allowing the private sector to access monazite sands is the quickest path for building LREE capacity domestically.",
];

for (const name of expectedTeam) {
  assert(source.includes(name), `Missing team member: ${name}`);
}

for (const text of expectedPositionText) {
  assert(source.includes(text), `Missing supplied position text: ${text}`);
}

assert.equal(
  (source.match(/<details class="cm-position"/g) ?? []).length,
  5,
  "Expected five policy positions",
);

assert.equal(
  (source.match(/class="cm-content-card"/g) ?? []).length,
  20,
  "Expected six research cards and fourteen analysis cards",
);

assert(
  source.includes(
    "https://takshashila.org.in/pages/policy-school/ecc-critical-minerals.html",
  ),
  "Missing critical minerals course link",
);

assert(
  source.includes("https://indiacriticalminerals.com/"),
  "Missing critical minerals dashboard link",
);

assert(
  source.includes('id="featured-research"') &&
    source.includes('class="cm-featured__panel"'),
  "Missing featured research section",
);

const researchSection = source.slice(
  source.indexOf('id="research"'),
  source.indexOf('id="analysis"'),
);

assert(
  !researchSection.includes("India Critical Minerals Dashboard"),
  "Dashboard should not be duplicated in the standard research carousel",
);

assert(
  source.includes("The first edition brought together 65 students"),
  "Missing first-course-edition cohort detail",
);

assert(
  source.includes("India’s reliance on China for critical minerals"),
  "Missing Rakshith Shetty's The Hindu analysis",
);

assert(
  source.includes("India, EU forge mineral diplomacy"),
  "Missing Shobhankita Reddy's Deccan Herald analysis",
);

assert(
  !source.includes("cm-position-sources"),
  "Duplicated policy-source box should not be present",
);

assert(!source.includes("generated_images"), "Generated imagery must not be used");
assert(
  workflow.includes("actions/deploy-pages@v4"),
  "GitHub Pages deployment step is missing",
);

console.log("Content and deployment checks passed.");
