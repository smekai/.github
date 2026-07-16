/**
 * Rasterize brand SVG into export PNGs + favicon.ico
 * Run: npm install --prefix brand && npm run rasterize --prefix brand
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __dirname = dirname(fileURLToPath(import.meta.url));
const masterSvg = join(__dirname, "master", "smek-burst.svg");
const exportsDir = join(__dirname, "exports");
mkdirSync(exportsDir, { recursive: true });

async function svgToPng(outName, size) {
  const svg = readFileSync(masterSvg);
  const buf = await sharp(svg, { density: 300 })
    .resize(size, size, { fit: "fill" })
    .png()
    .toBuffer();
  writeFileSync(join(exportsDir, outName), buf);
  console.log(`wrote ${outName} (${size}x${size})`);
  return buf;
}

const avatar512 = await svgToPng("org-avatar.png", 512);
await svgToPng("avatar-512.png", 512);
await svgToPng("avatar-256.png", 256);
await svgToPng("avatar-128.png", 128);
const fav32 = await svgToPng("favicon-32.png", 32);
const fav16 = await svgToPng("favicon-16.png", 16);

const ico = await pngToIco([fav16, fav32]);
writeFileSync(join(exportsDir, "favicon.ico"), ico);
console.log("wrote favicon.ico");
console.log("done");
