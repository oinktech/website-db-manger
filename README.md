# Website Database Manager

- [繁體中文](#說明-繁體中文)
- [English](#description-english)

## 說明 (繁體中文)

這個專案是一個用於管理 IndexedDB 的網站工具。用戶可以通過簡單的界面來刪除 IndexedDB 中的數據。用戶需要輸入隨機生成的確認碼以確認刪除操作。

### 使用說明

1. **靜態引入**

   要靜態引入腳本，你可以在 HTML 文件的 `<head>` 部分添加以下 `<script>` 標籤：

   ```html
   <script src="https://oinktech.github.io/website-db-manger/script.js" defer></script>
   ```

2. **動態引入**

   如果你希望通過 JavaScript 動態引入腳本，可以使用以下代碼：

   ```javascript
   const script = document.createElement('script');
   script.src = 'https://oinktech.github.io/website-db-manger/script.js';
   script.defer = true;
   document.head.appendChild(script);
   ```

### 應用程式碼示例

以下是基本的 HTML 文件範例，用於包含上述 JavaScript 應用程序：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage IndexedDB</title>
    <script src="https://oinktech.github.io/website-db-manger/script.js" defer></script>
</head>
<body>
    <!-- 按鈕會由 JavaScript 動態創建 -->
</body>
</html>
```

---

## Description (English)

This project is a web tool for managing IndexedDB. Users can delete data from IndexedDB through a simple interface. Users need to enter a randomly generated verification code to confirm the deletion action.

### Usage

1. **Static Inclusion**

   To statically include the script, you can add the following `<script>` tag in the `<head>` section of your HTML file:

   ```html
   <script src="https://oinktech.github.io/website-db-manger/script.js" defer></script>
   ```

2. **Dynamic Inclusion**

   If you want to dynamically include the script via JavaScript, you can use the following code:

   ```javascript
   const script = document.createElement('script');
   script.src = 'https://oinktech.github.io/website-db-manger/script.js';
   script.defer = true;
   document.head.appendChild(script);
   ```

### Example Application Code

Here is a basic HTML file example that includes the above JavaScript application:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage IndexedDB</title>
    <script src="https://oinktech.github.io/website-db-manger/script.js" defer></script>
</head>
<body>
    <!-- Button will be dynamically created by JavaScript -->
</body>
</html>
```

