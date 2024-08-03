const express=require("express");
const app=express();
if(process.env.NODE_ENV!="production"){
  require("dotenv").config({path:".env"});
}
const mongoose = require("mongoose");
const path = require("path");
const flash = require('connect-flash');
const methodOverride = require("method-override");
const MongoStore=require("connect-mongo");
app.use(flash());
const DB=process.env.DB;
app.use(methodOverride("_method"));
main().then(() => { console.log("connection succesful"); })
  .catch((err) => { console.log(err); });
async function main() {
  await mongoose.connect(DB);
};



app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
