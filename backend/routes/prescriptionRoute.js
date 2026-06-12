import express from "express";

import {
  createPrescription,
  getPrescriptions,
  downloadPrescriptionPDF,
} from "../controllers/prescriptionController.js";

const prescriptionRouter = express.Router();

prescriptionRouter.post(
  "/create",
  createPrescription
);

prescriptionRouter.get(
  "/all",
  getPrescriptions
);

prescriptionRouter.get(
  "/pdf/:id",
  downloadPrescriptionPDF
);

export default prescriptionRouter;