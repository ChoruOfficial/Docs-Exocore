# 📥 How to Use `login` and `api.listen`

To create a functional Messenger bot, you need two essential pieces:

1. Logging in using your saved Facebook session (`appstate.json`)
2. Listening to real-time events with `api.listen`

---

## 🔐 1. The `login` Function

The `login` function authenticates your account and returns an `api` object to access all other Messenger functions.

### 🧾 Function Signature

```js
login(credentials, callback)
```

* `credentials`: `{ appState: [...] }` from `appstate.json`
* `callback`: `(error, api)`

### 📄 Example

<details>
<summary><strong>JavaScript</strong></summary>

```js
const fs = require("fs");
const { login } = require("exocore-fca");

let appState;

try {
  appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));
} catch (error) {
  console.error("❌ Error reading appstate.json:", error);
  process.exit(1);
}

login({ appState }, (err, api) => {
  if (err) return console.error("Login error:", err);

  console.log("✅ Login successful!");
  console.log("Logged in as:", api.getCurrentUserID());
});
```

</details>

<details>
<summary><strong>TypeScript</strong></summary>

```ts
import fs from "fs";
import { login } from "exocore-fca";

let appState: unknown;

try {
  appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));
} catch (error) {
  console.error("❌ Error reading appstate.json:", error);
  process.exit(1);
}

login({ appState }, (err: Error | null, api: any) => {
  if (err) return console.error("Login error:", err);

  console.log("✅ Login successful!");
  console.log("Logged in as:", api.getCurrentUserID());
});
```

</details>

---

## 📡 2. The `api.listen` Function

After logging in, you use `api.listen` to receive real-time events like messages or reactions.

### 🧾 Function Signature

```js
api.listen(callback)
```

* `callback`: `(error, event)`

### 🧠 Common `event.type` Values

* `message`
* `message_reply`
* `message_reaction`
* `typ`
* `event`

### 📄 Full Bot Example

<details>
<summary><strong>JavaScript</strong></summary>

```js
const fs = require("fs");
const { login } = require("exocore-fca");

let appState;

try {
  appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));
} catch (error) {
  console.error("❌ Error reading appstate.json:", error);
  process.exit(1);
}

login({ appState }, (err, api) => {
  if (err) return console.error("Login error:", err);

  console.log("✅ Login successful!");
  api.setOptions({ listenEvents: true });

  api.listen((err, event) => {
    if (err) return console.error("Listen error:", err);

    switch (event.type) {
      case "message":
      case "message_reply":
        if (event.body?.toLowerCase() === "hello") {
          api.sendMessageMqtt({ body: `Hi, ${event.senderID}! 👋` }, event.threadID);
        }
        break;
      case "event":
        console.log("Received a chat event:", event);
        break;
      default:
        break;
    }
  });
});
```

</details>

<details>
<summary><strong>TypeScript</strong></summary>

```ts
import fs from "fs";
import { login } from "exocore-fca";

let appState: unknown;

try {
  appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));
} catch (error) {
  console.error("❌ Error reading appstate.json:", error);
  process.exit(1);
}

login({ appState }, (err: Error | null, api: any) => {
  if (err) return console.error("Login error:", err);

  console.log("✅ Login successful!");
  api.setOptions({ listenEvents: true });

  api.listen((err: Error | null, event: any) => {
    if (err) return console.error("Listen error:", err);

    switch (event.type) {
      case "message":
      case "message_reply":
        if (event.body?.toLowerCase() === "hello") {
          api.sendMessageMqtt({ body: `Hi, ${event.senderID}! 👋` }, event.threadID);
        }
        break;
      case "event":
        console.log("Received a chat event:", event);
        break;
      default:
        break;
    }
  });
});
```

</details>

---

This setup gives your bot the ability to log in and respond to messages in real time.
