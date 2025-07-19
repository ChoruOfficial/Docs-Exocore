# 📜 How to Use `api.markAsDelivered`

`api.markAsDelivered` sends a **delivery receipt** for a specific message—Messenger’s filled‑in check‑mark icon that confirms your bot has received the message.

---

## 🛠 Function Signature

```js
api.markAsDelivered(threadID, messageID)
```

* `threadID` (string): Conversation ID where the message was received.
* `messageID` (string): ID of the message to mark as delivered.

The function is **asynchronous** and returns a `Promise<void>`.

---

## ✍️ Basic Usage

Most useful when you set `autoMarkDelivery` to `false` and handle receipts manually.

<details>
<summary><strong>JavaScript</strong></summary>

```js
/**
 * Manual delivery marking setup
 */
api.setOptions({
  listenEvents: true,
  autoMarkDelivery: false
});

/**
 * Listen and mark as delivered
 */
api.listen(async (err, /** @type {{type:string; body?:string; threadID:string; messageID:string}} */ event) => {
  if (err) return console.error("Listen error:", err);

  if (event.type === "message") {
    console.log(`Received message: "${event.body}"`);
    try {
      await api.markAsDelivered(event.threadID, event.messageID);
      console.log(`✅ Marked ${event.messageID} as delivered.`);
    } catch (e) {
      console.error("Failed to mark as delivered:", e);
    }
    // Continue processing...
  }
});
```

</details>

<details>
<summary><strong>TypeScript</strong></summary>

```ts
api.setOptions({ listenEvents: true, autoMarkDelivery: false });

api.listen(
  async (
    err: Error | null,
    event: {
      type: string;
      body?: string;
      threadID: string;
      messageID: string;
    }
  ) => {
    if (err) return console.error("Listen error:", err);

    if (event.type === "message") {
      console.log(`Received message: "${event.body}"`);
      try {
        await api.markAsDelivered(event.threadID, event.messageID);
        console.log(`✅ Marked ${event.messageID} as delivered.`);
      } catch (e: unknown) {
        console.error("Failed to mark as delivered:", e);
      }
    }
  }
);
```

</details>

---

## ℹ️ Important Notes

* **Automatic Delivery:** By default, `autoMarkDelivery` is `true`. You only need this function if you set it to `false`.
* **Delivered vs. Read:**

  * `markAsDelivered`: Sends the **delivered** checkmark.
  * `markAsRead`: Sends the **read/seen** status (shows your profile picture).
* **Error Handling:** Always use `try...catch` to handle possible network issues or invalid IDs.
