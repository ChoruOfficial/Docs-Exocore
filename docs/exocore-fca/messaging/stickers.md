# api.stickers Documentation

> Author: **@ChoruOfficial**

A clean and structured interface for interacting with Facebook stickers through the `api.stickers` module. All methods return Promises and support async/await usage.

---

## 📌 Functions

### `listPacks()`
Retrieve the currently installed sticker packs.

```js
/**
 * Get sticker packs currently installed.
 * @returns {Promise<StickerPack[]>}
 */
const packs = await api.stickers.listPacks();
```
```ts
const packs: StickerPack[] = await api.stickers.listPacks();
```

---

### `getStorePacks()`
Fetch all sticker packs available in the Facebook Sticker Store.

```js
/**
 * Get all available store packs.
 * @returns {Promise<StickerPack[]>}
 */
const storePacks = await api.stickers.getStorePacks();
```
```ts
const storePacks: StickerPack[] = await api.stickers.getStorePacks();
```

---

### `listAllPacks()`
Combine local and store packs, filtering out duplicates.

```js
/**
 * Get all unique sticker packs.
 * @returns {Promise<StickerPack[]>}
 */
const allPacks = await api.stickers.listAllPacks();
```
```ts
const allPacks: StickerPack[] = await api.stickers.listAllPacks();
```

---

### `addPack(packID)`
Add a sticker pack to your account by ID.

```js
/**
 * Add a sticker pack to your tray.
 * @param {string} packID
 * @returns {Promise<AddedPack>}
 */
const added = await api.stickers.addPack("1802375567178656");
```
```ts
const added: AddedPack = await api.stickers.addPack("1802375567178656");
```

---

### `getStickersInPack(packID)`
List all individual stickers within a specific pack.

```js
/**
 * Get stickers in a specific pack.
 * @param {string} packID
 * @returns {Promise<Sticker[]>}
 */
const stickers = await api.stickers.getStickersInPack("759317137936130");
```
```ts
const stickers: Sticker[] = await api.stickers.getStickersInPack("759317137936130");
```

---

### `getAiStickers(options)`
Retrieve trending AI-generated stickers.

```js
/**
 * Get AI-generated stickers.
 * @param {{ limit?: number }} options
 * @returns {Promise<AiSticker[]>}
 */
const aiStickers = await api.stickers.getAiStickers({ limit: 5 });
```
```ts
const aiStickers: AiSticker[] = await api.stickers.getAiStickers({ limit: 5 });
```

---

### `search(query)`
Search for stickers using a keyword or phrase.

```js
/**
 * Search for stickers.
 * @param {string} query
 * @returns {Promise<Sticker[]>}
 */
const results = await api.stickers.search("happy cat");
```
```ts
const results: Sticker[] = await api.stickers.search("happy cat");
```

---

## 🧩 Types

### `StickerPack`
```ts
interface StickerPack {
  id: string;
  name: string;
  thumbnail: string;
}
```

### `Sticker`
```ts
interface Sticker {
  ID: string;
  label: string;
  url: string;
  animatedUrl: string;
  packID: string;
}
```

### `AiSticker`
```ts
interface AiSticker {
  ID: string;
  label: string;
  url: string;
}
```

### `AddedPack`
```ts
interface AddedPack {
  artist: string;
  id: string;
  name: string;
  in_sticker_tray: boolean;
  preview_image: {
    uri: string;
  };
  thumbnail_image: {
    uri: string;
  };
}
```
