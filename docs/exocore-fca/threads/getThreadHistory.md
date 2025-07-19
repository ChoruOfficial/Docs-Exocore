# 📜 How to Use `api.getThreadHistory`

`api.getThreadHistory` retrieves the message history of a specific thread (conversation).
To pull messages only from **groups** or **users**, first call `api.getThreadList()` and filter with the `isGroup` property.

---

## 🛠 Function Signature

```js
api.getThreadHistory(threadID, amount, timestamp)
```

---

## 📦 Example 1: Get History from **All Unread** Conversations

<details>
<summary><strong>JavaScript</strong></summary>

```javascript
/**
 * @typedef {Object} Thread
 * @property {string}  threadID
 * @property {number}  unreadCount
 * @property {boolean} isGroup
 *
 * @typedef {Object} Message
 * @property {string} senderID
 * @property {string} body
 */

try {
  console.log("Checking for all unread messages…");
  const threads = await api.getThreadList(20, null, ["INBOX"]);
  const unreadThreads = threads.filter(t => t.unreadCount > 0);

  if (unreadThreads.length === 0) {
    console.log("No unread messages found.");
    return;
  }
  console.log(`Found ${unreadThreads.length} unread conversation(s).`);

  for (const thread of unreadThreads) {
    const history = await api.getThreadHistory(
      thread.threadID,
      thread.unreadCount,
      null
    );

    console.log(`\n— Thread ID: ${thread.threadID} | Is Group: ${thread.isGroup}`);
    history.reverse().forEach(msg =>
      console.log(`👤 ${msg.senderID}: ${msg.body}`)
    );
    console.log("");
  }
} catch (/** @type {any} */ e) {
  console.error("Failed to process messages:", e);
}
```

</details>

<details>
<summary><strong>TypeScript</strong></summary>

```ts
interface Thread {
  threadID:    string;
  unreadCount: number;
  isGroup:     boolean;
  threadName?: string;
}

interface Message {
  senderID: string;
  body:     string;
}

try {
  console.log("Checking for all unread messages…");
  const threads: Thread[] = await api.getThreadList(20, null, ["INBOX"]);
  const unreadThreads = threads.filter(t => t.unreadCount > 0);

  if (unreadThreads.length === 0) {
    console.log("No unread messages found.");
    return;
  }
  console.log(`Found ${unreadThreads.length} unread conversation(s).`);

  for (const thread of unreadThreads) {
    const history: Message[] = await api.getThreadHistory(
      thread.threadID,
      thread.unreadCount,
      null
    );

    console.log(`\n— Thread ID: ${thread.threadID} | Is Group: ${thread.isGroup}`);
    history.reverse().forEach(msg =>
      console.log(`👤 ${msg.senderID}: ${msg.body}`)
    );
    console.log("");
  }
} catch (e: unknown) {
  console.error("Failed to process messages:", e);
}
```

</details>

---

## 👤 Example 2: Get History from **Users Only**

<details>
<summary><strong>JavaScript</strong></summary>

```javascript
try {
  console.log("Checking for unread messages from USERS only…");
  const threads = await api.getThreadList(20, null, ["INBOX"]);
  const userThreads = threads.filter(t => t.unreadCount > 0 && !t.isGroup);

  if (userThreads.length === 0) {
    console.log("No unread user messages found.");
    return;
  }
  console.log(`Found ${userThreads.length} unread user conversation(s).`);

  for (const thread of userThreads) {
    const history = await api.getThreadHistory(
      thread.threadID,
      thread.unreadCount,
      null
    );

    console.log(`\n— User Thread ID: ${thread.threadID}`);
    history.reverse().forEach(msg =>
      console.log(`👤 ${msg.senderID}: ${msg.body}`)
    );
    console.log("");
  }
} catch (/** @type {any} */ e) {
  console.error("Failed to process user messages:", e);
}
```

</details>

<details>
<summary><strong>TypeScript</strong></summary>

```ts
try {
  console.log("Checking for unread messages from USERS only…");
  const threads: Thread[] = await api.getThreadList(20, null, ["INBOX"]);
  const userThreads = threads.filter(t => t.unreadCount > 0 && !t.isGroup);

  if (userThreads.length === 0) {
    console.log("No unread user messages found.");
    return;
  }
  console.log(`Found ${userThreads.length} unread user conversation(s).`);

  for (const thread of userThreads) {
    const history: Message[] = await api.getThreadHistory(
      thread.threadID,
      thread.unreadCount,
      null
    );

    console.log(`\n— User Thread ID: ${thread.threadID}`);
    history.reverse().forEach(msg =>
      console.log(`👤 ${msg.senderID}: ${msg.body}`)
    );
    console.log("");
  }
} catch (e: unknown) {
  console.error("Failed to process user messages:", e);
}
```

</details>

---

## 👥 Example 3: Get History from **Groups Only**

<details>
<summary><strong>JavaScript</strong></summary>

```javascript
try {
  console.log("Checking for unread messages from GROUPS only…");
  const threads = await api.getThreadList(20, null, ["INBOX"]);
  const groupThreads = threads.filter(t => t.unreadCount > 0 && t.isGroup);

  if (groupThreads.length === 0) {
    console.log("No unread group messages found.");
    return;
  }
  console.log(`Found ${groupThreads.length} unread group conversation(s).`);

  for (const thread of groupThreads) {
    const history = await api.getThreadHistory(
      thread.threadID,
      thread.unreadCount,
      null
    );

    console.log(`\n— Group: ${thread.threadName} | ID: ${thread.threadID}`);
    history.reverse().forEach(msg =>
      console.log(`👤 ${msg.senderID}: ${msg.body}`)
    );
    console.log("");
  }
} catch (/** @type {any} */ e) {
  console.error("Failed to process group messages:", e);
}
```

</details>

<details>
<summary><strong>TypeScript</strong></summary>

```ts
try {
  console.log("Checking for unread messages from GROUPS only…");
  const threads: Thread[] = await api.getThreadList(20, null, ["INBOX"]);
  const groupThreads = threads.filter(t => t.unreadCount > 0 && t.isGroup);

  if (groupThreads.length === 0) {
    console.log("No unread group messages found.");
    return;
  }
  console.log(`Found ${groupThreads.length} unread group conversation(s).`);

  for (const thread of groupThreads) {
    const history: Message[] = await api.getThreadHistory(
      thread.threadID,
      thread.unreadCount,
      null
    );

    console.log(`\n— Group: ${thread.threadName} | ID: ${thread.threadID}`);
    history.reverse().forEach(msg =>
      console.log(`👤 ${msg.senderID}: ${msg.body}`)
    );
    console.log("");
  }
} catch (e: unknown) {
  console.error("Failed to process group messages:", e);
}
```

</details>
