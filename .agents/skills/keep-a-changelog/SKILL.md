---
name: keep-a-changelog
description: Maintain a CHANGELOG.md following the Keep a Changelog 1.1.0 standard. Use when updating the changelog, adding changelog entries, preparing a release, or when user mentions "changelog".
---

# Keep a Changelog

Maintain `CHANGELOG.md` at the repository root following the [Keep a Changelog v1.1.0](https://keepachangelog.com/en/1.1.0/) standard.

## Format

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- New feature description.

## [1.0.0] - 2025-01-15

### Added

- Initial release feature.

[unreleased]: https://github.com/owner/repo/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/owner/repo/releases/tag/v1.0.0
```

## Change Types

Only use these exact headings, in this order:

- **Added** — new features
- **Changed** — changes in existing functionality
- **Deprecated** — soon-to-be removed features
- **Removed** — now removed features
- **Fixed** — bug fixes
- **Security** — vulnerability fixes

Omit any section that has no entries for a given version.

## Rules

1. Always keep an `[Unreleased]` section at the top for upcoming changes.
2. One entry per notable change — not per commit.
3. Write entries for humans, not machines. Be clear and concise.
4. Use ISO 8601 date format: `YYYY-MM-DD`.
5. Latest version comes first (reverse chronological).
6. Each version heading must be linkable: `## [x.y.z] - YYYY-MM-DD`.
7. Add comparison links at the bottom of the file for every version.
8. At release time, move `[Unreleased]` entries into a new version section and update links.
9. Mark yanked releases with `## [x.y.z] - YYYY-MM-DD [YANKED]`.

## Workflow

When asked to update the changelog:

1. Read the existing `CHANGELOG.md`.
2. Add entries under `[Unreleased]` in the appropriate change type section.
3. Create missing change type sections as needed.
4. Keep entries concise — one line per change.
5. Do NOT duplicate existing entries.

When preparing a release:

1. Replace `[Unreleased]` entries with a new version heading: `## [x.y.z] - YYYY-MM-DD`.
2. Add a fresh empty `[Unreleased]` section above it.
3. Update the comparison links at the bottom of the file.
