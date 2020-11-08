# node-text2img

[![npm](https://img.shields.io/npm/v/node-text2img?style=flat-square)](https://www.npmjs.com/package/node-text2img)

```
npm install node-text2img
```

```javascript
const t2i = require("./index");
const text = "Your Text\nHere!";
// configs can be omitted
const configs = {
    font: {
        font: "24px 宋体",
        fontHeight: 24,
        fontMaxWidth: 24,
        fillStyle: "black",
    },
    size: {
        maxCharsPerLine: 50,
        paddingX: 24,
        paddingY: 24,
    }
};
const base64Url = new t2i(text, configs).text2img(); // base64 url like "data:image/png;base64,#picdata#"
console.log(base64Url);
```
