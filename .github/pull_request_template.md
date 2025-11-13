# Thanks for improving Semgrep Docs 😀

### Please ensure

- [ ] A subject matter expert (SME) reviews the content
- [ ] A technical writer reviews the content or PR
- [ ] This change has no security implications or else you have pinged the security team
- [ ] Redirects are added if the PR changes page URLs
- [ ] If you have changed any header tag links (doc/#this-kind-of-anchor), update all instances of that link

---

<details>
<summary><b>Adding a new documentation page?</b> Click to expand the checklist </summary>

- [ ] Created `.md` or `.mdx` file in `/docs/[section]/` with frontmatter: `slug`, `title`, `description`, `displayed_sidebar`, `tags`
- [ ] Added page to appropriate sidebar in `/sidebars.js`
- [ ] **If adding the doc in a new directory:** Updated `/src/theme/Navbar/Content/index.tsx` → added path to `getCurrentSection()`

Sidebars fields for `displayed_sidebar`:
`scanSidebar` | `rulewritingSidebar` | `devSidebar` | `learnSidebar` | `aboutSidebar` | `kbSidebar` | `whatsSemgrepSidebar`

Top Nav fields for `getCurrentSection()`:
`'scan'` | `'write-rules'` | `'learning-guides'` | `'help'` | `'explore'`

</details>
