import { useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useCallback, useMemo, useState } from 'react';
import ContactList from '../../components/ContactList';
import useAxiosGet from '../../hooks/useAxiosGet';
import ContactForm from './ContactForm';
import ContactSearch from './ContactSearch';
import Loader from './Loader';
import CONTACTS_API_URL from '../../config';

const ContactPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [errorSave, setErrorSave] = useState('');
  const [isSavingContact, setIsSavingContact] = useState(false);

  const {
    data,
    isLoading: isFetching,
    error: errorFetch,
    fetchData
  } = useAxiosGet(CONTACTS_API_URL);

  const handleAddContact = async (inputtedContact) => {
    try {
      setIsSavingContact(true);
      await axios.post(CONTACTS_API_URL, inputtedContact);
      await fetchData();
      setErrorSave('');
    } catch (error) {
      setErrorSave(error.message);
    } finally {
      setIsSavingContact(false);
    }
  };

  const handleSearchContact = (inputtedKeyword) => {
    setKeyword(inputtedKeyword);
  };

  const filterContact = useCallback((contact) => {
    const isNameFound = contact.name.toLowerCase().includes(keyword.toLowerCase());
    const isPhoneNumberFound = contact.phoneNumber.includes(keyword);
    return isNameFound || isPhoneNumberFound;
  }, [keyword]);

  const filteredContact = useMemo(() => data.contacts.filter(filterContact), [data, filterContact]);

  return (
    <div id="contact-list-container">
      <br />
      <button type="button" onClick={() => navigate('/')}>
        GO TO HOME
      </button>
      <h1>List of Contacts</h1>
      {errorSave ? (
        <h1 style={{ color: 'red' }}>{errorSave}</h1>
      ) : (
        errorFetch && <h1 style={{ color: 'red' }}>{errorFetch.message}</h1>
      )}
      <ContactForm handleAddContact={handleAddContact} isSavingContact={isSavingContact} />
      <ContactSearch handleSearchContact={handleSearchContact} />
      {isFetching ? (
        <Loader data-testid="contact-list-loader" />
      ) : (
        <ContactList contacts={filteredContact} isClickable />
      )}
      <Outlet />
    </div>
  );
};

export default ContactPage;
