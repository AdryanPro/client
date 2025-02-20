import React from 'react'
import '../CSS/Contact.css'
import Swal from 'sweetalert2'
import Footer from './LayoutComponents/Footer';
import NavBar from './LayoutComponents/NavBar';

export const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "2eae51cb-c05c-480e-8747-e55487cd113a");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      });
    }
  };

  return (
    <div>
      <NavBar />
          <div className='ContactWrapper'>
      <form className='Form' onSubmit={onSubmit}>
        <h2 className='FormH2'>Contact form</h2>
        <div className="input-box">
          <label>Full name</label>
          <input type="text" className='Field' placeholder='Enter your name' name='name' required />
        </div>

        <div className="input-box">
          <label>Email Adress</label>
          <input type="email" className='Field' placeholder='Enter your Email' name='email' required />
        </div>

        <div className="input-box">
          <label>Your Message</label>
          <textarea className='Field Message' placeholder='Enter your message' name='message' required />
        </div>
        <button type='submit'>Send your messsage</button>
      </form>
    </div>
    <Footer />
    </div> 
  )
}