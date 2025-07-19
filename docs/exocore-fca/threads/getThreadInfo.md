# 📜 How to Use `api.getThreadInfo`

`api.getThreadInfo` is a powerful tool used to retrieve detailed information about a specific conversation, whether it's a one-on-one chat or a group chat.

---

## 🛠 Function Signature

```js
api.getThreadInfo(threadID)
```

* `threadID`: A string representing the ID of a single thread, or an array of strings for multiple threads.

---

## 📄 What It Returns

The function returns a detailed object (or a map of objects for multiple IDs) like the following:

```json
{
  "threadID": "100088806220727",
  "threadName": "Jian Reyes",
  "participantIDs": [
    "61576946051747",
    "100088806220727"
  ],
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
  "muteUntil": null,
  "isGroup": false,
  "isArchived": false,
  "threadTheme": {
    "id": "158263147151440",
    "fallback_color": "FF61C500",
    "gradient_colors": ["FF61C500", "FF61C500"]
  },
  "nicknames": {},
  "adminIDs": []
}
```

---

## 💬 Example: Creating a `!threadinfo` Command

<details>
<summary><strong>JavaScript</strong></summary>

```javascript
/**
 * @typedef {Object} Event
 * @property {string} type
 * @property {string} threadID
 * @property {string} body
 */

api.listen(async (err, /** @type {Event} */ event) => {
  if (err) return console.error("Listen error:", err);

  if (event.type === "message" && event.body != null) {
    const messageBody = event.body.toLowerCase();

    if (messageBody === "!threadinfo") {
      try {
        console.log(`Getting info for thread: ${event.threadID}`);

        const threadInfo = await api.getThreadInfo(event.threadID);

        let response = `Thread Info for: ${threadInfo.threadName || 'this chat'}\n`;
        response += `- Thread ID: ${threadInfo.threadID}\n`;
        response += `- Is Group: ${threadInfo.isGroup}\n`;
        response += `- Participant Count: ${threadInfo.participantIDs.length}\n`;
        response += `- Message Count: ${threadInfo.messageCount}\n`;

        if (threadInfo.isGroup && threadInfo.adminIDs.length > 0) {
          response += `- Admin IDs: ${threadInfo.adminIDs.join(', ')}\n`;
        }

        api.sendMessageMqtt(response, event.threadID);

      } catch (/** @type {Error} */ e) {
        console.error("Failed to get thread info:", e);
        api.sendMessageMqtt("Sorry, I couldn't get info for this thread.", event.threadID);
      }
    }
  }
});
```

</details>

<details>
<summary><strong>TypeScript</strong></summary>

```ts
interface Event {
  type: string;
  threadID: string;
  body: string;
}

api.listen(async (err: Error | null, event: Event) => {
  if (err) return console.error("Listen error:", err);

  if (event.type === "message" && event.body != null) {
    const messageBody = event.body.toLowerCase();

    if (messageBody === "!threadinfo") {
      try {
        console.log(`Getting info for thread: ${event.threadID}`);

        const threadInfo = await api.getThreadInfo(event.threadID);

        let response = `Thread Info for: ${threadInfo.threadName || 'this chat'}\n`;
        response += `- Thread ID: ${threadInfo.threadID}\n`;
        response += `- Is Group: ${threadInfo.isGroup}\n`;
        response += `- Participant Count: ${threadInfo.participantIDs.length}\n`;
        response += `- Message Count: ${threadInfo.messageCount}\n`;

        if (threadInfo.isGroup && threadInfo.adminIDs.length > 0) {
          response += `- Admin IDs: ${threadInfo.adminIDs.join(', ')}\n`;
        }

        api.sendMessageMqtt(response, event.threadID);

      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error("Failed to get thread info:", e);
        }
        api.sendMessageMqtt("Sorry, I couldn't get info for this thread.", event.threadID);
      }
    }
  }
});
```

</details>
