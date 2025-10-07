import { build } from "esbuild";

build({
  entryPoints: ["src/server.ts"],
  bundle: true,
  platform: "node",
  target: "node20",
  outdir: "dist",
  sourcemap: true,
  minify: false,
}).catch(() => process.exit(1));