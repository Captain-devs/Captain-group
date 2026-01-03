const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const sendEmail = require("./utils/mailer");

const app = express();
const PORT = 8000;

dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));


// Serve index.html from root directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Example API route (optional)
app.post("/send-email", async (req, res) => {

  try {
    console.log(req.body)
    await sendEmail(req.body);
    res.status(200).json({
      message: 'Thank you! Your inquiry has been received.'
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: 'Invalid input'
    });

  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


module.exports = app;