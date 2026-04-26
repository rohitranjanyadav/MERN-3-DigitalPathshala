const mongoose = require("mongoose");

async function connectToDatabase() {
  await mongoose.connect(
    "mongodb+srv://iamshareefg_db_user:Rowhit2002@cluster0.acaqmp2.mongodb.net/?appName=Cluster0",
  );
  console.log("Database Connected")
}

module.exports = connectToDatabase
