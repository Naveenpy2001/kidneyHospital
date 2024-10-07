import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Billing = () => {
  const [todaysPayments, setTodaysPayments] = useState([]);
  const [monthlyTotalPayments, setMonthlyTotalPayments] = useState({ monthWise: [], yearWise: [] });
  const [totalPatients, setTotalPatients] = useState(0);
  const [walletAmount, setWalletAmount] = useState(0);
  const [currentTab, setCurrentTab] = useState('todaysPayments');
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    ifscCode: '',
    accountNumber: '',
    fullName: '',
    phoneNumber: '',
  });

  const [isBankDetailsExist, setIsBankDetailsExist] = useState(false); // Track if bank details exist
  const [showForm, setShowForm] = useState(true); // Control form visibility

  // Fetch the bank details when the component loads

  useEffect(() => {
    axios.get('http://localhost:8080/api/bank-details')
      .then(response => {
        if (response.data) {
          setBankDetails(response.data);
          setIsBankDetailsExist(true); // Bank details exist
          setShowForm(false); // Hide form since details exist
        }
      })
      .catch(error => console.error('Error fetching bank details:', error));
  }, []);

  // Fetch payments data
  useEffect(() => {
    axios.get('http://localhost:8080/api/payments/today')
      .then(response => {
        setTodaysPayments(response.data || []);
        setTotalPatients(response.data.length);
      })
      .catch(error => console.error('Error fetching today\'s payments:', error));

    axios.get('http://localhost:8080/monthly-total')
      .then(response => setMonthlyTotalPayments(response.data || { monthWise: [], yearWise: [] }))
      .catch(error => console.error('Error fetching total payments:', error));
  }, []);

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  const handleBankDetailChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();


    // Submit or update bank details
    if (isBankDetailsExist) {
      axios.put('http://localhost:8080/api/bank-details', bankDetails)
        .then(response => {
          console.log('Bank details updated:', response.data);
          setShowForm(false); // Hide form after successful update
        })
        .catch(error => console.error('Error updating bank details:', error));
    } else {
      axios.post('http://localhost:8080/api/bank-details', bankDetails)
        .then(response => {
          console.log('Bank details submitted:', response.data);
          setIsBankDetailsExist(true); // Mark as existing details
          setShowForm(false); // Hide form after submission
        })
        .catch(error => console.error('Error submitting bank details:', error));
    }

    // Submit the bank details via an API
    try {
      // Make an API request to save the bank details
      const response =  axios.post('http://localhost:8080/save-bank-details', bankDetails);

      // Handle success response
      console.log('Bank details saved successfully:', response.data);
      alert('Bank details saved successfully!');
    } catch (error) {
      // Handle error
      console.error('Error saving bank details:', error);
      alert('Failed to save bank details. Please try again.');
    }
    console.log(bankDetails);


  };

  // Calculate total commission
  const commissionRate = 15;
  const totalCommission = totalPatients * commissionRate;

  return (
    <div className="billing">
      <h1 className="billing-heading">Accounts Information</h1>

      {/* Navigation for tabs */}
      <div className="billing-navigation">
        <button onClick={() => handleTabClick('todaysPayments')}>Today's Payments</button>
        <button onClick={() => handleTabClick('totalPayments')}>Total Payments</button>
        <button onClick={() => handleTabClick('wallet')}>Wallet Amount</button>
        <button onClick={() => handleTabClick('bankDetails')}>Bank Details</button> {/* New tab for Bank Details */}
      </div>

      {/* Today's Payments Tab */}
      {currentTab === 'todaysPayments' && (
        <section className="billing-section">
          <h2 className="billing-subheading">Today's Payments</h2>
          <table className="billing-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Phone</th>
                <th>Name</th>
                <th>Registration Fee</th>
              </tr>
            </thead>
            <tbody>
              {todaysPayments.length > 0 ? (
                todaysPayments.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.id}</td>
                    <td>{payment.phoneNumber}</td>
                    <td>{payment.firstName} {payment.lastName}</td>
                    <td>{payment.amount} INR</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      )}

      {/* Total Payments Tab */}
      {currentTab === 'totalPayments' && (
        <section className="billing-section">
          <h2 className="billing-subheading">Total Payments</h2>
          <div className="billing-summary">
            <div className="billing-summary-item">
              <h3>Month-wise</h3>
              <table className="billing-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Amount (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyTotalPayments.monthWise.length > 0 ? (
                    monthlyTotalPayments.monthWise.map((payment, index) => (
                      <tr key={index}>
                        <td>{payment.month}</td>
                        <td>{payment.totalAmount} INR</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="billing-summary-item">
              <h3>Year-wise</h3>
              <table className="billing-table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Amount (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyTotalPayments.yearWise.length > 0 ? (
                    monthlyTotalPayments.yearWise.map((payment, index) => (
                      <tr key={index}>
                        <td>{payment.year}</td>
                        <td>{payment.amount} INR</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Wallet Amount Tab */}
      {currentTab === 'wallet' && (
        <section className="billing-section">
          <h2 className="billing-subheading">Your Wallet Amount</h2>
          <p>Total Patients: {totalPatients}</p>
          <p>Total Commission: {totalCommission} INR (15 INR per patient)</p>
          <button className="payCommission">Click to Pay</button>
          <hr />
          <p>Wallet Amount: {walletAmount} INR</p>
          <p>Doctor's Wallet Amount (after commission): {walletAmount - totalCommission} INR</p>
        </section>
      )}

      {/* Bank Details Tab */}
      {currentTab === 'bankDetails' && (
        <div className="billing-bank-details">
          <h2>Bank Details</h2>

          {/* Show the form only if showForm is true */}
          {showForm ? (
            <form onSubmit={handleFormSubmit} style={{width:'50%'}}>
              <label>
                Bank Name:
                <input type="text" name="bankName" className="dct-input" value={bankDetails.bankName} onChange={handleBankDetailChange} />
              </label>
              <label>
                IFSC Code:
                <input type="text" name="ifscCode" className="dct-input" value={bankDetails.ifscCode} onChange={handleBankDetailChange} />
              </label>
              <label>
                Account Number:
                <input type="text" name="accountNumber" className="dct-input" value={bankDetails.accountNumber} onChange={handleBankDetailChange} />
              </label>
              <label>
                Full Name:
                <input type="text" name="fullName" className="dct-input" value={bankDetails.fullName} onChange={handleBankDetailChange} />
              </label>
              <label>
                Phone Number:
                <input type="text" name="phoneNumber" className="dct-input" value={bankDetails.phoneNumber} onChange={handleBankDetailChange} />
              </label>
              <button type="submit">
                {isBankDetailsExist ? 'Update Details' : 'Submit'}
              </button>
            </form>
          ) : (
            // Show the submitted bank details
            <div className="bank-details-display">
              <p><strong>Bank Name:</strong> {bankDetails.bankName}</p>
              <p><strong>IFSC Code:</strong> {bankDetails.ifscCode}</p>
              <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
              <p><strong>Full Name:</strong> {bankDetails.fullName}</p>
              <p><strong>Phone Number:</strong> {bankDetails.phoneNumber}</p>
              <button onClick={() => setShowForm(true)}>Edit Bank Details</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Billing;
