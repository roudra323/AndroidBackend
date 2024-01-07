const mongoose = require("mongoose");

const article = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  },
  posterId: {
    type: String,
  },
  articlePicture: {
    type: String,
    default: "demo.jpg",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = article;
