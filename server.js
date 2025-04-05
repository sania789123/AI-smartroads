require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Ensure the model is correctly imported
const DataModel = require("./models/datamodel");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ **Connect to MongoDB**
mongoose
  .connect("mongodb://localhost:27017/smartroads")
    
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ **Test API Route**
app.get("/api/smartroads", (req, res) => {
  res.send("🚀 Smart Roads Backend is Running!");
});

// ✅ **POST: Add Data to MongoDB**
app.post("/api/data", async (req, res) => {
  try {
      // Extract data from request body
      const { name, value, location, status } = req.body;

      // Check if required fields are present
      if (!name || !value || !location) {
          return res.status(400).json({ message: "❌ Missing required fields" });
      }

      // Create new data model
      const newData = new DataModel({ name, value, location, status });
      await newData.save(); // Save data to MongoDB

      res.status(201).json({ message: "✅ Data saved successfully", data: newData });
  } catch (error) {
      console.error("❌ Error saving data:", error);
      res.status(500).json({ message: "❌ Error saving data", error });
  }
});

// ✅ **GET: Retrieve Data from MongoDB**
app.get("/api/data", async (req, res) => {
  try {
    const data = await DataModel.find(); // Fetch data from MongoDB
    res.json(data);
  } catch (error) {
    console.error("❌ Error retrieving data:", error);
    res.status(500).json({ message: "❌ Error retrieving data", error });
  }
});

// ✅ **Start Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));