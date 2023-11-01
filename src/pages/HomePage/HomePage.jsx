import { useNavigate } from 'react-router-dom';
import ContactList from '../../components/ContactList';
import CONTACTS_API_URL from '../../config';
import useAxiosGet from '../../hooks/useAxiosGet';
import Loader from '../ContactPage/Loader';

const HomePage = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useAxiosGet(
    `${CONTACTS_API_URL}?_sort=id&_limit=2&_order=desc`
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <br />
      <button type="button" onClick={() => navigate('/contacts')}>
        GO TO CONTACTS
      </button>
      <h1>Hello Anastya</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3>Recently Added Contacts</h3>
        {error && <h1 style={{ color: 'red' }}>{error.message}</h1>}
        {isLoading ? (
          <Loader data-testid="contact-list-loader" />
        ) : (
          <ContactList contacts={data.contacts} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
