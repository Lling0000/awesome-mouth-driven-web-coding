# Install Qianwen Voice Input on macOS

This is the first step in mouth-driven web coding: make macOS ready to dictate executable tasks into Codex, Cos, Claude Code, Cursor, VS Code, a browser, a terminal, or any text field. The point is not typing prompts; it is holding right `Command` and speaking tasks for the AI to execute.

## Requirements

- A Mac.
- Network access.
- An AI coding tool, IDE, terminal, or agent that accepts text input and can execute work.
- Microphone permission. macOS may ask for it the first time you use voice input.

## 1. Open the Download Link

Use this direct route first:

```text
https://download.qianwen.com/download/qianwenmac?platform=mac&ch=pcqwen@default
```

If that link does not open, use the official Qianwen pages:

- Qianwen official site: https://www.qianwen.com/
- Qianwen download page: https://www.qianwen.com/download

![Qianwen download page](../../assets/screenshots/01-qianwen-download-page.png)

## 2. Download and Verify the DMG

The verified file in this guide was:

```text
QianwenMac_V3.4.0.75_mac_pf3000_(zh-cn)_releasemini_(Build2900379).dmg
```

Optional command-line checks:

```bash
shasum -a 256 QianwenMac.dmg
hdiutil verify QianwenMac.dmg
```

Observed SHA-256:

```text
e8e83f3a521ecc9b7456e1204fd72825405f6fdeda50bad82c032fe1c2df2152
```

If `hdiutil` reports `checksum ... is VALID`, the image passed verification.

## 3. Open the DMG

Double-click the DMG. The tested installer window contains `千问.app` and asks you to double-click to install Qianwen.

![Qianwen DMG window](../../assets/screenshots/02-qianwen-dmg-window.png)

## 4. Start Installation

Double-click `千问.app`. If macOS warns that the app was downloaded from the internet, continue only if it is the DMG you just downloaded from the official route.

Observed signature:

```text
Gatekeeper: accepted
Origin: Developer ID Application: Shanghai Zhixin Puhui Technology Co., Ltd. (8T9NQJXDU3)
```

Optional signature checks:

```bash
spctl -a -vv "/Volumes/千问/Qianwen.app"
codesign -dv --verbose=4 "/Volumes/千问/Qianwen.app"
```

## 5. Grant Microphone and Input Permissions

On first launch, Qianwen may ask for microphone access. Follow:

```text
System Settings -> Privacy & Security -> Microphone
```

Allow Qianwen to use the microphone. If macOS asks for Accessibility or Input Monitoring permissions, grant those from the same Privacy & Security area.

## 6. Start Dictating

Open any text field. The tested Qianwen UI shows this shortcut hint:

```text
Hold right Command to use voice input anywhere.
```

![Qianwen voice input](../../assets/screenshots/03-qianwen-app-voice-input.png)

Now open your AI coding tool or terminal, place the cursor in the prompt box, hold right `Command`, and say:

```text
Work directly in the current folder.
Inspect the file structure, then create a one-page website demo.
After writing the files, capture a screenshot and check that mobile has no overflow.
Finally tell me which files changed.
```

## Troubleshooting

**No text appears after speaking.**

Make sure the text field has focus, microphone permission is enabled, and you are holding the shortcut while speaking.

**The shortcut conflicts with another tool.**

Check input methods, window managers, and keyboard remapping utilities that might capture right `Command`.

**Is this the same as the Qianwen desktop client?**

The Qianwen official download page offers a desktop AI assistant. This guide focuses on the QianwenMac voice input route because the goal is dictating prompts into coding tools.
