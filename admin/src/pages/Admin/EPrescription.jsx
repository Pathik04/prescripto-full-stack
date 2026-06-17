import axios from "axios";
import { useState } from "react";

const EPrescription = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [patientData, setPatientData] = useState({
    patientName: "",
    age: "",
    gender: "",
    doctorName: "",
    diagnosis: "",
    advice: "",
  });

  const [medicines, setMedicines] = useState([
    {
      medicineName: "",
      dosage: "",
      timing: "",
      duration: "",
    },
  ]);

  // Patient Input
  const handlePatientChange = (e) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  // Medicine Input
  const handleMedicineChange = (index, e) => {
    const values = [...medicines];

    values[index][e.target.name] = e.target.value;

    setMedicines(values);
  };

  // Add Medicine
  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        medicineName: "",
        dosage: "",
        timing: "",
        duration: "",
      },
    ]);
  };
  //Undo the add medicine

  const undoAddMedicine = () => {
    if (medicines.length > 0) {
      setMedicines(medicines.slice(0, -1));
    }
  };

  // Save Prescription
  const savePrescription = async () => {
    try {
      const prescriptionData = {
        ...patientData,
        medicines,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/prescription/create`,
        prescriptionData,
      );

      if (data.success) {
        alert("Prescription Saved Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-8">ePrescription</h1>

        <div className="grid grid-cols-2 gap-5">
          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            onChange={handlePatientChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handlePatientChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="gender"
            placeholder="Gender"
            onChange={handlePatientChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="doctorName"
            placeholder="Doctor Name"
            onChange={handlePatientChange}
            className="border p-3 rounded-lg"
          />
        </div>

        <textarea
          name="diagnosis"
          placeholder="Diagnosis"
          onChange={handlePatientChange}
          className="border p-4 rounded-lg w-full mt-5"
        />

        <textarea
          name="advice"
          placeholder="Advice"
          onChange={handlePatientChange}
          className="border p-4 rounded-lg w-full mt-5"
        />

        <div className="mt-8 space-y-5">
          {medicines.map((medicine, index) => (
            <div key={index} className="border p-5 rounded-xl">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="medicineName"
                  placeholder="Medicine Name"
                  onChange={(e) => handleMedicineChange(index, e)}
                  className="border p-3 rounded-lg"
                />

                <input
                  type="text"
                  name="dosage"
                  placeholder="Dosage"
                  onChange={(e) => handleMedicineChange(index, e)}
                  className="border p-3 rounded-lg"
                />

                <input
                  type="text"
                  name="timing"
                  placeholder="Timing"
                  onChange={(e) => handleMedicineChange(index, e)}
                  className="border p-3 rounded-lg"
                />

                <input
                  type="text"
                  name="duration"
                  placeholder="Duration"
                  onChange={(e) => handleMedicineChange(index, e)}
                  className="border p-3 rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={addMedicine}
            className="bg-green-600 text-white px-6 py-3 rounded-xl"
          >
            Add Medicine
          </button>
          <button
            type="button"
            onClick={undoAddMedicine}
            className="bg-red-600 text-white px-6 py-3 rounded-xl"
          >
            Undo
          </button>

          <button
            onClick={savePrescription}
            className="bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Save Prescription
          </button>
        </div>
      </div>
    </div>
  );
};

export default EPrescription;
