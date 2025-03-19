import React from 'react';
import '../CSS/Contact.css';
import Swal from 'sweetalert2';
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
        <form className='FormContact' onSubmit={onSubmit}>
          <h2 className='FormH2Contact'>Formulaire de contact</h2>

          <div className="input-boxContact">
            <label className='LabelContact'>Nom complet</label>
            <input type="text" className='FieldContact' placeholder='Entrez votre nom' name='name' required />
          </div>

          <div className="input-boxContact">
            <label className='LabelContact'>E-mail</label>
            <input type="email" className='FieldContact' placeholder='Entrez votre e-mail' name='email' required />
          </div>

          <div className="input-boxContact">
            <label className='LabelContact'>Votre message</label>
            <textarea className='FieldContact MessageContact' placeholder='Entrez votre message' name='message' required />
          </div>

          <button type='submit' className='SubmitButtonContact'>Envoyer votre message</button>
        </form>
      </div>
    </div>
  );
}