const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const db = require("./db");

dotenv.config();

const app = express();
const port = process.env.PORT || 2000;

// Database connection
db();

// JSON Parser
app.use(express.json());

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// Static uploads
app.use("/uploads", express.static("uploads"));

// Root route
app.get("/", (req, res) => {
    res.send("Recipe Sharing API is running");
});

// Start server
const routes = require("./index");
app.use("/api", routes);

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server is running on http://localhost:${port}`);
    }
});