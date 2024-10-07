import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/get/api/"; // Replace with your actual API URL

const HospitalData = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [hospitalImages, setHospitalImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef(null); // Reference for hidden file input

  // Fetch data from the backend
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        const data = response.data;
        setProfilePhoto(data.profilePhoto);
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setEmail(data.emailid);
        setPhone(data.phonenumber);
        setAddress(data.address);
        setPassword(data.password);
        setConfirmPassword(data.repetepassword);
        setHospitalName(data.hospitalname);
        const existingImages = Array.isArray(data.hospitalImages) ? data.hospitalImages : [];
        setHospitalImages(existingImages);
        setImageCount(existingImages.length);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handlers for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName") setFirstName(value);
    if (name === "lastName") setLastName(value);
    if (name === "email") setEmail(value);
    if (name === "phone") setPhone(value);
    if (name === "address") setAddress(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
    if (name === "hospitalName") setHospitalName(value);
  };

  // Trigger hidden file input when dummy image is clicked
  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger the file input
  };

  // Handle profile photo upload
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = files.length + imageCount;

    if (totalImages > 4) {
      setErrorMessage("You can only upload up to 4 images.");
    } else {
      setNewImages(files);
      setImageCount(totalImages);
      setErrorMessage("");
    }
  };

  // Submit form data to backend
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("profilePhoto", profilePhoto);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("hospitalName", hospitalName);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);

    newImages.forEach((image, index) => {
      formData.append(`hospitalImage${index + 1}`, image);
    });

    axios
      .post(API_URL, formData)
      .then((response) => {
        console.log("Success:", response.data);
        alert("Data submitted successfully!");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="hospital-data">
      <h1 className="hospital-data-heading">Profile</h1>

      <form onSubmit={handleSubmit}>
        <section className="hospital-data-section">
          <h2 className="hospital-data-subheading">Profile Photo</h2>
          <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile"
                className="hospital-data-photo"
              />
            ) : (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYnsoJKGMaangFJ0fH0LS_f-BhjwV8WEhdgg&s" // Dummy image URL
                alt="Click to upload"
                className="hospital-data-photo"
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef} // Reference to hidden file input
            style={{ display: "none" }} // Hide file input
            onChange={handleProfilePhotoChange}
          />
        </section>

        <section className="hospital-data-section">
          <h2 className="hospital-data-subheading">Personal Information</h2>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
          <label>
            Hospital Name:
            <input
              type="text"
              name="hospitalName"
              value={hospitalName}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
        </section>

        <section className="hospital-data-section">
          <h2 className="hospital-data-subheading">Upload Doctor Images</h2>
          <input
            type="file"
            name="doctorImages"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            className="hospital-data-input"
          />
          <p>{imageCount} / 4 images uploaded</p>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {hospitalImages.length > 0 && (
            <div className="hospital-data-images">
              {hospitalImages.map((img, index) => (
                <div key={index} className="hospital-data-image-container">
                  <img
                    src={img}
                    alt={`Hospital ${index}`}
                    className="hospital-data-image"
                  />
                  <span>{index + 1}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <button className="hospital-data-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default HospitalData;
