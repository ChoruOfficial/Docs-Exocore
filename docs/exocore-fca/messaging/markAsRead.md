# `api.markAsRead` Function

This document explains the `api.markAsRead` function in the Facebook bot framework.

---

## 📘 TypeScript Interface

```ts
/**
 * Mark a thread as read or unread.
 * @param threadID  Thread ID to mark.
 * @param read      Optional. `true` (default) marks as read, `false` marks as unread.
 * @returns Promise that resolves when the operation completes.
 */
function markAsRead(threadID: string, read?: boolean): Promise<void>;
```

---

## 📘 JavaScript JSDoc Definition

```js
/**
 * Mark a thread as read or unread.
 * @param {string}  threadID  Thread ID to mark.
 * @param {boolean} [read=true]  true → read, false → unread.
 * @returns {Promise<void>} Resolves when successful.
 */
```

---

## 🔁 Returns

* `Promise<void>` – Resolves on success, rejects with `Error` on failure.

---

## ✅ Usage Examples (Async/Await)

<details>
<summary><strong>JavaScript</strong></summary>

```js
(async () => {
  try {
    // Mark specific thread as READ
    await api.markAsRead("1234567890");
    console.log("Thread marked as read (JS).");

    // Mark specific thread as UNREAD
    await api.markAsRead("1234567890", false);
    console.log("Thread marked as unread (JS).");
  } catch (err) {
    console.error("JS error:", err);
  }
})();
```

</details>

<details>
<summary><strong>TypeScript</strong></summary>

```ts
(async () => {
  try {
    // READ
    await api.markAsRead("1234567890");
    console.log("Thread marked as read (TS).");

    // UNREAD
    await api.markAsRead("1234567890", false);
    console.log("Thread marked as unread (TS).");
  } catch (err: unknown) {
    console.error("TS error:", err);
  }
})();
```

</details>

---

### 📄 Page Manager Interface

```js
// When ctx.globalOptions.pageID is defined
await api.markAsRead("1234567890");
```

---

### 📡 MQTT Real‑Time

```js
try {
  await api.markAsRead("1234567890");
  console.log("Marked via MQTT.");
} catch (err) {
  console.error("MQTT error:", err);
  if (err.error === "You can only use this function after you start listening.") {
    console.warn("MQTT not active. Call api.listen() first.");
  }
}
```

---

## ❌ Error Handling

* **HTTP Errors** – Network or request failure.
* **Facebook API Errors** – `resData.error` present.
* **MQTT Not Active** – Throws: “You can only use this function after you start listening.”

---
