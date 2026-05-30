import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({

  medicineName: String,

  dosage: String,

  timing: String,

  duration: String,

});

const prescriptionSchema = new mongoose.Schema({

  patientName: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  doctorName: {
    type: String,
    required: true,
  },

  diagnosis: {
    type: String,
    required: true,
  },

  advice: String,

  medicines: [medicineSchema],

}, {
  timestamps: true,
});

const prescriptionModel =
  mongoose.models.prescription ||
  mongoose.model("prescription", prescriptionSchema);

export default prescriptionModel;