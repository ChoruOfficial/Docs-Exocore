# 📜 How to Use `api.setMessageReactionMqtt`

`api.setMessageReactionMqtt` lets you programmatically add or remove an emoji reaction to a specific message in a conversation. It uses the efficient **MQTT** protocol for real-time interactions.

---

## 🛠 Function Signature

```js
api.setMessageReactionMqtt(reaction, messageID, threadID)
```

* `reaction` (string) — Emoji to react with (e.g., "👍"). Pass `""` (empty string) to remove reaction.
* `messageID` (string) — ID of the target message.
* `threadID` (string) — ID of the conversation.

---

## ❤️ Example 1: Setting a Reaction

<details><summary><strong>JavaScript</strong></summary>

```js
const reaction = "❤️";
const messageID = "mid.$cAA..._XYZ";
const threadID = "100001234567890";

try {
  await api.setMessageReactionMqtt(reaction, messageID, threadID);
  console.log("Successfully set reaction!");
} catch (err) {
  console.error("Failed to set reaction:", err);
}
```

</details>

<details><summary><strong>TypeScript</strong></summary>

```ts
const reaction = "❤️";
const messageID = "mid.$cAA..._XYZ";
const threadID = "100001234567890";

try {
  await api.setMessageReactionMqtt(reaction, messageID, threadID);
  console.log("Successfully set reaction!");
} catch (err: unknown) {
  console.error("Failed to set reaction:", err);
}
```

</details>

---

## ❌ Example 2: Removing a Reaction

```js
const reaction = ""; // Empty string to remove the reaction
const messageID = "mid.$cAA..._XYZ";
const threadID = "100001234567890";

try {
  await api.setMessageReactionMqtt(reaction, messageID, threadID);
  console.log("Successfully removed reaction!");
} catch (err) {
  console.error("Failed to remove reaction:", err);
}
```

---

## 💬 Example 3: `!react` Command Listener

<details><summary><strong>JavaScript</strong></summary>

```js
api.listen(async (err, event) => {
  if (err) return console.error("Listen error:", err);

  if (event.type === "message" && event.body?.toLowerCase() === "!react") {
    try {
      console.log(`Reacting to message ${event.messageID} in thread ${event.threadID}`);
      await api.setMessageReactionMqtt("👍", event.messageID, event.threadID);
      console.log("Reaction sent!");
    } catch (e) {
      console.error("Failed to send reaction:", e);
    }
  }
});
```

</details>

<details><summary><strong>TypeScript</strong></summary>

```ts
api.listen(async (err: unknown, event: any) => {
  if (err) return console.error("Listen error:", err);

  if (event.type === "message" && event.body?.toLowerCase() === "!react") {
    try {
      console.log(`Reacting to message ${event.messageID} in thread ${event.threadID}`);
      await api.setMessageReactionMqtt("👍", event.messageID, event.threadID);
      console.log("Reaction sent!");
    } catch (e: unknown) {
      console.error("Failed to send reaction:", e);
    }
  }
});
```

</details>
