import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // Get the public directory path (dist/index.js is in dist/, so public is dist/public)
  const publicPath = path.join(__dirname, "public");
  
  console.log("Serving static files from:", publicPath);

  // Serve all static files
  app.use(express.static(publicPath));

  // Catch-all: serve index.html for client-side routing
  app.get("*", (_req, res) => {
    const indexPath = path.join(publicPath, "index.html");
    console.log("Serving index.html from:", indexPath);
    res.sendFile(indexPath);
  });

  const port = process.env.PORT || 3000;

  app.listen(port, "0.0.0.0", () => {
    console.log(`✅ Server running on port ${port}`);
  });
}

startServer().catch((err) => {
  console.error("❌ Server error:", err);
  process.exit(1);
});
