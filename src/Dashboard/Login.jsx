import React, { useState } from "react";
import axios from "axios";
import "../css/login.css"; 
import HMS from '../media/HMS.png'

import { useNavigate } from "react-router-dom";

import ForgotPswd from "./components/ForgotPswd";
import App from "./dashboard";

import Navbar from "../home/HomeComponents/Nav";
import Footer from "../home/Footer";

const Login = () => {
  const [emailid, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const[forgot,setForgot] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailid || !password) {
      alert('Email and password must not be empty.');
      return;
  }

    try {
        // 'URL'
      const response = await axios.post("http://localhost:8080/auth/login", {
        emailid, 
        password,
      });
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token); // Store the token
        console.log("Login successful:", response.data);
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        console.error("Login failed: Token not received");
      }
      
      // setToken=response.data
     
      setToken(response.data);
      // localStorage.setItem("token", token);
    } catch (error) {
      alert("Error logging in:")
      console.error("Error logging in:", error);
    }
  };

  const showForgotForm = () => {
    setForgot(true)
  }

  return (
    <>
    <Navbar />
      <div className="flex-center">
        <form
          className="form_container"
          action="/Dashboard"
          onSubmit={handleSubmit}
        >
          <div className="flexCenter">
          <div className="logo_container">
            <img src={HMS} alt="hms"/>
          </div>
          </div>
          <div className="title_container">
            <p className="title">Login to your Account</p>
            <span className="subtitle">
              Get started with our HMS, just create an account and enjoy the
              experience.
            </span>
          </div>
          <br />
          <label className="input_label" htmlFor="email_field">
            Email
          </label>
          <div className="input_container">
            {/* every icon className='icon'  */}
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
              title="Input title"
              name="email"
              type="text"
              className="input_field"
              id="email_field"
              value={emailid}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label className="input_label" htmlFor="password_field">
            Password
          </label>
          <div className="input_container">
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
              placeholder="password"
              title="Input title"
              name="password"
              type="password"
              className="input_field"
              id="password_field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="flex-row">
            <div>
              <input type="checkbox" />
              <label>Remember me </label>
            </div>
            <span class="span" onClick={showForgotForm}>
              Forgot password?
            </span>
          </div>
          <div className="submit_container">
            <button className="sign-in_btn" type="submit">
              Log in
            </button>
          </div>
          <div className="signup_container">
            <center>
              <p class="signup-link small">
                Don't have an account?
                <a href="/Register" class="signup-link link">
                  {" "}
                  Sign up now
                </a>
              </p>
            </center>
          </div>
        </form>
      </div>
      <div className={forgot ? "activeFOrgotForm" : "forgotForm"}>
        <div className="form-1">
          <span className="cancel" onClick={() => setForgot(false)}>
            ×
          </span>
          <ForgotPswd />
          {/* <App token={token} /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
