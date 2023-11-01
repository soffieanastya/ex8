import PropTypes from 'prop-types';
import Contact from './Contact';

const ContactList = ({ contacts, isClickable }) => (
  <div className="list-contact">
    <ul>
      {contacts.map((contact) => (
        <Contact contact={contact} key={contact.phoneNumber} isClickable={isClickable} />
      ))}
    </ul>
  </div>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(Contact.propTypes.contact).isRequired,
  isClickable: PropTypes.bool
};

ContactList.defaultProps = {
  isClickable: false
};

export default ContactList;
