# Mouth-Driven Web Coding Workflow

Mouth-driven coding is not “typing a better prompt.” It means **not typing at all**: hold right `Command`, invoke Qianwen voice input, speak directly into Codex, Cos, Claude Code, Cursor, VS Code, ChatGPT, an AI terminal, or any agent input box, and let the AI execute the task.

Web coding is simply the easiest way to show visible results. The deeper idea is:

> Your mouth becomes the keyboard. The AI tool becomes the executor.

## Core Loop

```text
Focus the input box -> hold right Command -> speak the task -> AI executes -> speak acceptance checks -> speak fixes -> speak delivery
```

## Step 1: Focus the Right Input Box

Open a place where the AI can actually do work:

- A Codex conversation.
- A Cos / Cursor / VS Code AI input box.
- Claude Code or another AI CLI in a terminal.
- ChatGPT, Qwen, or Claude in the browser.
- Any tool that accepts text and can trigger an AI workflow.

The tool name matters less than the cursor location. The cursor must be in the input box you want to drive.

## Step 2: Hold Right Command and Speak

The tested Qianwen UI shows this shortcut hint:

```text
Hold right Command to use voice input anywhere.
```

Hold right `Command`, speak the task, and release. Qianwen turns your speech into text in the active input box.

## Step 3: Speak an Executable Task

Do not just describe an idea. Tell the AI how to execute.

```text
Work directly in the current folder.
First inspect the file structure, then create a one-page website demo.
The topic is a time-tracking tool for freelancers.
After writing the files, open or screenshot the page and check that mobile has no horizontal overflow.
Finally summarize the files you changed.
```

This is better than “build me a website” because it includes context, action, acceptance, and delivery.

## Step 4: Ask the AI to Plan, Then Act

```text
Give me a three-step plan first.
After the plan, start editing files directly.
Do not ask low-value questions if you can infer the answer from the current folder.
```

This works especially well with agents that can read files, edit files, and run commands.

## Step 5: Speak Acceptance Checks

When the AI finishes, keep using voice:

```text
Open a preview screenshot and check for text overflow.
Check whether the README includes run instructions and screenshots.
Run git status and summarize what changed.
```

The point is to drive the whole loop by conversation, including verification.

## Step 6: Speak Fixes

```text
The mobile headline is cramped.
Only fix the hero section.
Do not refactor the whole page.
After the fix, capture the screenshot again.
```

A good spoken fix includes:

- The problem.
- The boundary.
- The acceptance check.

## Step 7: Speak Delivery

```text
Commit this change.
Use the commit message docs: add mouth-driven web coding guide.
Push it to GitHub and verify that the remote link opens.
```

If the tool has permissions, it can execute. If not, it should tell you the exact blocker.

## Useful Spoken Templates

| Goal | Say this |
| --- | --- |
| Hand control to the AI | `Work directly in the current folder. Inspect the files, then give me a three-step plan.` |
| Avoid needless questions | `Do not ask questions that can be answered from the code. Check and continue.` |
| Create files | `Create the required files and tell me the paths when done.` |
| Run checks | `Run the existing tests or the closest available verification command.` |
| Screenshot verification | `Open the page, capture a screenshot, and check for overlap, overflow, and blank areas.` |
| Small fix | `Fix only this issue. Do not refactor unrelated parts.` |
| Git delivery | `Run git status, commit, push, and give me the GitHub link.` |

## Done Means

A mouth-driven web coding task is complete when:

- The AI actually edited files or ran commands instead of only giving advice.
- You mainly drove the task through right `Command` voice input.
- There is visible output: page, screenshot, README, commit, or GitHub link.
- There was verification: preview, screenshot, test, git status, or remote check.
