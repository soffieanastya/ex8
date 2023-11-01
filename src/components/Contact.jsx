import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Contact = ({ contact, isClickable }) => (isClickable ? (
  <Link to={`${contact.id}`} className="no-underline">
    <li>
      <p>{contact.name}</p>
      <p>{contact.phoneNumber}</p>
    </li>
  </Link>
) : (
  <li>
    <p>{contact.name}</p>
    <p>{contact.phoneNumber}</p>
  </li>
));

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired
  }).isRequired,
  isClickable: PropTypes.bool.isRequired
};

export default Contact;
