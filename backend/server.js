const path = require("path");
const express = require("express");
const colors = require("colors");
const nodemailer = require("nodemailer");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.sendStatus(200);
});

app.use(errorHandler);

app.use("/api/meals", require("./routes/mealRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/plans", require("./routes/planRoutes"));
app.use("/api/email", require("./routes/emailRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(
        path.resolve(__dirname, "../", "frontend", "dist", "index.html")
      )
  );
}


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
