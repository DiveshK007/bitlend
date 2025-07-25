import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import http from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    // Create server object separately for Vite to hook into
    const server = http.createServer(app);

    // Register API routes
    await registerRoutes(app);

    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      console.error("Error occurred:", err);
      res.status(status).json({ message });
    });

    // Serve frontend with Vite in dev, static in prod
    if (app.get("env") === "development") {
      console.log("🔧 Setting up Vite for development...");
      await setupVite(app, server);
    } else {
      console.log("📦 Serving static files...");
      serveStatic(app);
    }

    const port = 5000;
    const host = "localhost";

    server.listen(port, host, () => {
      log(`🚀 Server running at http://${host}:${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();
