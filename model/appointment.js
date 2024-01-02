const mongoose = require("mongoose");

const counselingSchema = new mongoose.Schema({
  userId: String,
  name: String,
  department: String,
  mobile: String,
  age: String,
  email: String,
  address: String,
  date: String,
  takenBefore: Boolean,
  heradAboutUs: [String],
  problems: [String],
  otherProblem: String,
  counselingType: [String],
  counselingTime: [String],
  counselingDay: [String],
  status: String,
  psychologistId: String,
});

const CounselingModel = mongoose.model("Counseling", counselingSchema);

module.exports = CounselingModel;
