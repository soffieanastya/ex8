import { useParams } from 'react-router-dom';
import CONTACTS_API_URL from '../../config';
import useAxiosGet from '../../hooks/useAxiosGet';

const ContactDetail = () => {
  const { id } = useParams();
  const { data } = useAxiosGet(`${CONTACTS_API_URL}/${id}`);

  return (
    <div data-testid="contact-detail" className="contact-detail">
      <h1>
        Halo,
        {' '}
        {data.name}
      </h1>
      <div>
        Phone Number:
        {' '}
        {data.phoneNumber}
      </div>
      <div style={{ marginTop: '10px' }}>
        Address:
        {' '}
        {data.address}
      </div>
      <div style={{ marginTop: '10px' }}>
        Birthday:
        {' '}
        {data.birthday}
      </div>
    </div>
  );
};

export default ContactDetail;
