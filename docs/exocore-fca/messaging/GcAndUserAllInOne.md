# Facebook Bot Advanced Command Documentation

> **Author:** @ChoruOfficial

This guide provides complete usage and internal implementation examples for advanced commands used in a Facebook bot compatible with MQTT and `ws3-fca` libraries.

---

## 📌 `/gcname` Command

Sets the name of the group chat.

```ts
/**
 * @command /gcname <new_group_name>
 */
```

### Example Implementation

```js
const fs = require('fs');
const path = require('path');

module.exports = {
  name: "gcname",
  description: "Sets the name of the group chat.",
  usage: "<new_group_name>",

  async execute({ api, event, args }) {
    const threadID = event.threadID;
    if (args.length === 0) return api.sendMessage("Please provide a new name for the group chat. Usage: /gcname <new_group_name>", threadID, event.messageID);
    const newGroupName = args.join(" ");
    try {
      const result = await api.gcname(newGroupName, threadID);
      console.log(result);
      api.sendMessage(`Successfully set the group chat name to \"${newGroupName}\".`, threadID);
    } catch (error) {
      console.error("Error setting group chat name:", error);
      api.sendMessage("\u274C Failed to set the group chat name. Make sure I am an administrator in this group and have the necessary permissions.", threadID, event.messageID);
    }
  }
};
```

---

## 😄 `/emoji` Command

Sets the custom emoji for the current thread.

```ts
/**
 * @command /emoji <emoji_character>
 */
```

### Example Implementation

```js
const fs = require('fs');
const path = require('path');

module.exports = {
  name: "emoji",
  description: "Sets the custom emoji for the current thread.",
  usage: "<emoji_character>",

  async execute({ api, event, args }) {
    const threadID = event.threadID;
    if (args.length === 0) return api.sendMessage("Please provide an emoji character. Usage: /emoji <emoji_character>", threadID, event.messageID);
    const newEmoji = args[0];
    try {
      const result = await api.emoji(newEmoji, threadID);
      console.log(result);
      api.sendMessage(`Successfully set the thread emoji to \"${newEmoji}\".`, threadID);
    } catch (error) {
      console.error("Error setting thread emoji:", error);
      api.sendMessage("\u274C Failed to set the thread emoji. Make sure the emoji is valid and I have the necessary permissions.", threadID, event.messageID);
    }
  }
};
```

---

## 🧑‍💼 `/nick` Command

Sets a nickname for a user in the thread or for yourself.

```ts
/**
 * @command /nick [<participantID>] <newNickname>
 */
```

### Example Implementation

```js
const fs = require('fs');
const path = require('path');

module.exports = {
  name: "nick",
  description: "Sets a nickname for a participant in a thread, or for yourself.",
  usage: "[<participantID>] <newNickname>",

  async execute({ api, event, args }) {
    const threadID = event.threadID;
    const senderID = event.senderID;
    let participantID, newNickname;

    if (args.length === 0) return api.sendMessage("Please provide a nickname. Usage: /nick [<participantID>] <newNickname>", threadID, event.messageID);
    else if (args.length === 1) {
      participantID = senderID;
      newNickname = args[0];
    } else {
      participantID = args[0];
      newNickname = args.slice(1).join(" ");
    }

    if (isNaN(participantID) && args.length > 1) {
      participantID = senderID;
      newNickname = args.join(" ");
    } else if (isNaN(participantID) && args.length === 1) {
      participantID = senderID;
      newNickname = args[0];
    }

    try {
      const result = await api.nickname(newNickname, threadID, participantID);
      console.log(result);
      api.sendMessage(`Successfully set nickname for ${participantID} to \"${newNickname}\".`, threadID);
    } catch (error) {
      console.error("Error setting nickname:", error);
      api.sendMessage("\u274C Failed to set nickname. Make sure the ID is correct and I have the necessary permissions.", threadID, event.messageID);
    }
  }
};
```

---

## 🎨 `/theme` Command

Manages thread themes. List available themes or set one.

```ts
/**
 * @command /theme list
 * @command /theme set <themeName/ID>
 */
```

### Example Implementation

```js
const fs = require('fs');
const path = require('path');

