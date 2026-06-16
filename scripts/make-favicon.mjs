import sharp from "sharp";
import pngToIco from "png-to-ico";
import fs from "fs/promises";

const input = "app/icon-source.png";
const outputPng = "app/icon.png";
const outputIco = "app/favicon.ico";

await sharp(input)
  .trim()
  .resize(430, 430, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .extend({
    top: 41,
    bottom: 41,
    left: 41,
    right: 41,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile(outputPng);

const icoBuffer = await pngToIco(outputPng);
await fs.writeFile(outputIco, icoBuffer);

console.log("Favicon amélioré généré : app/icon.png + app/favicon.ico");
