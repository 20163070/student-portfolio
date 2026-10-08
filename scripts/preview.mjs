import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve("out");
if (!fs.existsSync(path.join(root, "index.html")))
  throw new Error("Run npm run build first.");
const prefix = fs
  .readFileSync(path.join(root, "index.html"), "utf8")
  .includes("/student-portfolio/_next/")
  ? "/student-portfolio"
  : "";
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".xml": "application/xml",
  ".txt": "text/plain",
};
http
  .createServer((req, res) => {
    try {
      let url = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      if (prefix && url === "/") {
        res.writeHead(302, { Location: prefix + "/" });
        res.end();
        return;
      }
      if (prefix && url !== prefix && !url.startsWith(prefix + "/")) {
        res.writeHead(404);
        res.end();
        return;
      }
      if (prefix) url = url.slice(prefix.length);
      let file = path.resolve(root, "." + (url || "/"));
      if (file !== root && !file.startsWith(root + path.sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      if (fs.existsSync(file) && fs.statSync(file).isDirectory())
        file = path.join(file, "index.html");
      if (!fs.existsSync(file)) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      res.writeHead(200, {
        "Content-Type": mime[path.extname(file)] || "application/octet-stream",
      });
      fs.createReadStream(file).pipe(res);
    } catch {
      res.writeHead(400);
      res.end();
    }
  })
  .listen(4173, "127.0.0.1", () =>
    console.log("Preview: http://127.0.0.1:4173" + prefix + "/"),
  );
