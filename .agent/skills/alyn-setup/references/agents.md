# Agent targets

Pass `-a <id>` to install for one agent only. Without it, the CLI asks or detects the agents in the project.

| Agent | `-a` value | Installs to |
| --- | --- | --- |
| Claude Code | `claude-code` | `.claude/skills/` |
| Cursor | `cursor` | `.agents/skills/` |
| Codex | `codex` | `.agents/skills/` |
| GitHub Copilot | `github-copilot` | `.agents/skills/` |
| Gemini CLI | `gemini-cli` | `.agents/skills/` |
| Windsurf | `windsurf` | `.agents/skills/` |
| OpenCode | `opencode` | `.agents/skills/` |

Add `-g` to install into the user folder so the skills work in every project, and `-y` to skip the prompts.

```bash
npx alyn-cli add bundle:design -a claude-code -g -y
```

Claude on the web, desktop and mobile has no folder to install into. There, connect Alyn MCP instead and the skills load on demand: Settings › Connectors › Add custom connector › `https://alyn.dev/mcp`.
