import { render } from '@testing-library/react';
import axios from 'axios';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import appRoutes from '../../src/appRoutes';

jest.mock('axios', () => ({
  get: jest.fn()
}));

describe('ContactList', () => {
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
    },
    {
      name: 'rehan',
      phoneNumber: '123',
      id: 'brHiUUf'
    }
  ];

  const responsePayload = {
    data: {
      contacts
    }
  };

  it('should render all contacts', () => {
    axios.get.mockResolvedValue(responsePayload);
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/contacts'],
      initialIndex: 0
    });
    const { findByText } = render(<RouterProvider router={router} />);

    contacts.forEach(async (contact) => {
      expect(await findByText(contact.name)).toBeDefined();
      expect(await findByText(contact.phoneNumber)).toBeDefined();
    });
  });
});
