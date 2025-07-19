# `sendTypingIndicatorV2` Function

`api.sendTypingIndicatorV2` publishes a **typing indicator** in real‑time via MQTT, letting the recipient know whether the bot is typing.

---

## 🛠 TypeScript Interface

```ts
/**
 * Send or stop a typing indicator in a thread.
 * @param sendTyping - true to show typing, false to hide.
 * @param threadID   - Thread ID where indicator is sent.
 * @param callback   - Optional callback invoked after publish.
 * @returns Promise<void> that resolves on success.
 */
function sendTypingIndicatorV2(
  sendTyping: boolean,
  threadID: string,
  callback?: (err: Error | null) => void
): Promise<void>;
```

---

## 📝 JavaScript JSDoc Definition

```js
/**
 * Send a typing indicator via MQTT.
 * @param {boolean} sendTyping  True to show typing, false to hide.
 * @param {string}  threadID    Target thread ID.
 * @param {(err: Error|null)=} callback Optional completion callback.
 * @returns {Promise<void>} Resolves when published.
 */
```

---

## 📦 Returns

* `Promise<void>` – Resolves when the MQTT publish is acknowledged. Rejects with `Error` if MQTT is not connected.

---

## 💡 Examples

<details><summary><strong>JavaScript</strong></summary>

```js
// Async/await
(async () => {
  try {
    await api.sendTypingIndicatorV2(true, "1234567890");
    console.log("Typing indicator ON.");
  } catch (err) {
    console.error("Failed:", err);
  }
})();

// Callback style
api.sendTypingIndicatorV2(false, "1234567890", (err) => {
  if (err) return console.error("Failed to hide typing:", err);
  console.log("Typing indicator OFF (callback).");
});
```

</details>

<details><summary><strong>TypeScript</strong></summary>

```ts
(async () => {
  try {
    await api.sendTypingIndicatorV2(true, "1234567890");
    console.log("TS typing ON.");
  } catch (err) {
    console.error("TS error:", err);
  }
})();

api.sendTypingIndicatorV2(false, "1234567890", (err?: Error | null) => {
  if (err) return console.error("TS callback error:", err);
  console.log("TS typing OFF (callback).");
});
```

</details>

---

## 🔍 How It Works

1. Builds a payload with `thread_key`, `is_typing`, and metadata.
2. Wraps in a `task` and `content` structure, JSON‑stringified.
3. Publishes to `/ls_req` topic with `qos:1`, `retain:false`.
4. If a callback is supplied, stores it in `ctx.reqCallbacks` for acknowledgment.

---

## ⚠️ Errors

* Throws if `ctx.mqttClient` is **not** connected.
* Network or broker issues propagate via rejected Promise or callback `err`.
* 