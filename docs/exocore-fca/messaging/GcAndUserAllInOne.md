# Advanced Command Guide for Facebook Bot

> Author: **@ChoruOfficial**

Comprehensive documentation for advanced modular commands: `emoji`, `gcname`, `nickname`, and `theme`, built for `ws3-fca` or similar MQTT-compatible bots.

---

## `/emoji` Command

Sets the group emoji.

```ts
/**
 * Set emoji for the current group chat.
 * @command /emoji <emoji> or /emoji set <emoji>
 */
await api.emoji("👍", threadID);
```

```js
await api.emoji("👍", threadID);
```

---

## `/gcname` Command

Changes the group chat name.

```ts
/**
 * Set group name for the chat.
 * @command /gcname <new name> or /gcname set <new name>
 */
await api.gcname("New Group Name", threadID);
```

```js
await api.gcname("New Group Name", threadID);
```

---

## `/nickname` Command

Sets or clears a nickname for a user.

```ts
/**
 * Set nickname for a user.
 * @command /nickname set @user <nickname>
 */
await api.nickname("Johnny", threadID, messageID);

/**
 * Clear nickname for a user.
 * @command /nickname clear @user
 */
await api.nickname("", threadID, messageID);
```

```js
await api.nickname("Johnny", threadID, messageID);
await api.nickname("", threadID, messageID);
```

---

## `/theme` Command

> ⚠️ WARNING: This currently changes group name instead of theme due to an API limitation.

### Theme List

```ts
/**
 * Show list of available themes.
 * @command /theme list
 */
const themes = await api.theme("list", threadID);
```

### Set Theme (Actually sets group name)

```ts
/**
 * Set a fake theme by renaming group.
 * @command /theme set <name>
 */
await api.theme("Coffee", threadID); // Changes group name
```

```js
await api.theme("Coffee", threadID);
```

---

## Quick Recap

| Command     | Usage Examples                          |
|-------------|------------------------------------------|
| `/emoji`    | `/emoji 👍`, `/emoji set ❤️`             |
| `/gcname`   | `/gcname Cool Group`, `/gcname set Team` |
| `/nickname` | `/nickname set @John Jay`, `/nickname clear @Jay` |
| `/theme`    | `/theme list`, `/theme set Pride`        |

All commands are async/await-compatible and react to messages using `api.setMessageReactionMqtt()`.
