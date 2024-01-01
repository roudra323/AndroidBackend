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
<<<<<<< HEAD
  psychologistId: String,
})
=======
});
>>>>>>> 623b681b3cf60e0d962c9f438bbde3d03ae6de91

const CounselingModel = mongoose.model("Counseling", counselingSchema);

module.exports = CounselingModel;
