# Documentation: api.sendMessageMqtt

This document provides a comprehensive guide to using the `api.sendMessageMqtt` function, which is the primary method for sending messages, attachments, and other content types via MQTT.

---

## 1. Message Object Interface (TypeScript)

To understand the parameters, it's helpful to see the structure of the message object. Below is the TypeScript interface that defines all possible options.

```ts
/**
 * Represents a message to be sent.
 */
interface IMessage {
  /** The main text content of the message. */
  body?: string;

  /**
   * An array of readable streams for file attachments.
   * Example: `[fs.createReadStream("path/to/image.jpg")]`
   */
  attachment?: any[]; // Should be Array<fs.ReadStream> in a Node.js environment

  /** The ID of a Facebook sticker to send. */
  sticker?: string;

  /** An emoji to send. Can be a standard emoji character. */
  emoji?: string;

  /**
   * The size of the emoji.
   * @default 'small'
   */
  emojiSize?: 'small' | 'medium' | 'large';

  /**
   * An array to mention users in the message.
   * The `tag` must exist in the `body` string.
   */
  mentions?: {
    /** The user's name or tag to be mentioned (e.g., "@John Doe"). */
    tag: string;
    /** The Facebook User ID of the person to mention. */
    id: string;
  }[];

  /**
   * Sequentially edits the message after sending.
   * Provide an array of tuples, where each tuple is `[newText, delayInMilliseconds]`.
   * The delay is the time to wait *before* applying that specific edit.
   *
   * @example
   * edit: [
   *   ["First edit", 1000],  // Edits after 1 second
   *   ["Final form", 2500]   // Edits after another 2.5 seconds
   * ]
   */
  edit?: [string, number][];
}
```

---

## 2. Function JSDoc

```ts
/**
 * Sends a message to a specific thread via MQTT, with support for various content types and sequential editing.
 *
 * @param {object|string} message - The message to send. Can be a simple string for a text-only message,
 * or an object conforming to the IMessage interface for more complex content.
 * @param {string} threadID - The ID of the thread, group, or user to send the message to.
 * @param {function} [callback] - (Optional) A callback function that is executed after the message
 * is sent. Receives `(err, messageInfo)`.
 * @param {string} [replyToMessage] - (Optional) The messageID of the message you want to reply to.
 * @returns {void}
 */
api.sendMessageMqtt(message, threadID, callback, replyToMessage);
```

---

## 3. Usage Examples (Open/Close Flow)

### Basic Text Message

```js
const { login } = require("./ws3-fca");
const fs = require("fs");

login({ appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) }, (err, api) => {
    if (err) return console.error(err);

    api.listen((err, event) => {
        if (event.type === "message" && event.body === "/hello") {
            api.sendMessageMqtt("Hello from my bot!", event.threadID, event.messageID);
            //or
     api.sendMessageMqtt({
            body: "hello my love",
            edit: [
                ["musta na pala?", 2000], 
                ["kumain ka na?", 1500],  
                ["wag magpapagutom ha?", 3000] 
            ]
        }
    });
});
```

### Message with Sequential Edits

```js
login({ appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) }, (err, api) => {
    if (err) return console.error(err);

    api.listen((err, event) => {
        if (event.type === "message" && event.body === "/countdown") {
            const messageObject = {
                body: "Starting countdown...",
                edit: [
                    ["3...", 1000],
                    ["2..", 1000],
                    ["1.", 1000],
                    ["🚀 Liftoff!", 500]
                ]
            };
            api.sendMessageMqtt(messageObject, event.threadID, event.messageID);
        }
    });
});
```

### Replying to a Message

```js
login({ appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) }, (err, api) => {
    if (err) return console.error(err);

    api.listen((err, event) => {
        if (event.type === "message" && event.body === "/replytome") {
            const replyMessage = "This is a reply!";
            api.sendMessageMqtt(replyMessage, event.threadID, event.messageID, null, event.messageID);
        }
    });
});
```

---

## 4. Using with async/await

### Promisified Wrapper Function

```js
/**
 * A promise-based wrapper for api.sendMessageMqtt.
 * @param {object} api - The initialized API object from login.
 * @param {object|string} message - The message object or string.
 * @param {string} threadID - The target thread ID.
 * @param {string} [replyToMessage] - (Optional) The messageID to reply to.
 * @returns {Promise<object>} A promise that resolves with the messageInfo object.
 */
function sendMessageAsync(api, message, threadID, replyToMessage = null) {
    return new Promise((resolve, reject) => {
        api.sendMessageMqtt(message, threadID, (err, msgInfo) => {
            if (err) {
                return reject(err);
            }
            resolve(msgInfo);
        }, replyToMessage);
    });
}
```

### Example with async/await

```js
login({ appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) }, (err, api) => {
    if (err) return console.error(err);

    api.listen(async (err, event) => {
        if (event.type === "message" && event.body === "/test-async") {
            try {
                console.log("Sending first message...");
                const firstMessageInfo = await sendMessageAsync(api, "First message sent!", event.threadID, event.messageID);
                console.log("First message sent successfully:", firstMessageInfo.messageID);

                console.log("Replying to the first message...");
                await sendMessageAsync(api, "This is a reply using async/await!", event.threadID, event.messageID, firstMessageInfo.messageID);
                console.log("Reply sent successfully!");
            } catch (error) {
                console.error("An error occurred while sending messages:", error);
            }
        }
    });
});
```

---

This concludes the guide on using `api.sendMessageMqtt` for sending various types of messages in an MQTT-based bot environment.
