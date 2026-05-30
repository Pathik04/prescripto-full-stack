import prescriptionModel from "../models/prescriptionModel.js";

// Save Prescription
export const createPrescription = async (req, res) => {

  try {

    const prescription =
      new prescriptionModel(req.body);

    await prescription.save();

    res.json({
      success: true,
      message: "Prescription Saved",
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }

};

// Get All Prescriptions
export const getPrescriptions = async (req, res) => {

  try {

    const prescriptions =
      await prescriptionModel.find({});

    res.json({
      success: true,
      prescriptions,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }

};