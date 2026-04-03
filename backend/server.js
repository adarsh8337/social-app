const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS FIX
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://social-app-sage-six.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.options("*", cors());

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running"));
