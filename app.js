const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const cron = require("node-cron");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: ".env" });
}

app.use(flash());

const DB = process.env.DB;
const chatRouter = require("./routes/Chatpage");
const classRouter = require('./routes/classes');
//const scheduleRouter = require('./routes/schedule');
const announcementRouter = require('./routes/announcements');
const corsOptions = {
  origin: "http://localhost:5173",
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
main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(DB);
}



app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

// Import the Chatbot model
const Chatbot = require('./models/Chatbot');

// Schedule a task to clear the collection every night at 00:00
cron.schedule('0 0 * * *', async () => {
  try {
    await Chatbot.deleteMany({});
    console.log("Chatbot collection cleared");
  } catch (error) {
    console.error("Error clearing Chatbot collection:", error);
  }
});