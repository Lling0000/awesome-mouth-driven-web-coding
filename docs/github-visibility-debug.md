# GitHub Visibility Debugging

Use this when the repository is marked public in authenticated GitHub API responses, but logged-out users see `404`.

## Expected State for a High-Star Repo

A public project should pass all three checks:

```bash
gh api repos/Lling0000/awesome-mouth-driven-web-coding --jq '{private,visibility,disabled,archived,html_url}'
curl -I -L https://github.com/Lling0000
curl -I -L https://github.com/Lling0000/awesome-mouth-driven-web-coding
```

Expected:

- `private` is `false`.
- `visibility` is `public`.
- logged-out `curl` or browser visits return `200`, not `404`.

## Current Symptom Pattern

If authenticated API reports the repository as public but anonymous requests return `404`, the problem is above repository visibility. Check the account/profile namespace.

```bash
gh api user --jq '{login,id,type,user_view_type,public_repos,total_private_repos}'
curl -sS -o /tmp/gh-user.json -w '%{http_code}\n' https://api.github.com/users/Lling0000
curl -sS -o /tmp/gh-repo.json -w '%{http_code}\n' https://api.github.com/repos/Lling0000/awesome-mouth-driven-web-coding
curl -sS -o /tmp/gh-readme.md -w '%{http_code}\n' -L https://raw.githubusercontent.com/Lling0000/awesome-mouth-driven-web-coding/main/README.md
```

If `gh api user` shows `user_view_type: "private"`, first check the GitHub UI:

```text
Settings -> Public profile -> Contributions & Activity -> Make profile private and hide activity
```

Turn that setting off, then rerun the logged-out checks.

## Why Repo Visibility Alone Is Not Enough

`gh repo edit --visibility public` only controls the repository. If the account namespace itself is hidden, restricted, flagged, or otherwise not visible to logged-out users, public repositories under that namespace can still appear as `404` externally.

That state may look like this:

```json
{
  "private": false,
  "visibility": "public",
  "html_url": "https://github.com/Lling0000/awesome-mouth-driven-web-coding"
}
```

while logged-out checks still return:

```text
https://api.github.com/users/Lling0000 -> 404
https://api.github.com/repos/Lling0000/awesome-mouth-driven-web-coding -> 404
https://github.com/Lling0000/awesome-mouth-driven-web-coding -> 404
```

## Support Template

If the UI setting is already off, send this to GitHub Support:

```text
Account: Lling0000
Repository: Lling0000/awesome-mouth-driven-web-coding

Authenticated API shows:
- user exists
- repository private=false
- repository visibility=public
- repository disabled=false
- repository archived=false
- default branch=main

Unauthenticated requests return 404:
- https://api.github.com/users/Lling0000
- https://api.github.com/repos/Lling0000/awesome-mouth-driven-web-coding
- https://github.com/Lling0000
- https://github.com/Lling0000/awesome-mouth-driven-web-coding
- https://raw.githubusercontent.com/Lling0000/awesome-mouth-driven-web-coding/main/README.md

Please check whether the account or namespace has a visibility restriction,
spam/abuse flag, moderation hold, trust restriction, or other account-level
setting that hides public repositories from logged-out users.
```

Support entry points:

- GitHub Support: https://support.github.com/
- GitHub Appeal and Reinstatement: https://support.github.com/request/reinstate

## Temporary Workaround

If promotion cannot wait, mirror the repository to another normal public GitHub account or organization that passes the logged-out checks. If the restriction is account-level, creating another public repository under the same account will usually keep the same `404` symptom.
