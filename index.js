const { createCanvas } = require("canvas");

class textToImg {
    constructor(msg, configs = {}) {
        this.msg = msg || "";

        // options
        // font&pattern
        if (!configs.font) configs.font = {};
        this.font = {
            font: configs.font.font || "24px simsun", // 宋体
            fontHeight: configs.font.fontHeight || 24,
            fontMaxWidth: configs.font.fontMaxWidth || 24,
            fillStyle: configs.font.fillStyle || "black",
        }
        // size
        if (!configs.size) configs.size = {};
        this.size = {
            maxCharsPerLine: configs.size.maxCharsPerLine || 70,
            paddingX: configs.size.paddingX || this.font.fontMaxWidth,
            paddingY: configs.size.paddingY || this.font.fontHeight,
        }

        // init texts
        this.texts = this.getTextsPerLine(this.msg);
        this.imgWidth = this.getTextsMaxWidth(this.texts) * this.font.fontMaxWidth + this.size.paddingX * 2;
        this.imgheight = this.texts.length * this.font.fontHeight + this.size.paddingY * 2;

        // initCtx
        this.canvas = createCanvas(this.imgWidth, this.imgheight);
        this.ctx = this.canvas.getContext('2d');

        // setBackground
        this.ctx.rect(0, 0, this.imgWidth, this.imgheight);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
    }

    splitStringByLength(str, len, strs = []) {
        strs.push(str.substring(0, len));
        str = str.substring(len);
        if (str) this.splitStringByLength(str, len, strs);
        return strs;
    }

    getTextsPerLine() {
        // split by \n
        const msgs = this.msg.split("\n");
        if (this.size.maxCharsPerLine <= 0) return msgs;
        const texts = [];
        msgs.map((msg) => {
            if (msg.length > this.size.maxCharsPerLine) texts.push(...this.splitStringByLength(msg, this.size.maxCharsPerLine));
            else texts.push(msg);
        });
        return texts;
    }

    getTextsMaxWidth(texts) {
        let maxWidth = 0;
        texts.map((line) => {
            if (line.length > maxWidth) maxWidth = line.length;
        });
        return maxWidth;
    }

    text2img() {
        this.ctx.fillStyle = "black";
        this.ctx.font = this.font.font;
        this.texts.map((line, index) => {
            this.ctx.fillText(line, this.size.paddingX, this.size.paddingY * (index + 2));
        });
        return this.canvas.toDataURL();
    }
}

module.exports = textToImg;