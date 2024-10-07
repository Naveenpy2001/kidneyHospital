import React from 'react';

const PrintCertificateButton = ({ patientId }) => {

  const printCertificate = async () => {
    try {
      // Make API call to generate the certificate
      const response = await fetch(`/api/generate-certificate/${patientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      // Convert the response to a Blob
      const blob = await response.blob();

      // Create a URL from the Blob
      const url = window.URL.createObjectURL(blob);

      // Open the PDF in a new browser window/tab
      const newWindow = window.open(url);

      // Automatically trigger the print dialog once the PDF is loaded
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
    <button onClick={printCertificate}>
      Print Certificate
    </button>
  );
};

export default PrintCertificateButton;
