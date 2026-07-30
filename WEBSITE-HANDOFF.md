# Moving this page into the Takshashila website

## What the website is

The current Takshashila website is a Quarto website. Its editable pages are primarily `.qmd` files, which combine Markdown, YAML frontmatter, and occasional raw HTML. The Drive folder supplied for this project contains:

- `starter_kit/`: Quarto configuration, shared templates, includes, and the Takshashila SCSS theme.
- `content/`: publications, blogs, team profiles, programmes, and their images.
- `_quarto.yml` and `_metadata.yml`: global build configuration and defaults.

The live Space Power page follows this pattern:

1. A programme-page title block.
2. An approach section.
3. A custom Quarto publication listing rendered as a horizontal carousel.
4. A custom team listing.
5. A course callout.

This repository reproduces that pattern in a self-contained Quarto project so it can be reviewed on GitHub Pages without requiring the entire private website source.

## Recommended production location

Create this path in the main website source:

```text
pages/research-areas/focus-areas/critical-minerals.qmd
```

Copy the body of `index.qmd` into that file. In the main site, remove the preview-only outer navigation/footer configuration because those are already supplied globally by Takshashila's `_quarto.yml` and shared includes.

Copy these official profile images only if they are not already present:

```text
content/team/images/Pranay_Kotasthane.png
content/team/images/Shobhankita_Reddy.png
content/team/images/Tannmay_Kumarr_Baid.png
```

## Listings

The GitHub Pages preview hard-codes the selected research, op-eds, and team members so it renders independently. The production page can initially keep these explicit links. This is the lowest-risk path.

If the website maintainers want automatic listings like Space Power, replace the hard-coded carousels with custom Quarto listings filtered by a shared metadata value such as:

```yaml
research_areas:
  - Critical Minerals
```

That metadata would then need to be added consistently to every included publication, blog, and team `.qmd` source. A dedicated listing template can reuse the Space Power `content-card` and `team-member-card` templates.

## Shared styles

The production site already loads `assets/css/takshashila-base-20260723.css`. Move only the rules prefixed with `.cm-` from `styles.css` into the site's relevant research-area stylesheet, or add `styles.css` to the page frontmatter. Do not duplicate the navbar, footer, global font, or base token rules.

## Build and verify

From the full website source:

```bash
quarto render pages/research-areas/focus-areas/critical-minerals.qmd
```

Then open:

```text
_site/pages/research-areas/focus-areas/critical-minerals.html
```

Check the desktop and mobile layouts, every external article link, all team profile links, the dashboard link, and the course call-to-action before publishing.
