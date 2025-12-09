// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;

const DATA_FILE = path.join(__dirname, "messages.log");

app.use(cors());
app.use(express.json());

app.post("/api/messages", (req, res) => {
  const { name, email, subject, body } = req.body || {};

  const entry = {
    timestamp: new Date().toISOString(),
    name,
    email,
    subject,
    body
  };

  // <-- THIS SHOULD ALWAYS PRINT WHEN A MESSAGE IS STORED
  console.log("Received message:", entry);

  fs.appendFile(DATA_FILE, JSON.stringify(entry) + "\n", (err) => {
    if (err) {
      console.error("Failed to write message:", err);
      return res.status(500).json({ error: "Failed to store message" });
    }
    res.status(201).json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
