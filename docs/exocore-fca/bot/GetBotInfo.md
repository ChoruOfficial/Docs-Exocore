# 📜 How to Use `api.GetBotInfo` (Consolidated)

The `api.GetBotInfo` function serves as a centralized utility for extracting core session information from the `netData` array returned during login. It also exposes live context accessors, making bot session management cleaner and more modular.

---

## 🧠 How It Works

Instead of calling `api.getCtx`, `api.getOptions`, and `api.getRegion` separately, `api.GetBotInfo` consolidates all this logic. You provide it with the raw `netData`, and it returns a structured object with static session details and helper functions.

---

## 🛠 Function Signature

```ts
api.GetBotInfo(netData: any[]): BotInfo | null
```

* `netData`: Array of raw JSON data parsed from Facebook `<script>` tags.
* Returns: A structured object containing bot metadata and helper accessors.

### 🔍 Interface Definition (TypeScript)

```ts
interface BotInfo {
  name: string;
  firstName: string;
  uid: string;
  appID: string;
  dtsgToken: string;
  lsdToken: string;
  dtsgInit: {
    token: string;
    async_get_token: string;
  };
  getCtx: (key: string) => any;
  getOptions: (key: string) => any;
  getRegion: () => string;
}
```

---

## 📄 What It Returns

Example output from `api.GetBotInfo`:

```json
{
  "name": "Jian Reyes",
  "firstName": "Jian",
  "uid": "61576946051747",
  "appID": "2220391788200892",
  "dtsgToken": "NAfsK1GUj10xp_asYUMI6_cIvjaITe4UDDqLmiINE9cIVdv7eDAXAjQ:3:1751250557",
  "lsdToken": "V7x93X6l6ieMsQtIJY93sw",
  "dtsgInit": {
    "token": "...",
    "async_get_token": "..."
  },
  "getCtx": "[Function: getCtx]",
  "getOptions": "[Function: getOptions]",
  "getRegion": "[Function: getRegion]"
}
```

---

## 💬 Code Example: JavaScript

<details><summary><strong>JavaScript</strong></summary>

```js
// @ts-check

/**
 * @typedef {Object} BotInfo
 * @property {string} name
 * @property {string} firstName
 * @property {string} uid
 * @property {string} appID
 * @property {string} dtsgToken
 * @property {string} lsdToken
 * @property {{ token: string, async_get_token: string }} dtsgInit
 * @property {(key: string) => any} getCtx
 * @property {(key: string) => any} getOptions
 * @property {() => string} getRegion
 */


const botInfo = api.GetBotInfo();

if (botInfo) {
  ctx.userName = botInfo.name;
  console.log(`Bot Name: ${botInfo.name}`);
  console.log(`User ID: ${botInfo.uid}`);

  const currentUserID = botInfo.getCtx("userID");
  const isOnline = botInfo.getOptions("online");
  const region = botInfo.getRegion();

  console.log(`Ctx ID: ${currentUserID}`);
  console.log(`Online: ${isOnline}`);
  console.log(`Region: ${region}`);
} else {
  console.error("Could not retrieve bot information.");
}
```

</details>

---

## 💬 Code Example: TypeScript

<details><summary><strong>TypeScript</strong></summary>

```ts
interface BotInfo {
  name: string;
  firstName: string;
  uid: string;
  appID: string;
  dtsgToken: string;
  lsdToken: string;
  dtsgInit: {
    token: string;
    async_get_token: string;
  };
  getCtx: (key: string) => any;
  getOptions: (key: string) => any;
  getRegion: () => string;
}


const botInfo: BotInfo | null = api.GetBotInfo();

if (botInfo) {
  ctx.userName = botInfo.name;
  console.log(`Bot Name: ${botInfo.name}`);
  console.log(`User ID: ${botInfo.uid}`);

  const currentUserID: string = botInfo.getCtx("userID");
  const isOnline: boolean = botInfo.getOptions("online");
  const region: string = botInfo.getRegion();

  console.log(`Ctx ID: ${currentUserID}`);
  console.log(`Online: ${isOnline}`);
  console.log(`Region: ${region}`);
} else {
  console.error("Could not retrieve bot information.");
}
```

</details>

---

✅ This modular approach gives you a single source of truth for bot session state and context, keeping your code organized and future-proof.
