import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import { FaHome } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";
import { GiArchiveRegister } from "react-icons/gi";
import { IoIosLogIn } from "react-icons/io";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { MdOutlineContacts } from "react-icons/md";
import Logo from '../media/hms-logo.png';

const Header = () => {
  console.log(NavLink);
  return (
    <header>
      <div className="logo-container">
        <a href="#i">
          <img src={Logo} alt="HMS-LOGO" />
        </a>
      </div>
      <div className="nav-items">
        <a href="#!" className="nav-link">
          <FaHome />
          Home
        </a>

        <a href="#!" className="nav-link">
          <IoMdContacts />
          about Us
        </a>
        <a href="#!" className="nav-link">
          <GiArchiveRegister /> registration
        </a>
        <a href="#!" className="nav-link">
          <IoIosLogIn /> login
        </a>
        <a href="#!" className="nav-link">
          <MdOutlineContacts />
          connect with us
        </a>
      </div>
    </header>
  );
};

export default Header;
