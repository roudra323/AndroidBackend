const CounselingModel = require("../model/appointment");

const formDataAppoi = async (req, res) => {
  console.log(req.params.id);
  const userId = req.params.id;
  try {
    const formData = req.body;
    console.log("This is formData", formData);
    const counselingRecord = new CounselingModel(formData);
    counselingRecord.status = "pending";
    counselingRecord.userId = userId;
    const savedRecord = await counselingRecord.save();
    res.status(201).json({ message: "Form data saved successfully" });
  } catch (error) {
    console.error(error);

    // Log the specific MongoDB error message
    if (error.name === "MongoError" && error.code === 16500) {
      console.error("MongoDB Insert Operation Timed Out");
    }

    res.status(500).send("Internal Server Error");
  }
};

const getFormDataAll = async (req, res) => {
  try {
    const formData = await CounselingModel.find();
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const getFormDatabyId = async (req, res) => {

    const userId = req.params.userId;
    console.log(userId);
    try {
        const formData = await CounselingModel.find({ userId }); 
        if (!formData) {
            return res.status(404).json({ error: 'Form data not found' });
        }
        res.status(200).json(formData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
  }
};

const getDatabyId = async (req, res) => {
  const Id = req.params.id;
  console.log(Id);
  try {
    const formData = await CounselingModel.findOne({ _id: Id });
    if (!formData) {
      return res.status(404).json({ error: "Form data not found" });
    }
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteData = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const formData = await CounselingModel.findByIdAndDelete({ _id: id });
    if (!formData) {
      return res.status(404).json({ error: "Form data not found" });
    }
    res.status(200).json({ message: "Form data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


const changeStatus = async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    try {
        const formData = await CounselingModel.findOne({ _id: id });
        if (!formData) {
            return res.status(404).json({ error: 'Form data not found' });
        }
        formData.status = 'confirmed';
        formData.psychologistId = req.body.psychologistId;
        await formData.save();
        res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { formDataAppoi, getFormDataAll, getFormDatabyId,getDatabyId,deleteData,changeStatus};

