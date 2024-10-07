import React, { useState } from "react";
import axios from "axios";
import {  useEffect } from 'react';
const DoctorView = () => {
  // State to hold form values
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [ptDiseases, setPtDiseases] = useState("");
  const [patientTreatment, setPatientTreatment] = useState("");
  const [prescription, setPrescription] = useState("");
  const [tabletName1, setTabletName1] = useState("");
  const [otherTabletName, setOtherTabletName] = useState("");
  const [injection, setInjection] = useState("");
  const [tests, setTests] = useState("");
  const [doctorAdvice, setDoctorAdvice] = useState("");
  const [tabletCount, setTabletCount] = useState(0);
  const [tabletMedicines, setTabletMedicines] = useState([]);
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [needsInjection, setNeedsInjection] = useState("No");
  const [injectionSize, setInjectionSize] = useState("");
  const [injectionName, setInjectionName] = useState("");
  const [injectionMg, setInjectionMg] = useState("");
  const [age, setAge] = useState("");
  const [activeTab, setActiveTab] = useState(1);
  const [patientsList, setPatientsList] = useState([]);
  const [visitedPatientsList, setVisitedPatientsList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);


  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };


  const[treatmentId,setTreatmentId]=useState("")
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchPatientData();
    }
  };

  
  useEffect(() => {
    if (treatmentId) {
      console.log("Updated treatmentId:", treatmentId);
    }
  }, [treatmentId]);


  const handleInjectionChange = (e) => {

    setNeedsInjection(e.target.value);
  };

  const handleMedicineChange = (index, value) => {
    const updatedMedicines = [...tabletMedicines];
    updatedMedicines[index].medicine = value;
    setTabletMedicines(updatedMedicines);
  };

  const handleOtherMedicineChange = (index, value) => {
    const updatedMedicines = [...tabletMedicines];
    updatedMedicines[index].otherName = value;
    setTabletMedicines(updatedMedicines);
  };

  const fetchPatientData = async () => {
    try {
      // Replace with your fetch API endpoint
      const response = await axios.get(
        `http://localhost:8080/api/record/${patientId}`
      );
      const data = response.data[0]; // Assuming API returns an array with one object
      setPatientName(data.firstName + " " + data.lastName);
      setPtDiseases(data.disease);
      setAge(data.age);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      alert("Failed to fetch patient data. Please try again.");
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      patientId,
      patientName,
      ptDiseases,
      prescription,
      tabletName1,
      otherTabletName,
      injectionSize,
      injectionName,
      injectionMg,
      tabletCount,
      tests,
      doctorAdvice,
      age,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/savetreatment", // Update with your actual Spring Boot endpoint
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Data submitted successfully!", response.data);
      setPatientId("");
      setPatientTreatment("");
      setPrescription("");
      setTabletName1("");
      setOtherTabletName("");
      setInjectionSize("");
      setInjectionName("");
      setInjectionMg("");
      setTabletCount(0);
      setTests("");
      setDoctorAdvice("");
      setAge("");
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  const handleTabletCountChange = (e) => {
    const count = Math.min(e.target.value, 10) || 0;
    setTabletCount(count);
    setTabletMedicines(
      Array.from({ length: count }, () => ({ medicine: "", otherName: "" }))
    );
  };

  const handlePatientView = (patient) => {
    setSelectedPatient(patient);
    setActiveTab(2); // Move to the second tab
  };

  const handleUpdateVisitedPatient = (index) => {
    const updatedPatientsList = [...visitedPatientsList];
    updatedPatientsList[index].patientName = patientName;
    updatedPatientsList[index].disease = ptDiseases;
    updatedPatientsList[index].age = age;
    setVisitedPatientsList(updatedPatientsList);
    alert("Patient updated successfully.");
  };

  const printCertificate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/generate-certificate/${patientId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      );
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const newWindow = window.open(url);
      if (newWindow) {
        newWindow.onload = () => {
          newWindow.print();
        };
      }
    } catch (error) {
      console.error("Error printing the certificate:", error);
    }
  };
  


  return (
    <>
    <div className="dct-view">
      <h1 className="dct-heading">Doctor View</h1>

      <div className="billing-navigation">
        <button
          className={`dct-tab-button ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabChange(1)}
        >
          Incomplete Patients
        </button>
        <button
          className={`dct-tab-button ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabChange(2)}
        >
          View/Update Patient Details
        </button>
        <button
          className={`dct-tab-button ${activeTab === 3 ? "active" : ""}`}
          onClick={() => handleTabChange(3)}
        >
          Completed Patients
        </button>
      </div>

      {activeTab === 1 && (
        <div className="dct-tab-content">
          <h2 className="dct-subheading">Patients List</h2>
          <table className="dct-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Disease</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patientsList.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.disease}</td>
                  <td>
                    <button
                      className="dct-view-button"
                      onClick={() => handlePatientView(patient)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


        </div>
      )}

      {activeTab === 2 && (
        
        <>
       
        <form onSubmit={handleSubmit} className="dct-form">
          <h2 className="dct-subheading">Patient Treatment</h2>
          <div className="dct-form-group">
            <label htmlFor="patientName" className="dct-label">
              Patient Name:
            </label>
            <input
              type="text"
              id="patientName"
              className="dct-input"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>
          {/* Form Fields */}
          <div className="dct-form-group">
            <label htmlFor="ptDiseases" className="dct-label">
              Patient Diseases:
            </label>
            <input
              type="text"
              id="ptDiseases"
              className="dct-input"
              value={ptDiseases}
              onChange={(e) => setPtDiseases(e.target.value)}
              required
            />
          </div>

          <div className="dct-form-group">
            <label htmlFor="age" className="dct-label">
              Patient Age:
            </label>
            <input
              type="text"
              id="age"
              className="dct-input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          {/* Other fields */}

        <h2 className="dct-subheading">Patient Treatment</h2>
         <div className="dct-form-group">
           <label htmlFor="prescription" className="dct-label">
             Doctor's Prescription:
           </label>
      
         </div>

          {/* Tablets */}
      
          <label>Number of Tablets:</label>
         <input
           type="number"
           value={tabletCount}
           onChange={handleTabletCountChange}
           className="dct-input"
         />
         <br />
         {tabletCount > 0 && tabletMedicines.map((tablet, index) => (
           <div key={index}>
             <label>Select Medicine for Tablet {index + 1}:</label>
             <select
               value={tablet.medicine}
               onChange={(e) => handleMedicineChange(index, e.target.value)}
               className="dct-input"
             >
               <option value="">Select Medicine</option>
               {medicineOptions.map((medicine) => (
                 <option key={medicine.id} value={medicine.name}>
                   {medicine.name}
                 </option>
               ))}
               <option value="Paracetamol">Paracetamol
              
               </option>
               <option value="Ibuprofen">Ibuprofen</option>
               <option value="Aspirin">Aspirin</option>
               <option value="Amoxicillin">Amoxicillin</option>
               <option value="Metformin">Metformin</option>
               <option value="Atorvastatin">Atorvastatin</option>
               <option value="Omeprazole">Omeprazole</option>
               <option value="Amlodipine">Amlodipine</option>
               <option value="Losartan">Losartan</option>
               <option value="Cetirizine">Cetirizine</option>
               <option value="Other">Other</option>
             </select>
             {tablet.medicine === "Other" && (
               <div>
                 <label>Enter Tablet Name:</label>
                 <input
                   type="text"
                   value={tablet.otherName}
                   onChange={(e) => handleOtherMedicineChange(index, e.target.value)}
                   className="dct-input"
                 />
               </div>
             )}
             <br />
           </div>
         ))}
      
         <br />
         {/* Injection */}
      
         <label>Need Injection:</label>
         <div>
           <input
             type="radio"
             name="needsInjection"
             value="Yes"
             checked={needsInjection === 'Yes'}
             onChange={handleInjectionChange}
           /> Yes
           <input
             type="radio"
             name="needsInjection"
             value="No"
             checked={needsInjection === 'No'}
             onChange={handleInjectionChange}
           /> No
         </div>
         <br />
         {/* Injection Details */}
         {needsInjection === "Yes" && (
           <div>
             <label>Select Injection Size:</label>
             <div>
               <input
                 type="radio"
                 name="injectionSize"
                 value="Small"
                 checked={injectionSize === 'Small'}
                 onChange={(e) => setInjectionSize(e.target.value)}
               /> Small
               <input
                 type="radio"
                 name="injectionSize"
                 value="Big"
                 checked={injectionSize === 'Big'}
                 onChange={(e) => setInjectionSize(e.target.value)}
               /> Big
             </div>
             <br />
             <label>Injection Name:</label>
             <input
               type="text"
               value={injectionName}
               onChange={(e) => setInjectionName(e.target.value)}
             />
             <br />
             <label>Injection mg:</label>
             <input
               type="text"
               value={injectionMg}
               onChange={(e) => setInjectionMg(e.target.value)}
             />
             <br />
             <button type="button" onClick={() => alert('Injection details updated!')}>Update</button>
             <br />
           </div>
         )}
         <div className="dct-form-group">
           <label htmlFor="tests" className="dct-label">
             Tests:
           </label>
           <input
             type="text"
             id="tests"
             className="dct-input"
             value={tests}
             onChange={(e) => setTests(e.target.value)}
             required
           />
         </div>
         <div className="dct-form-group">
           <label htmlFor="doctorAdvice" className="dct-label">
             Doctor's Advice:
           </label>
           <textarea
             id="doctorAdvice"
             className="dct-textarea"
             value={doctorAdvice}
             onChange={(e) => setDoctorAdvice(e.target.value)}
             required
           />
         </div>
          <button type="submit" className="dct-submit-button">
            Submit
          </button>
          <button
            type="button"
            onClick={printCertificate}
            className="dct-submit-button"
          >
            Download Prescription
          </button>
        </form>
        </>
      )}

      {activeTab === 3 && (
        <div className="dct-tab-content">
          <h2 className="dct-subheading">Visited Patients</h2>
          <ul className="dct-visited-list">
            {visitedPatientsList.map((patient, index) => (
              <li key={index}>
                {patient.patientName} (Age: {patient.age}) - {patient.disease}
                <button
                  className="dct-update-button"
                  onClick={() => handleUpdateVisitedPatient(index)}
                >
                  Update
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
   
    </>
  )
}

export default DoctorView;
