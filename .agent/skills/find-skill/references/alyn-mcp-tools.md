# Alyn MCP tools

Server: `https://alyn.dev/mcp` (Streamable HTTP, no auth).

| Tool | Input | Returns | Use it to |
| --- | --- | --- | --- |
| `find_skills` | `task`: the task in one plain sentence. Optional `category`, `limit` | The 2 or 3 best skills with slug, author, stars and why they fit | Find candidates. Always the first call. |
| `load_skill` | `slug` | The full SKILL.md | Use the skill in this session. Follow it right after loading. |
| `skill_info` | `slug` | Author, license, stars, installs, files, other skills in the pack | Check a skill before relying on it. |
| `install_skill` | `slug`, optional `agent` | One shell command | Keep the skill for future sessions. Ask the user first. |
| `get_bundle` | optional `id` (design, engineering, founder, writer, seo-geo, marketing, documents, video, lean). Omit to list all | Every skill in the bundle | Set up a whole kind of work at once. |
| `top_skills` | optional `category` | The highest-ranked skills | Answer "what are the best skills for X". |

## Good task descriptions

| Weak | Better |
| --- | --- |
| "design" | "make the pricing page look less AI-generated" |
| "pdf" | "fill in a PDF form and keep the layout" |
| "seo" | "get this blog post cited in ChatGPT and Perplexity answers" |
| "tests" | "write tests first for a new payment webhook" |

Describe the outcome the user wants, not the tool. One sentence is enough.

## CLI equivalents

| MCP | CLI |
| --- | --- |
| `find_skills` | `npx alyn-cli find "<task>"` |
| `install_skill` | `npx alyn-cli add <slug>` |
| `get_bundle` | `npx alyn-cli add bundle:<id>` |
