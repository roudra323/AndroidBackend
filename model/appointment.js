const mongoose = require('mongoose');

const counselingSchema = new mongoose.Schema({
  userId: String,
  name: String,
  dept: String,
  phone: String,
  age: String,
  email: String,
  presentAddress: String,
  date: String,
  takenBefore: Boolean,
  heradAboutUs: [String],
  problems: [String],
  otherProblem: String,
  counselingType: [String],
  counselingTime: [String],
  counselingDay: [String],
  status: String,
})

const CounselingModel = mongoose.model('Counseling', counselingSchema);

module.exports = CounselingModel;
