import axios from "axios";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { StyledContactForm } from "../Styles/ContactForm.Styled";
import env from "react-dotenv";
//import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const formRef = useRef();
  // This only works in an app that has a router:
  // const navigate = useNavigate();
  // this belongs to the axios post: 
  // const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isValid, setIsValid] = useState(true);

  // Updates the formData-state whenever anything is written in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
    // Validates the email against the regEx - if it's an email
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (name == "email") {
      if (!emailRegex.test(value)) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
  };

  // Uses emailJS to post the formdata from the useRef to Strapi
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) {
      return;
    }
    emailjs
      .sendForm(
        env.SERVICE_ID,
        env.TEMPLATE_ID,
        formRef.current,
        env.PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
 
   // Uses Axios to post the formdata from the state to Strapi, doesn't work with emailJS
    /*  axios
    // posts to imaginative MailChimp account
      .post("http://mailchimp.us8.list-manage.com/subscribe/post", {
        data: formData,
      })
      .then((response) => {
        this.setState({});
        console.log(response.data);
      })

      .catch((error) => error);
 
    if (!data) return;*/
    alert("All good!");
    //navigate("/takbesked");
  };
  return (
    <StyledContactForm ref={formRef} onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="text"
        name="name"
        value={formData.name}
        placeholder="Dit navn"
        maxLength="80"
        required
      />
      {!isValid && <p>Indtast venligst en gyldig email-adresse</p>}
      <input
        onChange={handleChange}
        type="email"
        name="email"
        value={formData.email}
        placeholder="Din email"
        required
      />

      <textarea
        name="message"
        onChange={handleChange}
        value={formData.message}
        placeholder="Din besked"
        required
        rows="15"
        maxLength="500"
      />

      <input className="submit" type="submit" value="Send" />
    </StyledContactForm>
  );
};
export default ContactForm;
