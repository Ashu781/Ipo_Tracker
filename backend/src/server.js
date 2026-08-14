require("dotenv").config();

const express = require("express");
const cors = require("cors");

const pool = require("./db/pool");
const ipoRoutes = require("./routes/ipoRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000"
  })
);

app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      status: "ok",
      database: "connected"
    });
  } catch (error) {
    res.status(503).json({
      status: "error",
      database: "disconnected"
    });
  }
});

app.use("/api/ipos", ipoRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`IPO Tracker API running on http://localhost:${PORT}`);
});
