import React, { useState } from "react";
import axios from "axios";
import '../../css/otp.css'
import { useNavigate } from "react-router-dom";
const OtpVerification = ({ firstname,lastname,emailid,hospitalname,phonenumber,password,repetepassword }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    const index = parseInt(id.slice(-1));

    if (/^\d?$/.test(value)) {
      // Ensure only one digit is entered
      setOtp({ ...otp, [id]: value });

      if (value) {
        // Move to the next input field when a digit is entered
        if (index < 6) {
          const nextInput = document.getElementById(`input${index + 1}`);
          nextInput && nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    const { id, value } = e.target;
    const index = parseInt(id.slice(-1));

    if (e.key === "Backspace" && !value) {
      // Move to the previous input field if current field is empty
      if (index > 1) {
        const prevInput = document.getElementById(`input${index - 1}`);
        prevInput && prevInput.focus();

        setOtp((prevState) => ({
          ...prevState,
          [`input${index - 1}`]: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = Object.values(otp).join("");

    try {
      const response = await axios.post(
        "http://localhost:8080/verify-otp",{
        emailid,
        otp: verificationCode}
      );
      console.log(response.data);
      navigate(`/Login`);
    //   here navigate to profile after OTP verification is Success
    alert("otp verified successfully please login ")
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handleResend = async () => {
    const verificationCode = Object.values(otp).join("");

    try {
      const response = await axios.post("http://localhost:8080/resend-otp",
      { firstname,lastname,emailid,hospitalname,phonenumber,password,repetepassword
        ,otp: verificationCode}
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="title">OTP</div>
      <div className="title">Verification Code</div>
      <p className="message">
        We have sent a verification code to your E-mail Address
      </p>
      <div className="inputs">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <input
            key={num}
            id={`input${num}`}
            type="text"
            maxLength="1"
            value={otp[`input${num}`]}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ))}
      </div>
      <div className="flexBtns">
        <button className="action" type="submit">
          Verify Me
        </button>
        <button className="action" type="button" onClick={handleResend}>
          Resend OTP
        </button>
      </div>
    </form>
  );
};

export default OtpVerification;
