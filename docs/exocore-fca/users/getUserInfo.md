# `api.getUserInfo`

Retrieves profile details for a Facebook user ID. The return type depends entirely on the `usePayload` flag.

---

## 📘 Function Signature

```ts
/**
 * Fetch user information for a single ID.
 *
 * @param id - A single Facebook user ID (string).
 * @param usePayload - A boolean flag to choose fetch mode:
 *   - `true`: Fetches basic info quickly using the payload endpoint.
 *   - `false`: Scrapes the full profile page for detailed info.
 *
 * @returns A Promise that resolves to either a BasicUserInfo or DetailedUserInfo object,
 *          depending on the value of `usePayload`.
 */
function getUserInfo(id: string, usePayload: boolean): Promise<UserInfo>;
```

---

## ⚙️ Modes of Operation

### 1. **Detailed Info Mode (`usePayload = false`)**

* Scrapes full profile page for extended details
* **Slower**, but provides rich data
* Returns a `DetailedUserInfo` object

```ts
interface DetailedUserInfo {
  id: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  vanity: string | null;
  profileUrl: string;
  profilePicUrl: string;
  gender: string;
  type: string;
  isFriend: boolean;
  isBirthday: boolean;
  isVerified: boolean;
  bio: string | null;
  live_city: string | null;
  headline: string | null;
  followers: string | null;
  following: string | null;
  coverPhoto: string | null;
}
```

### 2. **Basic Info Mode (`usePayload = true`)**

* Hits lightweight payload endpoint
* **Faster**, ideal for quick lookups
* Returns a `BasicUserInfo` object

```ts
interface BasicUserInfo {
  id: string;
  name: string;
  firstName: string;
  vanity: string;
  profilePicUrl: string; // Constructed manually
  profileUrl: string;
  gender: "male" | "female" | "no specific gender";
  type: string;
  isFriend: boolean;
  isBirthday: boolean;
  searchTokens: string[];
  alternateName?: string;
}
```

---

## ✅ Usage Examples

<details>
<summary><strong>📘 TypeScript Example (Recommend)</strong></summary>

```ts
/**
 * Example: Fetching detailed user info by scraping profile page.
 *
 * @returns DetailedUserInfo
 */

(async () => {
  const user: DetailedUserInfo = await api.getUserInfo("100088806220727", false);
  console.log("Name:", user.name);
  console.log("Bio:", user.bio);
  console.log("Lives in:", user.live_city);
})();
```

</details>

<details>
<summary><strong>⚡ JavaScript Example (Fast)</strong></summary>

```js
/**
 * Example: Fetching lightweight user info using payload endpoint.
 *
 * @returns BasicUserInfo
 */

(async () => {
  const user = await api.getUserInfo("100088806220727", true);
  console.log(user.name, user.profileUrl);
})();
```

</details>
