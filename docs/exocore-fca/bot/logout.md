# 📄 How to Use `api.logout`

The `api.logout` function is used to gracefully end the current session and log the bot out of Facebook. This invalidates the current `appstate`, and you will need to log in again to continue using the API.

---

## 🛠️ Function Signature

```js
api.logout()
```

* This function is asynchronous and does not take any arguments.

---

## 📄 Basic Usage

Calling this function will perform the necessary HTTP requests to terminate the session on Facebook's servers.

---

## 📅 Code Example: Creating a `!logout` Command

<details><summary><strong>JavaScript</strong></summary>

```js
api.listen(async (err, event) => {
  if (err) {
    return console.error("Listen error:", err);
  }

  if (event.type === "message" && event.body?.toLowerCase() === "!logout") {
    try {
      console.log("Logging out...");
      await api.logout();
      console.log("✅ Successfully logged out.");

      // Exit the script after a successful logout
      process.exit(0);

    } catch (e) {
      console.error("Failed to logout:", e);
    }
  }
});
```

</details>

<details><summary><strong>TypeScript</strong></summary>

```ts
api.listen(async (err: Error | null, event: any) => {
  if (err) {
    return console.error("Listen error:", err);
  }

  if (event.type === "message" && event.body?.toLowerCase() === "!logout") {
    try {
      console.log("Logging out...");
      await api.logout();
      console.log("✅ Successfully logged out.");

      // Exit the script after a successful logout
      process.exit(0);

    } catch (e) {
      console.error("Failed to logout:", e);
    }
  }
});
```

</details>

---

## ⚠️ Important Notes

* **Asynchronous:** Since `api.logout()` is an async function, you should always use `await` when calling it inside another async function, or use `.then()` to handle the result.
* **Invalidates Session:** After a successful logout, the current `api` object and its associated context (`ctx`) will no longer be valid for making authenticated requests. You will need to call the main `login` function again to start a new session.
* **Error Handling:** It's good practice to wrap the call in a `try...catch` block to handle any potential network errors or issues that might occur during the logout process.
* 