const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const methodOverride = require("method-override");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: ".env" });
}

app.use(flash());

const DB = process.env.DB;
const chatRouter = require("./routes/Chatpage");
const classRouter = require('./routes/classes');
//const scheduleRouter = require('./routes/schedule');
const announcementRouter = require('./routes/announcements');
const CLIENT_URL = process.env.NODE_ENV === "production" 
  ? "https://classify-sage.vercel.app/" 
  : "http://localhost:8080";
const corsOptions = {
  origin: CLIENT_URL,  // Update this with your production client URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.use("/Chatpage", chatRouter);
app.use('/classes', classRouter);
//app.use('/schedule', scheduleRouter);
app.use('/announcement', announcementRouter);

mongoose.connect(DB)
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

// Remove the app.listen() for serverless deployment on Vercel
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
// Import the Chatbot model
const Chatbot = require('./models/Chatbot');

// Remove the cron job or move it to another service since it won't work well in a serverless environment
// cron.schedule('0 0 * * *', async () => {
//   try {
//     await Chatbot.deleteMany({});
//     console.log("Chatbot collection cleared");
//   } catch (error) {
//     console.error("Error clearing Chatbot collection:", error);
//   }
// });

module.exports = app;  // Export the app for use in a serverless function