module.exports = {
  name: "theme",
  description: "Manages thread themes.",
  usage: "list | set <themeName/ID>",

  async execute({ api, event, args }) {
    const threadID = event.threadID;
    const commandAction = args[0]?.toLowerCase();

    if (!commandAction) return api.sendMessage("Please specify an action: 'list' or 'set'. Usage: /theme list | set <themeName/ID>", threadID, event.messageID);

    if (commandAction === "list") {
      try {
        const themes = await api.theme("list", threadID);
        if (!themes || !Array.isArray(themes) || themes.length === 0) return api.sendMessage("No themes found or an error occurred while fetching themes.", threadID, event.messageID);
        let themeListMessage = "Available Themes:\n";
        themes.forEach(theme => {
          themeListMessage += `- ${theme.name} (ID: ${theme.id})\n`;
        });
        themeListMessage += "\nTo set a theme, use: /theme set <ThemeName/ID>";
        api.sendMessage(themeListMessage, threadID);
      } catch (error) {
        console.error("Error fetching themes:", error);
        let userMessage = error.message || error.error || "an unknown error occurred.";
        if (typeof error === 'string') userMessage = error;
        api.sendMessage(`\u274C Failed to fetch themes: ${userMessage}. Please try again later.`, threadID, event.messageID);
      }
    } else if (commandAction === "set") {
      const themeIdentifier = args.slice(1).join(" ");
      if (!themeIdentifier) return api.sendMessage("Please provide a theme name or ID. Usage: /theme set <themeName/ID>", threadID, event.messageID);
      try {
        const result = await api.theme(themeIdentifier, threadID, event.senderID);
        console.log(result);
        api.sendMessage(`Successfully sent theme change request for \"${themeIdentifier}\".`, threadID, event.messageID);
      } catch (error) {
        console.error("Error setting theme:", error);
        let userMessage = "An unexpected error occurred.";
        if (error && typeof error === 'object') {
          if (error.message) userMessage = error.message;
          else if (error.error) userMessage = error.error;
        } else if (typeof error === 'string') {
          userMessage = error;
        }
        api.sendMessage(`\u274C Failed to set the theme. ${userMessage} Make sure you have the necessary permissions or the theme name/ID is correct.`, threadID, event.messageID);
      }
    } else {
      return api.sendMessage("Invalid action. Use 'list' or 'set'. Usage: /theme list | set <themeName/ID>", threadID, event.messageID);
    }
  }
};
```

---

## 🛡️ `/gcrule` Command

Promotes or demotes a user to/from admin in the group.

```ts
/**
 * @command /gcrule admin @user
 * @command /gcrule unadmin @user
 */
```

### Example Implementation

```js
module.exports = {
  name: 'gcrule',
  description: 'Promotes or demotes a user to/from admin.',

  async execute({ api, event, args }) {
    const subCommand = args[0]?.toLowerCase();
    const mentions = Object.keys(event.mentions);
    const validSubCommands = ["admin", "unadmin"];

    if (!subCommand || !validSubCommands.includes(subCommand)) {
      const usage = "Invalid usage.\n\nUsage:\n- /gcrule admin @user\n- /gcrule unadmin @user";
      return api.sendMessageMqtt(usage, event.threadID, event.messageID);
    }

    if (mentions.length === 0) {
      return api.sendMessageMqtt(`Please mention the user you want to ${subCommand}.`, event.threadID, event.messageID);
    }

    const userID = mentions[0];

    try {
     const result = await api.gcrule(subCommand, userID, event.threadID);
      console.log(result);
      console.log(`Successfully performed '${subCommand}' on user ${userID} in thread ${event.threadID}`);
      api.setMessageReactionMqtt("👍", event.messageID, event.threadID);
    } catch (error) {
      console.error(`Error in 'gcrule' command:`, error);
      api.sendMessageMqtt(`\u274C Sorry, an error occurred while trying to ${subCommand} the user.`, event.threadID, event.messageID);
    }
  }
};
```

---

All commands are compatible with async/await, MQTT bots, and built-in `ws3-fca` functions like `api.sendMessageMqtt`, `api.emoji`, `api.gcname`, `api.nickname`, `api.theme`, and `api.gcrule`.
