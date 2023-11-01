import { useState } from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';

const ContactForm = ({ handleAddContact, isSavingContact }) => {
  const initialContact = { name: '', phoneNumber: '' };
  const [contact, setContact] = useState(initialContact);

  const handleInputChange = (event) => {
    const newContact = { ...contact };
    newContact[event.target.name] = event.target.value;
    setContact(newContact);
  };

  const resetInput = () => {
    setContact(initialContact);
  };

  const handleAddButtonClick = async () => {
    await handleAddContact(contact);
    resetInput();
  };

  return (
    <div id="contact-form">
      <label htmlFor="name">
        <p>Name:</p>
        <input type="text" name="name" id="name" value={contact.name} onChange={handleInputChange} />
      </label>
      <label htmlFor="phoneNumber">
        <p>Phone Number:</p>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={contact.phoneNumber}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <br />
      {isSavingContact ? <Loader data-testid="add-contact-loader" /> : (
        <button type="button" onClick={handleAddButtonClick}>
          Add Contact
        </button>
      )}
    </div>
  );
};

ContactForm.propTypes = {
  handleAddContact: PropTypes.func.isRequired,
  isSavingContact: PropTypes.bool.isRequired
};

export default ContactForm;
