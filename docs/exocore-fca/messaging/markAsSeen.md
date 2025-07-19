# `api.markAsSeen` Function

This document provides a detailed explanation of the `api.markAsSeen` function, part of the `@ChoruOfficial` Facebook chat API.

---

## 📘 TypeScript Interface

```ts
/**
 * Marks messages as seen up to a specific timestamp.
 * @param seen_timestamp Optional timestamp in milliseconds.
 * @returns Promise that resolves when the operation is complete.
 */
function markAsSeen(seen_timestamp?: number): Promise<void>;
```

---

## 📘 JavaScript JSDoc Definition

```js
/**
 * Marks messages as seen up to a specific timestamp.
 * @param {number=} seen_timestamp - Optional timestamp in milliseconds.
 * @returns {Promise<void>} Resolves when the messages are marked as seen.
 */
```

---

## 🔁 Returns

* `Promise<void>`:

  * Resolves with `void` on success.
  * Rejects with an `Error` if the operation fails.

---

## ✅ Usage Examples

### JavaScript (Async/Await)

```js
(async () => {
  try {
    await api.markAsSeen();
    console.log("All messages marked as seen up to current time successfully!");
  } catch (err) {
    console.error("Failed to mark messages as seen:", err);
  }
})();
```

### TypeScript (Async/Await)

```ts
async function markSeenTS() {
  try {
    await api.markAsSeen();
    console.log("Messages marked as seen in TypeScript.");
  } catch (err: unknown) {
    console.error("TS error marking messages as seen:", err);
  }
}
```

---

## ⚙️ How it Works

* Constructs a form object with a `seen_timestamp` field (defaults to `Date.now()` if not provided).
* Sends a `POST` request to:

  * `https://www.facebook.com/ajax/mercury/mark_seen.php`
* Uses `ctx.jar` for session cookies.
* Uses `defaultFuncs.post` to send the request.
* The response is processed with:

  * `utils.saveCookies`
  * `utils.parseAndCheckLogin`
* If `resData.error` is present, it throws that error.
* If an error occurs during the request, it's logged using `utils.error`.
* If error indicates "Not logged in.", sets `ctx.loggedIn = false`.
* Resolves when successful.
* 