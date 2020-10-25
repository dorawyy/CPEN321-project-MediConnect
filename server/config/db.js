const mongoose = require("mongoose");

// Set up default mongoose connection
const mongoDB = process.env.DB_CONNECTION;

const initMongo = () => {
  mongoose
    .connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((result) => console.log("Connected to MongoDB!\n"))
    .catch((err) => console.log(er));
};

module.exports = initMongo;
