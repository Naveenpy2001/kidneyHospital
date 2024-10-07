import React from "react";

const ContactForm = () => {
  return (
    <div className="ct-contact-form">
      <h2 className="ct-heading">Get in Touch</h2>
      <form className="ct-form">
        <input type="text" placeholder="Your Name" className="ct-input" />
        <input type="email" placeholder="Your Email" className="ct-input" />
        <textarea
          placeholder="Your Message"
          className="ct-input ct-textarea"
        ></textarea>
        <button type="submit" className="ct-submit">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
