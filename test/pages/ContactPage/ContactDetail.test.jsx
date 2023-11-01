import { render } from '@testing-library/react';
import axios from 'axios';
import { when } from 'jest-when';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import appRoutes from '../../../src/appRoutes';
import CONTACTS_API_URL from '../../../src/config';

jest.mock('axios', () => ({
  get: jest.fn()
}));

describe('ContactDetail', () => {
  const contact = {
    id: '1',
    name: 'Gio',
    phoneNumber: '089999999999',
    address: 'Jl. jalan bumi',
    birthday: '12 October 2000'
  };

  const contacts = [
    {
      id: '1',
      name: 'Gio',
      phoneNumber: '089999999999'
    },
    {
      id: '2',
      name: 'Soffie',
      phoneNumber: '089999999988'
    }
  ];

  const responsePayloadDetail = {
    data: contact
  };

  const responsePayloadList = {
    data: { contacts }
  };
  it('should display Gio 089999999999 Jl. jalan bumi 12 October 2000 ', async () => {
    when(axios.get)
      .calledWith(CONTACTS_API_URL).mockResolvedValue(responsePayloadList)
      .calledWith(`${CONTACTS_API_URL}/${contact.id}`)
      .mockResolvedValue(responsePayloadDetail);

    const router = createMemoryRouter(appRoutes, {
      initialEntries: [`/contacts/${contact.id}`],
      initialIndex: 0
    });
    const { findByText } = render(<RouterProvider router={router} />);

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(await findByText(`Halo, ${contact.name}`)).toBeInTheDocument();
    expect(await findByText(`Phone Number: ${contact.phoneNumber}`)).toBeInTheDocument();
    expect(await findByText(`Address: ${contact.address}`)).toBeInTheDocument();
    expect(await findByText(`Birthday: ${contact.birthday}`)).toBeInTheDocument();
  });
});
