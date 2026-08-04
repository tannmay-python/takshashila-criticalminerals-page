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
  "Narayan Ramachandran",
];

const expectedPositionText = [
  "Exploration is the bottleneck. Lowering its cost should make extraction projects more attractive.",
  "India’s e-waste stream already contains enough material to supply around 1,300 tonnes a year.",
  "Long-term offtake contracts can protect projects if China later floods the market and drives prices down.",
  "Classify minerals by supply and demand conditions, then match each group to an appropriate policy response.",
  "Private access to monazite sands would help India build LREE capacity more quickly.",
];

assert(
  !source.includes('id="approach"') && !source.includes("Our Approach"),
  "Removed approach section should not be present",
);

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

assert.equal(
  (source.match(/class="cm-media-card(?:\s|\")/g) ?? []).length,
  5,
  "Expected four video cards and one audio podcast card",
);

assert.equal(
  (source.match(/class="cm-media-card cm-media-card--video"/g) ?? []).length,
  4,
  "Expected four selected video cards",
);

assert.equal(
  (source.match(/class="cm-media-card__thumb"/g) ?? []).length,
  4,
  "Expected a thumbnail for every video card",
);

assert.equal(
  (source.match(/class="cm-event-card"/g) ?? []).length,
  3,
  "Expected three event cards",
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

assert(
  source.includes('id="media"') &&
    source.includes("India’s Rare Earth Strategy: Digging Beneath the Budget Announcements") &&
    source.includes("Are All Minerals Critical In The Same Way?") &&
    source.includes("The Geopolitics of Rare Earths") &&
    source.includes("Pranay Kotasthane on the Political Economy of Rare Earths and Critical Minerals"),
  "Missing video and podcast section",
);

assert(
  !source.includes("podcasts.apple.com/us/podcast/the-geopolitics-of-rare-earths") &&
    !source.includes("podcasts.apple.com/in/podcast/india-should-double-down-on-rare-earth-recycling") &&
    !source.includes("https://www.youtube.com/watch?v=8Fs8QXs7fo8"),
  "Unselected podcast uploads should not be featured",
);

assert(
  !source.includes("https://legion.takshashila.org.in/all-things-policy"),
  "The media heading should not link to All Things Policy",
);

assert(
  source.includes("Critical Minerals Desk") &&
    source.includes("The next edition is expected in September 2027") &&
    source.includes("Register your interest."),
  "Missing updated desk title or course availability details",
);

assert(
  source.includes('id="events"') &&
    source.includes("Critical Minerals: Strategic Importance and Challenges"),
  "Missing events section",
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
