# GitHub Profile Setup

Use these settings after the repository is pushed.

## Repository Name

```text
awesome-mouth-driven-web-coding
```

## Description

```text
口喷式 Web Coding：右 Command 调用千问语音，驱动 Codex / Cos / Claude Code，并用 SILL Agent 每日生成专有名词词典。Mouth-driven AI coding with Qianwen voice input and a daily lexicon agent.
```

## Website

Use the GitHub repository URL unless a GitHub Pages or demo site is later published.

## Topics

```text
claude-code
codex
lexicon-agent
speech-to-text
mouth-driven-coding
qianwen-voice
awesome
awesome-list
vibe-coding
ai-coding
voice-input
web-development
frontend
macos
qwen
tutorial
```

## Social Preview

Use `assets/hero.png` as the social preview image. It shows the real Qianwen voice input UI and makes the repo's promise obvious in the GitHub card.

## Visibility Sanity Check

After publishing, confirm both checks:

```bash
gh api user --jq '{login,user_view_type,public_repos}'
gh api repos/Lling0000/awesome-mouth-driven-web-coding --jq '{private,visibility,html_url}'
curl -I -L https://github.com/Lling0000/awesome-mouth-driven-web-coding
```

For a high-star public project, both the repository and the account/profile need to be publicly reachable. If GitHub CLI reports `private: false` and `visibility: public` but a logged-out browser or curl still shows `404`, check the account-level `user_view_type` first.

If it returns:

```json
{"user_view_type":"private"}
```

open GitHub in a logged-in browser and check:

```text
Settings -> Public profile -> Contributions & Activity -> Make profile private and hide activity
```

Turn that private-profile setting off, then rerun the logged-out curl check. If `user_view_type` stays private after changing the UI, contact GitHub Support before promoting the repo.

If the repository still returns `404` to logged-out users, use the checklist and support template in [GitHub visibility debugging](github-visibility-debug.md).

## One-Line Pitch

```text
Hold right Command. Speak into your AI agent. Let SILL Agent turn your history into tomorrow's Qianwen lexicon.
```
