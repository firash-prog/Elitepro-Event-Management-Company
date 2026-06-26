import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import fs from "fs";
import sharp from "sharp";

// Use process.cwd() to resolve paths from the root
const ROOT = process.cwd();
const UPLOADS_BASE = path.join(ROOT, "public", "uploads");

// Ensure upload directories exist
const uploadDirs = [
  path.join(UPLOADS_BASE, "hero"),
  path.join(UPLOADS_BASE, "portfolio"),
  path.join(UPLOADS_BASE, "about"),
  path.join(UPLOADS_BASE, "general")
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure Multer for memory storage since we will process with sharp
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API Routes
  app.post("/api/upload", upload.single("file"), async (req: any, res: any) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    
    const section = req.body.section || "general";
    const destDir = path.join(UPLOADS_BASE, section);
    
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `optimized-${uniqueSuffix}.webp`;
    const finalPath = path.join(destDir, filename);

    try {
      // Process with sharp
      let pipeline = sharp(req.file.buffer)
        .rotate() // Auto-rotate based on EXIF
        .webp({ quality: 80 }); // Convert to WebP with good quality/compression balance

      // Optional: Resize if it's too large (e.g., max 2560px width for 2K displays)
      const metadata = await sharp(req.file.buffer).metadata();
      if (metadata.width && metadata.width > 2560) {
        pipeline = pipeline.resize(2560);
      }

      await pipeline.toFile(finalPath);

      const publicUrl = `/uploads/${section}/${filename}`;
      res.json({ success: true, path: publicUrl });
    } catch (err) {
      console.error("Image processing error:", err);
      res.status(500).json({ error: "Failed to process image" });
    }
  });

  app.delete("/api/upload", (req: any, res: any) => {
    const { path: filePath } = req.body;
    if (!filePath) return res.status(400).json({ error: "Path required" });
    
    // filePath starts with /uploads/
    const absolutePath = path.join(ROOT, "public", filePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "File not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Explicit fallback for SPA in dev mode
    app.use("*", async (req, res, next) => {
      if (req.originalUrl.startsWith("/api")) return next();
      
      try {
        let template = fs.readFileSync(path.resolve(ROOT, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    // Production: serve built static files from dist
    const distPath = path.join(ROOT, "dist");
    const publicPath = path.join(ROOT, "public");
    
    app.use(express.static(distPath));
    // Also serve public/uploads in production if they are not in dist
    app.use("/uploads", express.static(path.join(publicPath, "uploads")));
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
