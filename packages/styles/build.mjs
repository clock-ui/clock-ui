import { transform } from "lightningcss";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";

// Try to create dist folder if missing
mkdirSync("dist", { recursive: true });

function build(file) {
  const css = readFileSync(`src/${file}`, "utf8");

  const { code } = transform({
    code: Buffer.from(css),
    minify: true,
    targets: {
      chrome: 100 << 16,
      safari: 15 << 16,
      firefox: 100 << 16,
    },
  });

  const outputPath = `dist/${file}`;

  // Make sure parent folder exists (future-proof if you make subfolders)
  mkdirSync(dirname(outputPath), { recursive: true });

  writeFileSync(outputPath, code);
  console.log(`✅ Built ${outputPath}`);
}

["base.css"].forEach(build);
