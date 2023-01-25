import axios from "axios";
import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { StyledContactForm } from "../Styles/ContactForm.Styled";
//import { useNavigate } from "react-router-dom";
// From from React Hook Form builder

const ContactForm = () => {
    const formRef = useRef();
 // const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  // Updates the state whenever anything is written in the input field
  const [isValid, setIsValid] = useState(true);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (name == "email") {if (!emailRegex.test(value)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }}
  };
  
  // Uses Axios to post the formdata from the state to Strapi
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) {
      return;
    }
    emailjs.sendForm('service_4ogob35', 'template_zyzikjy', formRef.current, 'RWZyvI8NiyPCpc1tM')
    .then((result) => {
        console.log(result.text)
    }, (error) => {
        console.log(error.text)
    })
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
 */
    if (!data) return;
    alert("All good!")
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
