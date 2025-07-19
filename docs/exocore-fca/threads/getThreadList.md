# 📜 How to Use `api.getThreadList`

The `api.getThreadList` function is essential for retrieving a list of your recent conversations (threads). You can use it to get an overview of your inbox, find specific threads, or see which conversations have unread messages.

---

## 🛠 Function Signature

```js
api.getThreadList(limit, timestamp, tags)
```

* `limit`: (number) The maximum number of threads to retrieve.
* `timestamp`: (number | null) Get threads from before a specific time. Use `null` for the most recent.
* `tags`: (string\[]) Filters the threads by folder. Common tag: `["INBOX"]`

---

## 📄 What It Returns

Returns an array of thread objects. Each object contains details about the conversation.

```json
{
  "threadID": "100088806220727",
  "threadName": "Jian Reyes",
  "participantIDs": ["61576946051747", "100088806220727"],
  "userInfo": [
    {
      "id": "61576946051747",
      "name": "ExoCoreAiBot",
      "firstName": "ExoCoreAiBot",
      "vanity": "exocoreaibot",
      "url": "https://www.facebook.com/exocoreaibot",
      "thumbSrc": "https://...",
      "profileUrl": "https://...",
      "gender": "MALE",
      "type": "User",
      "isFriend": false,
      "isBirthday": false
    },
    {
      "id": "100088806220727",
      "name": "Jian Reyes",
      "firstName": "Jian",
      "vanity": "jhonsteve.costanos",
      "url": "https://www.facebook.com/jhonsteve.costanos",
      "thumbSrc": "https://...",
      "profileUrl": "https://...",
      "gender": "MALE",
      "type": "User",
      "isFriend": false,
      "isBirthday": false
    }
  ],
  "unreadCount": 0,
  "messageCount": 4,
  "timestamp": "1751696898257",
  "isGroup": false,
  "isArchived": false,
  "name": "Jian Reyes",
  "imageSrc": "https://..."
}
```

---

## 💬 Example: Creating a `!threadlist` Command

<details>
<summary><strong>JavaScript</strong></summary>

```js
/**
 * @typedef {Object} Thread
 * @property {string} threadID
 * @property {string} threadName
 */

api.listen(async (err, /** @type {any} */ event) => {
  if (err) return console.error("Listen error:", err);

  if (event.type === "message" && event.body?.toLowerCase() === "!threadlist") {
    try {
      console.log("Fetching thread list...");

      const threads = await api.getThreadList(10, null, ["INBOX"]);

      let response = "Here are your 10 most recent threads:\n\n";
      threads.forEach((thread, index) => {
        response += `${index + 1}. ${thread.threadName || thread.threadID}\n`;
      });

      api.sendMessageMqtt(response, event.threadID);

    } catch (/** @type {Error} */ e) {
      console.error("Failed to get thread list:", e);
      api.sendMessageMqtt("Sorry, I couldn't get the thread list.", event.threadID);
    }
  }
});
```

</details>

<details>
<summary><strong>TypeScript</strong></summary>

```ts
interface Thread {
  threadID: string;
  threadName?: string;
}

interface Event {
  type: string;
  threadID: string;
  body?: string;
}

api.listen(async (err: Error | null, event: Event) => {
  if (err) return console.error("Listen error:", err);

  if (event.type === "message" && event.body?.toLowerCase() === "!threadlist") {
    try {
      console.log("Fetching thread list...");

      const threads: Thread[] = await api.getThreadList(10, null, ["INBOX"]);

      let response = "Here are your 10 most recent threads:\n\n";
      threads.forEach((thread, index) => {
        response += `${index + 1}. ${thread.threadName || thread.threadID}\n`;
      });

      api.sendMessageMqtt(response, event.threadID);

    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Failed to get thread list:", e);
      }
      api.sendMessageMqtt("Sorry, I couldn't get the thread list.", event.threadID);
    }
  }
});
```

</details>

---

This command provides a quick way to see your recent conversations directly from Messenger.
