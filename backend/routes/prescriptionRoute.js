import express from "express";

import {
  createPrescription,
  getPrescriptions,
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

export default prescriptionRouter;