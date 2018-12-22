import React from 'react';

const AboutPageForm = () => {
  return (
    <div>
      <form
        className="ui form "
        action="https://formspree.io/koraydemirci@gmail.com"
        method="POST"
      >
        <div required className="field">
          <input
            type="text"
            name="İsim Soyisim"
            placeholder="Adınız Soyadınız"
          />
        </div>
        <div className="field">
          <input
            required
            type="text"
            name="Email Adresi"
            placeholder="Email Adresi"
          />
        </div>
        <div className="field">
          <textarea required name="Mesaj" placeholder="Mesajınız" />
        </div>
        <button className="ui button positive" type="submit">
          Gönder
        </button>
      </form>
    </div>
  );
};

export default AboutPageForm;
