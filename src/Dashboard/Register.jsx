import React, { useState } from "react";
import axios from "axios";
import "../css/register.css";
import HMS from '../media/HMS.png'


import OtpVerification from "../home/HomeComponents/OTP";
import { useNavigate } from "react-router-dom";
import Footer from "../home/Footer";
import Navbar from "../home/HomeComponents/Nav";
const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [hospitalname,setHospitalName] = useState("")
  const [emailid, setEmail] = useState("");
  const [phonenumber,setPhone] = useState('')
  const [password, setPassword] = useState("");
  const [repetepassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();


  
const [otpVerify,setOtpVerify] = useState(false)


  const [loading,setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repetepassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true)
      const response = await axios.post("http://localhost:8080/register-react", {
        firstname,
        lastname,
        hospitalname,
        emailid,
        phonenumber,
        address,
        password,
        repetepassword,
        // gender,
      });
      setLoading(false)
      setOtpVerify(true)
      console.log("Registration successful:", response.data);
      // navigate(`/dashboard`);
    } catch (error) {
      console.error("Error registering:", error);
      setLoading(false);
      setOtpVerify(false);

    }
  };

  return (
    <>
    <Navbar />
    <div className="flex-center">
      <form className="form_container" onSubmit={handleSubmit}>
      <div className="flexCenter">
          <div className="logo_container">
            <img src={HMS} alt="hms"/>
          </div>
          </div>
        <div className="title_container">
          <p className="title">Create a New Account</p>
          <span className="subtitle">
            Fill out the details below to register.
          </span>
        </div>
        <br />
        <div className="input_container">
          <label className="input_label" htmlFor="username_field">
            First Name
          </label>
          {/* <svg
            viewBox="0 0 16 16"
            fill="#2e2e2e"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
          >
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg> */}
          <input
            placeholder="First Name"
            name="username"
            type="text"
            className="input_field"
            id="username_field"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input_container">
          <label className="input_label" htmlFor="username_field">
            Last Name
          </label>

          <input
            placeholder="Last Name"
            name="username"
            type="text"
            className="input_field"
            id="username_field-last"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input_container">
          <label className="input_label" htmlFor="username_field">
            Hospital Name
          </label>

          <input
            placeholder="Hospital Name"
            name="username"
            type="text"
            className="input_field"
            id="username_field-h-name"
            value={hospitalname}
            onChange={(e) => setHospitalName(e.target.value)}
          />
        </div>
        <div className="input_container">
          <label className="input_label" htmlFor="email_field">
            Email
          </label>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1.5"
              stroke="#141B34"
              d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"
            ></path>
            <path
              strokeLinejoin="round"
              strokeWidth="1.5"
              stroke="#141B34"
              d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
            ></path>
          </svg>
          <input
            placeholder="name@mail.com"
            name="emailid"
            type="emailid"
            className="input_field"
            id="email_field"
            value={emailid}
            onChange={(e) => setEmail(e.target.value)}
          />
         
        </div>
        <div className="input_container">
          <label className="input_label" htmlFor="username_field">
           Address(city,zipcode,street)
          </label>

        <input
            placeholder="address"
            name="address"
            type="text"
            className="input_field"
            id="email_field"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          </div>
        <div className="input_container">
          <label className="input_label" htmlFor="username_field">
            Phone No.
          </label>

          <input
            placeholder="+91 00000 00000"
            name="username"
            type="tel"
            className="input_field"
            id="username_field-phno"
            value={phonenumber}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="input_container">
          <label className="input_label" htmlFor="password_field">
            Password
          </label>
          <svg
            height="20"
            viewBox="-64 0 512 512"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
          >
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
          </svg>
          <input
            placeholder="Password"
            name="password"
            type="password"
            className="input_field"
            id="password_field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input_container">
          <label className="input_label" htmlFor="confirm_password_field">
            Confirm Password
          </label>
          <svg
            height="20"
            viewBox="-64 0 512 512"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
          >
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
          </svg>
          <input
            placeholder="Confirm Password"
            name="confirm_password"
            type="password"
            className="input_field"
            id="confirm_password_field"
            value={repetepassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {/* <div className="gender_container">
          <p className="input_label">Gender</p>
          <div className="gender_options">
            <span
              className={`gender_option ${gender === "Male" ? "selected" : ""}`}
              onClick={() => setGender("Male")}
            >
              Male
            </span>
            <span
              className={`gender_option ${
                gender === "Female" ? "selected" : ""
              }`}
              onClick={() => setGender("Female")}
            >
              Female
            </span>
          </div>
        </div> */}
        <button type="submit" className="sign-in_btn">

          {
              loading ? (
                  <div class="loadingtext">
  <p>Sending OTP </p>
</div>
                  ) : (
                      "Register"
                      )
              }
        </button>
        <p className="note">Terms of use &amp; Conditions</p>
        <div className="signup_container">
          <p className="signup_text">
            Already Have An Account?{" "}
            <a href="/Login" className="signup_link">
              Login
            </a>
          </p>
        </div>
      </form>
      <div className={otpVerify ? "active-otp-form" : "PopUp-OTP"}>
      
        <OtpVerification emailid={emailid} firstname={firstname} lastname={lastname} 
        hospitalname={hospitalname} phonenumber={phonenumber} password={password}  repetepassword={repetepassword}/>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Register;
