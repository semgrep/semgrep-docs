# Thanks for improving Semgrep Docs 😀

### Please ensure

- [ ] A subject matter expert (SME) reviews the content
- [ ] A technical writer reviews the content or PR
- [ ] This change has no security implications or else you have pinged the security team
- [ ] Redirects are added if the PR changes page URLs
- [ ] If you have changed any header tag links (doc/#this-kind-of-anchor), update all instances of that link

---

<details>
<summary>Adding a new documentation page? Click to expand the checklist </summary>

- [ ] Create `.md` or `.mdx` file in `/docs/[section]/` with frontmatter: `slug`, `title`, `description`, `displayed_sidebar`, `tags`
- [ ] Add page to appropriate sidebar in `/sidebars.js` (shows in side nav)
- [ ] **If adding the doc in a new directory:** Update `/src/theme/Navbar/Content/index.tsx` → add path to `getCurrentSection()` (highlights top nav)

Sidebars fields for `displayed_sidebar`:
`scanSidebar` | `rulewritingSidebar` | `devSidebar` | `learnSidebar` | `aboutSidebar` | `kbSidebar` | `whatsSemgrepSidebar`

Top nav fields for `getCurrentSection()`:
`'scan'` | `'write-rules'` | `'learning-guides'` | `'help'` | `'explore'`

</details>
