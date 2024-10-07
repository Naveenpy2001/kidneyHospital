import React, { useState, useEffect } from "react";

function MedicalTests({ token }) {
  const [data, setData] = useState({
    TodaypatientCount: 0,
    TotalpatientCount: 0,
    patientTracking: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filterVisited, setFilterVisited] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/records", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP fetching error! status: ${response.status}`);
        }

        const result = await response.json(); // Correct usage of response.json()
        console.log("API Response:", result); // Log entire response object

        // Wrap single patient object in an array if necessary
        const patientTrackingData = Array.isArray(result) ? result : [result];

        // Update state
        setData({
          TodaypatientCount: patientTrackingData.length, // Assuming today's patient count is based on returned records
          TotalpatientCount: patientTrackingData.length, // Assuming total patient count is based on returned records
          patientTracking: patientTrackingData,
        });
        setFilteredPatients(patientTrackingData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle error, e.g., show a notification or retry fetching
      }
    };

    fetchData();
  }, [token]);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterPatients(term, filterVisited, filterDate);
  };

  const handleFilterVisitedChange = (e) => {
    const filter = e.target.value;
    setFilterVisited(filter);
    filterPatients(searchTerm, filter, filterDate);
  };

  const handleDateFilterChange = (e) => {
    const filter = e.target.value;
    setFilterDate(filter);
    filterPatients(searchTerm, filterVisited, filter);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterVisited("all");
    setFilterDate("");
    setFilteredPatients(data.patientTracking);
  };

  const filterPatients = (term, visitedFilter, dateFilter) => {
    const filtered = data.patientTracking.filter((patient) => {
      const matchesTerm =
        patient.firstName.toLowerCase().includes(term) ||
        patient.disease.toLowerCase().includes(term) ||
        patient.age.toString().includes(term);
      const matchesVisited =
        visitedFilter === "all" ||
        (visitedFilter === "visited" && patient.visited) ||
        (visitedFilter === "not_visited" && !patient.visited);
      const matchesDate = dateFilter === "" || patient.date === dateFilter;

      return matchesTerm && matchesVisited && matchesDate;
    });

    setFilteredPatients(filtered);
  };

  return (
    <div>
      <h1>Patients Data</h1>
      <div className="tracking-summary">
        <p>Today's Patients: {data.TodaypatientCount}</p>
        <p>Total Patients: {data.TotalpatientCount}</p>
      </div>
      <div className="tracking-container">
        <div className="filter-container">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name, disease, or age..."
            className="search-input"
          />

          <select
            value={filterVisited}
            onChange={handleFilterVisitedChange}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="visited">Visited</option>
            <option value="not_visited">Not Visited</option>
          </select>

          <input
            type="date"
            value={filterDate}
            onChange={handleDateFilterChange}
            className="search-input date"
          />

          <button onClick={handleClearFilters} className="clear-filters-button">
            Clear Filters
          </button>
        </div>

        <table className="tracking-table">
        <thead>
  <tr>
    <th className="patients-id">ID</th>
    <th className="patients-firstName">First Name</th>
    <th className="patients-lastName">Last Name</th>
    <th className="patients-email">Email</th>
    <th className="patients-phoneNumber">Phone Number</th>
    <th className="patients-aadharNumber">Aadhar Number</th>
    <th className="patients-address">Address</th>
    <th className="patients-gender">Gender</th>
    <th className="patients-disease">Disease</th>
    <th className="patients-otherDisease">Other Disease</th>
    <th className="patients-day">Date of birth</th>

    <th className="patients-age">Age</th>
    <th className="patients-modeOfPayment">Mode of Payment</th>
    <th className="patients-amount">Amount</th>
    <th className="patients-upiTransactionNo">UPI Transaction No</th>
    <th className="patients-netBankingTransactionId">Net Banking Transaction ID</th>
    <th className="patients-netBankingScreenshot">Net Banking Screenshot</th>
    <th className="patients-accountTransactionId">Account Transaction ID</th>
    <th className="patients-accountDocument">Account Document</th>
    <th className="patients-reference">Reference</th>
    <th className="patients-insurance">Insurance</th>
    <th className="patients-otherPayment">Other Payment</th>
    <th className="patients-weight">Weight</th>
    <th className="patients-bp">BP</th>
    <th className="patients-appointmentTaken">Appointment Taken</th>
    <th className="patients-appointmentDetails">Appointment Details</th>
    <th className="patients-modeOfPatient">Mode of Patient</th>
    <th className="patients-bedAssign">Bed Assign</th>
    <th className="patients-bedDetails">Bed Details</th>
    <th className="patients-bedNo">Bed No</th>
    <th className="patients-bedDays">Bed Days</th>
    <th className="patients-date">Date</th>
    <th className="patients-time">Time</th>
  </tr>
</thead>

<tbody>
  {filteredPatients.length > 0 ? (
    filteredPatients.map((patient, index) => (
      <tr key={index}>
        <td className="patients-id">{patient.id}</td>
        <td className="patients-firstName">{patient.firstName}</td>
        <td className="patients-lastName">{patient.lastName}</td>
        <td className="patients-email">{patient.email}</td>
        <td className="patients-phoneNumber">{patient.phoneNumber}</td>
        <td className="patients-aadharNumber">{patient.aadharNumber}</td>
        <td className="patients-address">{patient.address}</td>
        <td className="patients-gender">{patient.gender}</td>
        <td className="patients-disease">{patient.disease}</td>
        <td className="patients-otherDisease">{patient.otherDisease}</td>
        <td className="patients-day">{patient.day} / {patient.month} / {patient.year}</td>

        <td className="patients-age">{patient.age}</td>
        <td className="patients-modeOfPayment">{patient.modeOfPayment}</td>
        <td className="patients-amount">{patient.amount}</td>
        <td className="patients-upiTransactionNo">{patient.upiTransactionNo}</td>
        <td className="patients-netBankingTransactionId">{patient.netBankingTransactionId}</td>
        <td className="patients-netBankingScreenshot">{patient.netBankingScreenshot}</td>
        <td className="patients-accountTransactionId">{patient.accountTransactionId}</td>
        <td className="patients-accountDocument">{patient.accountDocument}</td>
        <td className="patients-reference">{patient.reference}</td>
        <td className="patients-insurance">{patient.insurance}</td>
        <td className="patients-otherPayment">{patient.otherPayment}</td>
        <td className="patients-weight">{patient.weight}</td>
        <td className="patients-bp">{patient.bp}</td>
        <td className="patients-appointmentTaken">{patient.appointmentTaken}</td>
        <td className="patients-appointmentDetails">{patient.appointmentDetails}</td>
        <td className="patients-modeOfPatient">{patient.modeOfPatient}</td>
        <td className="patients-bedAssign">{patient.bedAssign}</td>
        <td className="patients-bedDetails">{patient.bedDetails}</td>
        <td className="patients-bedNo">{patient.bedNo}</td>
        <td className="patients-bedDays">{patient.bedDays}</td>
        <td className="patients-date">{patient.date}</td>
        <td className="patients-time">{patient.time}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="38" className="patients-noData">No patients found</td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  );
}

export default MedicalTests;
