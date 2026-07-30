import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../index.qmd", import.meta.url), "utf8");
const links = [
  ...new Set(
    [...source.matchAll(/href="(https:\/\/[^"]+)"/g)].map((match) => match[1]),
  ),
];

const results = await Promise.all(
  links.map(async (url) => {
    try {
      const response = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
        signal: AbortSignal.timeout(15_000),
        headers: { "user-agent": "Takshashila link checker" },
      });
      return { url, status: response.status };
    } catch (error) {
      return { url, status: "unreachable", error: error.message };
    }
  }),
);

const broken = results.filter(({ status }) => status === 404 || status === 410);
const guarded = results.filter(
  ({ status }) =>
    status === "unreachable" || [401, 403, 405, 429].includes(status),
);

console.log(`Checked ${results.length} external links.`);
if (guarded.length) {
  console.log(
    `${guarded.length} links blocked or limited automated HEAD requests; these require browser validation.`,
  );
}

if (broken.length) {
  for (const result of broken) {
    console.error(`${result.status} ${result.url}`);
  }
  process.exitCode = 1;
} else {
  console.log("No 404 or 410 responses found.");
}
