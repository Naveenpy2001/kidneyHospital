import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Lab.css'

const Pharmacy = () => {
  const [formData, setFormData] = useState({
    medicineName: "",
    quantity: "",
    expiryDate: "",
    price: "",
    batchNumber: "",
    manufacturer: "",
    supplierName: "",
    prescriptionRequired: "No",
    dosageForm: "",
    stockStatus: "Available",
    discount: "",
    notes: "",
  });

  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  useEffect(() => {
    // Fetch data from backend
    const fetchMedicines = async () => {
      try {
        const response = await axios.get("/api/pharmacy");
        setMedicines(response.data);
        setMedicines(response.data.medicines || []);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/pharmacy", formData);
      setMedicines([...medicines, response.data]);
      setFormData({
        medicineName: "",
        quantity: "",
        expiryDate: "",
        price: "",
        batchNumber: "",
        manufacturer: "",
        supplierName: "",
        prescriptionRequired: "No",
        dosageForm: "",
        stockStatus: "Available",
        discount: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error submitting pharmacy data:", error);
    }
  };

  const handleView = (medicine) => {
    setSelectedMedicine(medicine);
  };

  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <>
    <div className="phrmcy-container">
    <div className="billing-navigation">
        <button
          className={`dct-tab-button ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabChange(1)}
        >
          Lab Test Form
        </button>
        <button
          className={`dct-tab-button ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabChange(2)}
        >
          View/Update Lab Details
        </button>
      </div>
      {activeTab === 1 && (
        <form className="phrmcy-form" onSubmit={handleSubmit}>
        <h1 className="phrmcy-h1">Pharmacy Inventory</h1>

        <div className="phrmcy-form-group">
          <label className="phrmcy-label">Medicine Name:</label>
          <input
            type="text"
            className="phrmcy-input"
            name="medicineName"
            value={formData.medicineName}
            onChange={handleChange}
          />
        </div>

        <div className="phrmcy-form-group">
          <label className="phrmcy-label">Quantity:</label>
          <input
            type="number"
            className="phrmcy-input"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="phrmcy-form-group">
          <label className="phrmcy-label">Expiry Date:</label>
          <input
            type="date"
            className="phrmcy-input"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>

        <div className="phrmcy-form-group">
          <label className="phrmcy-label">Price:</label>
          <input
            type="number"
            className="phrmcy-input"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="phrmcy-form-group">
          <label className="phrmcy-label">Batch Number:</label>
          <input
            type="text"
            className="phrmcy-input"
            name="batchNumber"
            value={formData.batchNumber}
            onChange={handleChange}
          />
        </div>

        <div className="phrmcy-form-group">
          <label className="phrmcy-label">Manufacturer:</label>
          <input
            type="text"
            className="phrmcy-input"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
          />
        </div>

        <div className="phrmcy-form-group">
          <label className="phrmcy-label">Supplier Name:</label>
          <input
            type="text"
            className="phrmcy-input"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
          />
        </div>

        <div className="phrmcy-form-group">
          <label className="phrmcy-label">Prescription Required:</label>
          <select
            className="phrmcy-select"
            name="prescriptionRequired"
            value={formData.prescriptionRequired}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="phrmcy-form-group">
          <label className="phrmcy-label">Dosage Form:</label>
          <input
            type="text"
            className="phrmcy-input"
            name="dosageForm"
            value={formData.dosageForm}
            onChange={handleChange}
          />
        </div>

        <div className="phrmcy-form-group">
          <label className="phrmcy-label">Stock Status:</label>
          <select
            className="phrmcy-select"
            name="stockStatus"
            value={formData.stockStatus}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <div className="phrmcy-form-group">
          <label className="phrmcy-label">Discount (%):</label>
          <input
            type="number"
            className="phrmcy-input"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>

        <div className="phrmcy-form-group">
          <label className="phrmcy-label">Notes:</label>
          <textarea
            className="phrmcy-input"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="phrmcy-button">Submit</button>
      </form>
      )}

      {
        activeTab === 2 && (
            <>
            <h2 className="phrmcy-h2">Medicine Inventory</h2>
      <table className="phrmcy-table">
        <thead>
          <tr>
            <th className="phrmcy-th">Medicine Name</th>
            <th className="phrmcy-th">Quantity</th>
            <th className="phrmcy-th">Price</th>
            <th className="phrmcy-th">Stock Status</th>
            <th className="phrmcy-th">View Details</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine.id}>
              <td className="phrmcy-td">{medicine.medicineName }</td>
              <td className="phrmcy-td">{medicine.quantity}</td>
              <td className="phrmcy-td">{medicine.price}</td>
              <td className="phrmcy-td">{medicine.stockStatus}</td>
              <td className="phrmcy-td">
                <button className="phrmcy-view-button" onClick={() => handleView(medicine)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
            </>
        )
      }

      {selectedMedicine && (
        <div className="phrmcy-medicine-details">
          <h3>Medicine Details</h3>
          <p><strong>Medicine Name:</strong> {selectedMedicine.medicineName}</p>
          <p><strong>Quantity:</strong> {selectedMedicine.quantity}</p>
          <p><strong>Expiry Date:</strong> {selectedMedicine.expiryDate}</p>
          <p><strong>Price:</strong> {selectedMedicine.price}</p>
          <p><strong>Batch Number:</strong> {selectedMedicine.batchNumber}</p>
          <p><strong>Manufacturer:</strong> {selectedMedicine.manufacturer}</p>
          <p><strong>Supplier Name:</strong> {selectedMedicine.supplierName}</p>
          <p><strong>Prescription Required:</strong> {selectedMedicine.prescriptionRequired}</p>
          <p><strong>Dosage Form:</strong> {selectedMedicine.dosageForm}</p>
          <p><strong>Stock Status:</strong> {selectedMedicine.stockStatus}</p>
          <p><strong>Discount:</strong> {selectedMedicine.discount}</p>
          <p><strong>Notes:</strong> {selectedMedicine.notes}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default Pharmacy;
