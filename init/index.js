const mongoose = require("mongoose");
const initData = require("./data.js"); // Ensure this file exports the necessary data
const Listing = require("../models/listing.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj , owner:'676a6ea9ca8898f4aa7f9203' }))
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
