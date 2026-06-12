import prescriptionModel from "../models/prescriptionModel.js";
import PDFDocument from "pdfkit";
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
export const downloadPrescriptionPDF = async (req, res) => {
  try {
    const { id } = req.params;

    const prescription =
      await prescriptionModel.findById(id);

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    const doc = new PDFDocument({
      margin: 50,
    });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=prescription.pdf`
    );

    doc.pipe(res);

    // Heading
    doc
      .fontSize(24)
      .text("E-PRESCRIPTION", {
        align: "center",
      });

    doc.moveDown();

    // Patient Details
    doc.fontSize(14);
    doc.text(`Patient Name: ${prescription.patientName}`);
    doc.text(`Age: ${prescription.age}`);
    doc.text(`Gender: ${prescription.gender}`);
    doc.text(`Doctor: ${prescription.doctorName}`);

    doc.moveDown();

    // Diagnosis
    doc.fontSize(16).text("Diagnosis");
    doc.fontSize(12).text(prescription.diagnosis);

    doc.moveDown();

    // Medicines
    doc.fontSize(16).text("Medicines");

    prescription.medicines.forEach((med, index) => {
      doc.moveDown(0.5);

      doc.text(
        `${index + 1}. ${med.medicineName}`
      );

      doc.text(`Dosage: ${med.dosage}`);
      doc.text(`Timing: ${med.timing}`);
      doc.text(`Duration: ${med.duration}`);
    });

    doc.moveDown();

    // Advice
    doc.fontSize(16).text("Advice");
    doc.fontSize(12).text(
      prescription.advice || "No Advice"
    );

    doc.end();

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};