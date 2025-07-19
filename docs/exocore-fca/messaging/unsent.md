## /unsend Command

> Author: **@ChoruOfficial**

Unsends a message sent by the bot when a user replies to it using the `/unsend` command. This is the safest and most user-friendly approach.

---

### 📦 Location

`modules/commands/unsend.js`

---

### 🧠 Behavior

- If the user replies to a bot's message with `/unsend`, the bot will delete the message it previously sent.
- The bot will react with `👌` to confirm success.
- If the replied message is not from the bot, it will return an error.
- If there’s no reply context, the command informs the user how to use it.

---

### ⚙️ Command Syntax

```bash
/unsend
```

---

### ⚙️ Implementation (JavaScript)

```js
"use strict";

module.exports = {
    name: 'unsend',
    description: 'Unsends a message sent by the bot when you reply to it.',
    
    async execute({ api, event }) {
        try {
            const botID = api.getCurrentUserID();

            if (!event.messageReply) {
                return api.sendMessageMqtt(
                    "Please reply to a message I sent to unsend it.",
                    event.threadID,
                    event.messageID
                );
            }

            const messageToUnsend = event.messageReply;

            if (messageToUnsend.senderID !== botID) {
                return api.sendMessageMqtt(
                    "I can only unsend my own messages.",
                    event.threadID,
                    event.messageID
                );
            }

            await api.unsendMessage(messageToUnsend.messageID, event.threadID);
            
            api.setMessageReactionMqtt("👌", event.messageID, event.threadID);

        } catch (error) {
            console.error("Error in 'unsend' command:", error);
            api.sendMessageMqtt(
                "❌ Sorry, an error occurred and I couldn't unsend the message.",
                event.threadID,
                event.messageID
            );
        }
    }
};
```

---

### 💡 How to Use

1. Reply to the bot's message that you want to delete.
2. Type the command:  
   ```bash
   /unsend
   ```
3. The bot will remove the original message and confirm by reacting with `👌`.
4. 