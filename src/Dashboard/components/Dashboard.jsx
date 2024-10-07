import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
const Dashboard = ({ emailid, setActiveTab, token }) => {
  const [data, setData] = useState({
    TodaypatientCount: 0,
    TotalpatientCount: 0,
    todayAppointmentsCount: 0,
    totalAppointmentsCount: 0,
    todayPayment: 0,
    totalPayment: 0,
    patientTracking: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filterVisited, setFilterVisited] = useState("all");
  
  useEffect(() => {
    // const isAuthenticated = localStorage.getItem("token"); 
    // if (!isAuthenticated) {
    //   // If user is not authenticated, redirect to login page
    //   return <Navigate to="/login" />;
    // }
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem(token)}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP fetching error! status: ${response.status}`);
        }

        const result = await response.json();
        setData({
          TodaypatientCount: result.TodaypatientCount || 0,
          TotalpatientCount: result.TotalpatientCount || 0,
          todayAppointmentsCount: result.todayAppointmentsCount || 0,
          totalAppointmentsCount: result.totalAppointmentsCount || 0,
          todayPayment: result.todayPayment || 0,
          totalPayment: result.totalPayment || 0,
          patientTracking: result.patientTracking || [],
        });
        setFilteredPatients(result.patientTracking || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, e.g., show a notification or retry fetching
      }
    };

    fetchData();
  }, [token]);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = data.patientTracking.filter((patient) => {
      const matchesTerm =
        patient.name.toLowerCase().includes(term) ||
        patient.disease.toLowerCase().includes(term) ||
        patient.age.toString().includes(term);
      const matchesVisited =
        filterVisited === "all" ||
        (filterVisited === "visited" && patient.visited) ||
        (filterVisited === "not_visited" && !patient.visited);

      return matchesTerm && matchesVisited;
    });

    setFilteredPatients(filtered);
  };

  const handleFilterVisitedChange = (e) => {
    const filter = e.target.value;
    setFilterVisited(filter);

    const filtered = data.patientTracking.filter((patient) => {
      const matchesTerm =
        patient.name.toLowerCase().includes(searchTerm) ||
        patient.disease.toLowerCase().includes(searchTerm) ||
        patient.age.toString().includes(searchTerm);
      const matchesVisited =
        filter === "all" ||
        (filter === "visited" && patient.visited) ||
        (filter === "not_visited" && !patient.visited);

      return matchesTerm && matchesVisited;
    });

    setFilteredPatients(filtered);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-container">
        <div
          className="stats-card"
          style={{ backgroundColor: "#FFDDC1", cursor: "pointer" }}
          onClick={() => setActiveTab("MedicalTests")}
        >
          <h2>Today's Patients</h2>
          <p className="count">
            {data.TodaypatientCount}
          </p>
        </div>
        <div
          className="stats-card"
          style={{ backgroundColor: "#FFABAB", cursor: "pointer" }}
          onClick={() => setActiveTab("MedicalTests")}
        >
          <h2>Total Patients</h2>
          <p className="count">
            {data.TotalpatientCount}
          </p>
        </div>
        <div
          className="stats-card"
          style={{ backgroundColor: "#FFC3A0", cursor: "pointer" }}
          onClick={() => setActiveTab("MedicalPrescription")}
        >
          <h2>Today's Appointments</h2>
          <p className="count">
            {data.todayAppointmentsCount}
          </p>
        </div>
        <div
          className="stats-card"
          style={{ backgroundColor: "#D5AAFF", cursor: "pointer" }}
          onClick={() => setActiveTab("MedicalPrescription")}
        >
          <h2>Total Appointments</h2>
          <p className="count">
            {data.totalAppointmentsCount}
          </p>
        </div>
        <div
          className="stats-card"
          style={{ backgroundColor: "#B9FBC0", cursor: "pointer" }}
          onClick={() => setActiveTab("Billing")}
        >
          <h2>Today's Payment</h2>
          <p className="count">
            ₹{data.todayPayment.toLocaleString("en-IN")} /-
          </p>
        </div>
        <div
          className="stats-card"
          style={{ backgroundColor: "#C2C2F0", cursor: "pointer" }}
          onClick={() => setActiveTab("Billing")}
        >
          <h2>Total Payment</h2>
          <p className="count">
            ₹{data.totalPayment.toLocaleString("en-IN")} /-
          </p>
        </div>
      </div>

      {/* <div className="tracking-container">
        <h2>Patient Tracking</h2>
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
        </div>

        <table className="tracking-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Disease</th>
              <th>Age</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.name}</td>
                  <td>{patient.disease}</td>
                  <td>{patient.age}</td>
                  <td>{patient.visited ? "Visited" : "Not Visited"}</td>
                  <td>Date</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No patients found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default Dashboard;
