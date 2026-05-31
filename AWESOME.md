# Awesome Mouth-Driven Web Coding

Curated resources for driving AI coding tools by voice: speak into Codex, Cos, Claude Code, Cursor, an AI IDE, or a terminal, then let the agent execute, verify, and ship.

## Rules for This List

- Every resource must help with voice-first AI execution, web building, frontend quality, design judgment, or shipping.
- Every item needs a one-sentence reason.
- No pure ads, no untested tool dumps, no AI-generated bulk lists.
- Prefer resources with clear docs, examples, and active maintenance.

## AI Coding Tools

- [Codex](https://openai.com/codex/) - Useful when you want a voice-driven agent to edit files, run checks, and keep the implementation loop inside a local workspace.
- [Claude Code](https://www.anthropic.com/claude-code) - A terminal-based coding agent that fits the mouth-driven style because spoken tasks can become direct terminal instructions.
- [Cursor](https://cursor.com/) - A popular AI editor for speaking product-level changes into an existing codebase.
- [GitHub Copilot](https://github.com/features/copilot) - Works well for incremental code completion and explaining small edits inside familiar editors.
- [StackBlitz](https://stackblitz.com/) - Good for quick browser-based web experiments without local setup.

## Voice Input and macOS

- [Qianwen](https://www.qianwen.com/) - The Qwen-powered assistant ecosystem used in this tutorial.
- [Qianwen download](https://www.qianwen.com/download) - Official download page for the Qianwen desktop client.
- [Apple Dictation](https://support.apple.com/guide/mac-help/use-dictation-mh40584/mac) - Built-in fallback when you need basic speech-to-text without extra tools.

## Lexicon and Agent Flywheels

- [SILL Agent](docs/en/LEXICON_AGENT.md) - This repo's local prototype for turning spoken history into a reusable Qianwen lexicon.
- [Base terms](lexicons/qianwen/base-terms.txt) - Seed vocabulary for product names, AI tools, shortcuts, and domain-specific words.
- [Daily lexicon output](lexicons/qianwen/daily/2026-05-31.txt) - Example of a generated import-ready word list.
- [Qianwen import pack](lexicons/qianwen/import/latest-import-pack.md) - Reviewable handoff for copying or importing generated terms into Qianwen.
- [LaunchAgent template](automation/com.awesome-mouth-driven-web-coding.lexicon.plist) - macOS automation template for daily lexicon and import-pack generation.

## Web Fundamentals

- [MDN Web Docs](https://developer.mozilla.org/) - The most reliable reference for HTML, CSS, JavaScript, browser APIs, and accessibility.
- [web.dev](https://web.dev/) - Practical guidance for performance, responsive design, forms, and modern web quality.
- [The Odin Project](https://www.theodinproject.com/) - A structured path for learners who want deeper web fundamentals beyond AI-generated snippets.
- [freeCodeCamp](https://www.freecodecamp.org/) - Good for practice-driven HTML, CSS, JavaScript, and deployment basics.

## UI and Component Inspiration

- [shadcn/ui](https://ui.shadcn.com/) - Great reference for modern component composition and copy-paste friendly UI structure.
- [Radix UI](https://www.radix-ui.com/) - Useful when you need accessible primitives behind polished components.
- [Tailwind CSS](https://tailwindcss.com/) - Helpful for describing visual changes in compact utility language.
- [Flowbite](https://flowbite.com/) - A practical source of common UI patterns that beginners can inspect and adapt.

## Visual Taste and Product Pages

- [Land-book](https://land-book.com/) - Useful for studying landing page structure, hierarchy, and hero sections.
- [Mobbin](https://mobbin.com/) - Great for learning how production apps handle flows, empty states, and component density.
- [Awwwards](https://www.awwwards.com/) - Good for visual inspiration, but use restraint when building practical product pages.
- [Refero](https://refero.design/) - Useful for finding real product UI references by page type.

## Icons, Images, and Assets

- [Lucide](https://lucide.dev/) - Clean open-source icons that work well in buttons, nav, and small UI controls.
- [Heroicons](https://heroicons.com/) - Simple SVG icons that pair nicely with Tailwind-style interfaces.
- [Unsplash](https://unsplash.com/) - Useful for real photos when a page needs product or lifestyle imagery.
- [unDraw](https://undraw.co/) - Helpful for lightweight illustrations when a screenshot or product image is unavailable.

## Deployment

- [Vercel](https://vercel.com/) - Fast path for deploying static and frontend apps from GitHub.
- [Netlify](https://www.netlify.com/) - Simple deploy previews and static site hosting for beginner projects.
- [GitHub Pages](https://pages.github.com/) - Good for zero-cost static demos directly from a GitHub repository.
- [Cloudflare Pages](https://pages.cloudflare.com/) - Strong free hosting option for static and frontend projects.

## High-Star README References

- [sindresorhus/awesome](https://github.com/sindresorhus/awesome) - The canonical reference for curated Awesome lists.
- [codecrafters-io/build-your-own-x](https://github.com/codecrafters-io/build-your-own-x) - Excellent example of a learning-by-building repository.
- [public-apis/public-apis](https://github.com/public-apis/public-apis) - Strong example of a searchable, table-driven resource list.
- [EbookFoundation/free-programming-books](https://github.com/EbookFoundation/free-programming-books) - Useful reference for multilingual learning-resource curation.
- [microsoft/Web-Dev-For-Beginners](https://github.com/microsoft/Web-Dev-For-Beginners) - Course-style README with clear learning path and beginner framing.
