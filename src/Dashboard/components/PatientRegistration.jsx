import React, { useState } from "react";
import axios from "axios";
import "../../css/patientRegister.css";

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    aadharNumber: "",
    address: "",
    gender: "",
    disease: "",
    otherDisease: "",
    day: "",
    month: "",
    year: "",
    age: "",
    paymentType: "",
    modeOfPayment: "",
    amount: "",
    tsarItAmount: "", // TSAR-IT amount
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [successData, setSuccessData] = useState(null); // Success state to hold user details

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (["day", "month", "year"].includes(name)) {
      calculateAge({ ...formData, [name]: value });
    }
  };

  const calculateAge = (data) => {
    const { day, month, year } = data;
    if (day && month && year) {
      const birthDate = new Date(year, month - 1, day);
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      setFormData((prevState) => ({
        ...prevState,
        age: calculatedAge,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post("http://localhost:8080/saveAthentication", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const savedUserData = response.data; // Assuming response has user data including ID
      setSuccessData({
        id: savedUserData.id, // Adjust based on the response data structure
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phoneNumber,
        age: formData.age,
      });
      console.log("Form submitted successfully!");
      alert("Form submitted successfully!");
    } catch (error) {
      alert("There was an error submitting the form!");
      console.error("There was an error submitting the form!", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleTSARITPayment = () => {
    const options = {
      key: "rzp_live_oRtGw5y3RbD9MH",
      amount: formData.tsarItAmount * 100,
      currency: "INR",
      name: "TSAR-IT Services",
      description: "Payment for services",
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phoneNumber,
      },
      notes: {
        address: formData.address,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="pr-forms">
      <h1>Patient Registration Form</h1>
      {loading && <div className="loading-spinner">Submitting...</div>}

      {!successData ? (
      <form onSubmit={handleSubmit}>
        {/* Form fields for patient details */}
        <label>First name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className="pr-input"
        />
        <br />
        <label>Last name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="pr-input"
        />
        <br />
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="pr-input"
        />
        <br />
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="pr-input"
        />
        <br />
        <label>Aadhar Number:</label>
        <input
          type="text"
          name="aadharNumber"
          value={formData.aadharNumber}
          onChange={handleInputChange}
          className="pr-input"
        />
        <br />
        <label>Address:</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="pr-textarea"
        />
        <br />
        <label>Gender:</label>
        <input
          type="radio"
          name="gender"
          value="Male"
          onChange={handleInputChange}
          className="pr-radio"
        />{" "}
        Male
        <input
          type="radio"
          name="gender"
          value="Female"
          onChange={handleInputChange}
          className="pr-radio"
        />{" "}
        Female
        <input
          type="radio"
          name="gender"
          value="Others"
          onChange={handleInputChange}
          className="pr-radio"
        />{" "}

        Others
        <br />
        <br />
        <label>Disease:</label>
        <select
          name="disease"
          value={formData.disease}
          onChange={handleInputChange}
          className="pr-select"
        >
          <option value="Fever">Fever</option>
          <option value="Headache">Headache</option>
          <option value="Cold">Cold</option>
          <option value="Rashes">Rashes</option>
          <option value="Others">Others</option>
        </select>
        {formData.disease === "Others" && (
          <input
            type="text"
            name="otherDisease"
            value={formData.otherDisease}
            onChange={handleInputChange}
            className="pr-input"
            placeholder="Enter other disease"
          />
        )}
        <br />
        <label>Date of Birth:</label>
        <div className="flexCenter">
        <select
          name="day"
          value={formData.day}
          onChange={handleInputChange}
          className="pr-select"
        >
          <option value="">Day</option>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          name="month"
          value={formData.month}
          onChange={handleInputChange}
          className="pr-select"
        >
          <option value="">Month</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          name="year"
          value={formData.year}
          onChange={handleInputChange}
          className="pr-select"
        >
          <option value="">Year</option>
          {Array.from({ length: 100 }, (_, i) => (
            <option key={i + 1920} value={i + 1920}>
              {i + 1920}
            </option>
          ))}
        </select>
        </div>
        <br />
        {formData.age && (
          <div>
            <label>Age:</label>
            <input
              type="text"
              value={formData.age}
              className="pr-input"
              readOnly
            />
            <br />
          </div>
        )}

       
        
         <label>Weight:</label>
         <input
           type="text"
           name="weight"
           value={formData.weight}
           onChange={handleInputChange}
           className="pr-input"
         />
         <br />
         <label>Blood Pressure:</label>
         <input
           type="text"
           name="bp"
           value={formData.bp}
           onChange={handleInputChange}
           className="pr-input"
         />
         <br />

         <label htmlFor="temp">Temparature : </label>
         <input type="text"  className="pr-input" name="temp" id="temp"/>

         <br />
         <label>Already Taken Any Appointment:</label> 
         <br />
         <input
           type="radio"
           name="appointmentTaken"
           value="Yes"
           onChange={handleInputChange}
           className="pr-radio"
         />{" "}
         Yes
         <input
           type="radio"
           name="appointmentTaken"
           value="No"
           onChange={handleInputChange}
           className="pr-radio"
         />{" "}
         No
         <br />
         {formData.appointmentTaken === "Yes" && (
           <div>
             <label>Details (Phone/Email/Token No.):</label>
             <input
               type="text"
               name="appointmentDetails"
               value={formData.appointmentDetails}
               onChange={handleInputChange}
               className="pr-input"
             />
           </div>
         )}
         <br />
         <label>Mode of Patient:</label>
         <select
           name="modeOfPatient"
           value={formData.modeOfPatient}
           onChange={handleInputChange}
           className="pr-select"
         >
           <option value="">Select Mode</option>
           <option value="OPD">OPD</option>
           <option value="IPD">IPD</option>
           <option value="Emergency">Emergency</option>
         </select>
         <br />
         <label>Bed Assigned:</label>
         <input
           type="radio"
           name="bedAssign"
           value="Yes"
           onChange={handleInputChange}
           className="pr-radio"
         />{" "}
         Yes
         <input
           type="radio"
           name="bedAssign"
           value="No"
           onChange={handleInputChange}
           className="pr-radio"
         />{" "}
         No
         <br />
         {formData.bedAssign === "Yes" && (
           <div>
             <label>Select Bed:</label>
             <input
               type="text"
               name="bedDetails"
               value={formData.bedDetails}
               onChange={handleInputChange}
               className="pr-input"
               placeholder="Bed details"
             />
             <br />
             <label>Bed No:</label>
             <input
               type="text"
               name="bedNo"
               value={formData.bedNo}
               onChange={handleInputChange}
               className="pr-input"
             />
             <br />
             <label>How Many Days:</label>
             <input
               type="text"
               name="bedDays"
               value={formData.bedDays}
               onChange={handleInputChange}
               className="pr-input"
               placeholder="Number of days"
             />
           </div>
         )}
        <br />

         <br />
         <label>Select Payment Type:</label>
        <select
          name="paymentType"
          value={formData.paymentType}
          onChange={handleInputChange}
          className="pr-select"
        >
          <option value="">Select Payment Type</option>
          <option value="TSAR-IT">TSAR-IT Payment</option>
          <option value="Doctor Payment">Doctor Payment</option>
        </select>
        <br />

        {/* Payment Details Based on Selected Payment Type */}
        {formData.paymentType === "TSAR-IT" && (
          <div>
            <label>TSAR-IT Amount:</label>
            <input
              type="text"
              name="tsarItAmount"
              value={formData.tsarItAmount}
              onChange={handleInputChange}
              className="pr-input"
            />
            <br />
            <button type="button" className="pr-button" onClick={handleTSARITPayment}>
              Pay with Razorpay
            </button>
          </div>
        )}

        {formData.paymentType === "Doctor Payment" && (
          <div>
            <label>Mode of Payment:</label>
            <select
              name="modeOfPayment"
              value={formData.modeOfPayment}
              onChange={handleInputChange}
              className="pr-select"
            >
              <option value="">Select Payment Mode</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="NetBanking">Net Banking</option>
              <option value="Account">Account</option>
              <option value="Reference">Reference</option>
              <option value="Insurance">Insurance</option>
              <option value="Others">Others</option>
            </select>
            <br />
            {formData.modeOfPayment === "Cash" && (
              <div>
                <label>Amount:</label>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="pr-input"
                />
              </div>
            )}

            {formData.modeOfPayment === "UPI" && (
              <div>
                <label>Amount:</label>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="pr-input"
                />
                <br />
                <label>UPI Transaction No:</label>
                <input
                  type="text"
                  name="upiTransactionNo"
                  value={formData.upiTransactionNo}
                  onChange={handleInputChange}
                  className="pr-input"
                />
              </div>
            )}

            {formData.modeOfPayment === "NetBanking" && (
              <div>
                <label>Amount:</label>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="pr-input"
                />
                <br />
                <label>Transaction ID:</label>
                <input
                  type="text"
                  name="netBankingTransactionId"
                  value={formData.netBankingTransactionId}
                  onChange={handleInputChange}
                  className="pr-input"
                />
                <br />
                <label>Screenshot:</label>
                <input
                  type="file"
                  name="netBankingScreenshot"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      netBankingScreenshot: e.target.files[0],
                    })
                  }
                  className="pr-file"
                />
              </div>
            )}

            {formData.modeOfPayment === "Account" && (
              <div>
                <label>Amount:</label>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="pr-input"
                />
                <br />
                <label>Transaction ID:</label>
                <input
                  type="text"
                  name="accountTransactionId"
                  value={formData.accountTransactionId}
                  onChange={handleInputChange}
                  className="pr-input"
                />
                <br />
                <label>Document:</label>
                <input
                  type="file"
                  name="accountDocument"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      accountDocument: e.target.files[0],
                    })
                  }
                  className="pr-file"
                />
              </div>
            )}

            {formData.modeOfPayment === "Reference" && (
              <div>
                <label>Reference:</label>
                <input
                  type="text"
                  name="reference"
                  value={formData.reference}
                  onChange={handleInputChange}
                  className="pr-input"
                />
              </div>
            )}

            {formData.modeOfPayment === "Insurance" && (
              <div>
                <label>Insurance Details:</label>
                <input
                  type="text"
                  name="insurance"
                  value={formData.insurance}
                  onChange={handleInputChange}
                  className="pr-input"
                />
              </div>
            )}

            {formData.modeOfPayment === "Others" && (
              <div>
                <label>Other Payment Details:</label>
                <input
                  type="text"
                  name="otherPayment"
                  value={formData.otherPayment}
                  onChange={handleInputChange}
                  className="pr-input"
                />
              </div>
            )}
          </div>
        )}

        <br />

        <button type="submit" className="pr-button">Submit</button>
      </form>

) : (
  <div className="success-message">
    <h2>Registration Successful!</h2>
    <p><strong>User ID:</strong> {successData.id}</p>
    <p><strong>Name:</strong> {successData.name}</p>
    <p><strong>Email:</strong> {successData.email}</p>
    <p><strong>Phone:</strong> {successData.phone}</p>
    <p><strong>Age:</strong> {successData.age}</p>
    <button onClick={() => setSuccessData(null)} className="pr-button">
      Register Another Patient
    </button>
  </div>
)}

    </div>
  );
};

export default PatientRegistration;
