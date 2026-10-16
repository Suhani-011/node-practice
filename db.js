const mongoose = require("mongoose");

const db = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Database connected");
        })
        .catch((err) => {
            console.log("Database not connected");
            console.log(err);
        });
};

module.exports = db;
