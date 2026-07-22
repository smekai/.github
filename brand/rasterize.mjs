/**
 * Resize the approved SMEK AI identity into GitHub/avatar and favicon exports.
 * Run: npm install --prefix brand && npm run rasterize --prefix brand
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __dirname = dirname(fileURLToPath(import.meta.url));
const masterIcon = join(
  __dirname,
  "identity",
  "smek_ai_icon_graphite_smek_ai@2x.png",
);
const exportsDir = join(__dirname, "exports");
mkdirSync(exportsDir, { recursive: true });

async function iconToPng(outName, size) {
  const icon = readFileSync(masterIcon);
  const buf = await sharp(icon)
    .resize(size, size, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();
  writeFileSync(join(exportsDir, outName), buf);
  console.log(`wrote ${outName} (${size}x${size})`);
  return buf;
}

const avatar512 = await iconToPng("org-avatar.png", 512);
await iconToPng("avatar-512.png", 512);
await iconToPng("avatar-256.png", 256);
await iconToPng("avatar-128.png", 128);
const fav32 = await iconToPng("favicon-32.png", 32);
const fav16 = await iconToPng("favicon-16.png", 16);

const ico = await pngToIco([fav16, fav32]);
writeFileSync(join(exportsDir, "favicon.ico"), ico);
console.log("wrote favicon.ico");
console.log("done");
