const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chat", require("./routes/chatRoute"));

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);

    // Test DB connection
    await connectDB();
});
