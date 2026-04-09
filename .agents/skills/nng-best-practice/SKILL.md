---
name: nng-best-practice
description: Nielsen Norman Group UX best practices covering 10 usability heuristics and 10 common application-design mistakes. Use when reviewing UI/UX designs, conducting heuristic evaluations, or checking for common usability issues in application interfaces.
---

# NN/g UX Best Practices

Quick-reference checklist combining Jakob Nielsen's 10 Usability Heuristics and NN/g's Top 10 Application-Design Mistakes.

## 10 Usability Heuristics

> Source: [10 Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/) — Jakob Nielsen, 1994 (updated 2024)

| # | Heuristic | Summary |
|---|-----------|---------|
| 1 | **Visibility of System Status** | Keep users informed about what is going on through timely, appropriate feedback. |
| 2 | **Match Between System and Real World** | Use the user's language, follow real-world conventions, present information in a natural and logical order. |
| 3 | **User Control and Freedom** | Provide clearly marked "emergency exits" — support Undo, Redo, and Cancel so users never feel trapped. |
| 4 | **Consistency and Standards** | Follow platform and industry conventions; don't make users wonder whether different words or actions mean the same thing. |
| 5 | **Error Prevention** | Eliminate error-prone conditions or present confirmation options before committing destructive actions. Prevent slips (inattention) and mistakes (mental-model mismatch). |
| 6 | **Recognition Rather than Recall** | Minimise memory load — make elements, actions, and options visible or easily retrievable instead of forcing users to remember. |
| 7 | **Flexibility and Efficiency of Use** | Provide accelerators (shortcuts, gestures) for experts while keeping the UI learnable for novices. Allow customisation. |
| 8 | **Aesthetic and Minimalist Design** | Every extra piece of information competes with relevant information. Keep content and visuals focused on essentials. |
| 9 | **Help Users Recognize, Diagnose, and Recover from Errors** | Express errors in plain language, precisely indicate the problem, and constructively suggest a solution. |
| 10 | **Help and Documentation** | Provide searchable, task-focused, concise documentation with concrete steps — ideally in context when the user needs it. |

## Top 10 Application-Design Mistakes

> Source: [Top 10 Application-Design Mistakes](https://www.nngroup.com/articles/top-10-application-design-mistakes/) — Jakob Nielsen & Page Laubheimer, 2019

| # | Mistake | What to do instead |
|---|---------|---------------------|
| 1 | **Poor Feedback** | Show system state clearly — indicate what is editable, confirm actions, reflect selections. Use spinners (2–10 s) or progress bars (>10 s) for long operations. |
| 2 | **Inconsistency** | Use the same words, placement, and interaction patterns for the same actions everywhere. Don't hide why a feature is unavailable. |
| 3 | **Bad Error Messages** | Never show only "Something went wrong." Explain *what* happened, *why*, and *how* to fix it. |
| 4 | **No Default Values** | Pre-fill forms with smart defaults (most common choice, last-used value). Use steppers for small numeric adjustments. |
| 5 | **Unlabeled Icons** | Always pair icons with text labels — increases target size, speeds recognition, aids learning, and improves differentiation. |
| 6 | **Hard-to-Acquire Targets** | Use strong visual signifiers (not ultra-flat) so users can tell what is clickable. Make click/tap targets large enough to hit reliably. |
| 7 | **Overuse of Modals** | Avoid covering context users need to reference. Prefer inline editing or side panels over full-screen modals when users need to see surrounding data. |
| 8 | **Meaningless Information** | Don't lead with auto-generated IDs or codes. Show human-readable information first; push technical identifiers to secondary positions. |
| 9 | **Junk-Drawer Menus** | Don't dump uncategorised features into "More" or "…" menus. Organise by user intent; improve information scent of menu labels. |
| 10 | **Proximity of Destructive and Confirmation Actions** | Separate "Save" from "Delete/Discard" — use distance, colour, and size differences to prevent accidental destructive actions. |

## Quick Review Checklist

When reviewing a UI, verify:

- [ ] System state and feedback are always visible (H1, M1)
- [ ] Language matches user's mental model (H2)
- [ ] Undo/Cancel/Back are always available (H3)
- [ ] Interactions are consistent across the app (H4, M2)
- [ ] Error-prone paths have guards or confirmations (H5, M10)
- [ ] No heavy recall burden — options are visible (H6)
- [ ] Power-user shortcuts exist without hurting novices (H7)
- [ ] UI is free of visual noise and irrelevant data (H8, M8)
- [ ] Error messages explain cause and suggest fix (H9, M3)
- [ ] Contextual help is available (H10)
- [ ] Forms have smart defaults (M4)
- [ ] Icons have text labels (M5)
- [ ] Click targets are large and visually distinct (M6)
- [ ] Modals don't hide needed context (M7)
- [ ] Menus have clear, descriptive labels (M9)
