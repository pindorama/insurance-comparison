const express = require("express");
const cors = require("cors");

const app = express();
const config = require("./config");
const path = require("path");
const projectRoot = path.resolve(__dirname);
const tarife = require(path.join(projectRoot, "data", "tarife"));

app.use(cors(config.cors));

app.get("/api/tarife", (req, res) => {
  try {
    console.log("Tarife data:", tarife);
    const randomized = tarife.data.slice(0).sort(() => 0.5 - Math.random());
    res.json({
      meta: tarife.meta,
      data: randomized.slice(0, 5),
    });
  } catch (error) {
    console.error("Error in /api/tarife route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(config.port, () => {
  console.log("Server started!");
  console.log("Access URL:");
  console.log("\n-----------------------------------");
  console.log(`http://localhost:${config.port}`);
  console.log("-----------------------------------");
  console.log("\nPress CTRL-C to stop");
});
