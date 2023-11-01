import { render, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import axios from 'axios';
import { MemoryRouter, createMemoryRouter, RouterProvider } from 'react-router-dom';
import appRoutes from '../../../src/appRoutes';
import HomePage from '../../../src/pages/HomePage/HomePage';

jest.mock('axios', () => ({
  get: jest.fn()
}));
describe('HomePage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

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

  it('should display Hello Anastya text, Recently Added Contacts and 2 recently added contacts', async () => {
    axios.get.mockResolvedValue({ data: { contacts: contacts.slice(-2) } });
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <HomePage />
      </MemoryRouter>
    );

    expect(getByText('Hello Anastya')).toBeInTheDocument();
    expect(getByText('Recently Added Contacts')).toBeInTheDocument();
    await waitFor(async () => {
      contacts.slice(-2).forEach((contact) => {
        expect(getByText(contact.name)).toBeInTheDocument();
        expect(getByText(contact.phoneNumber)).toBeInTheDocument();
      });
    });
  });

  it('should display Network Error & not display recently added contacts when failed to fetch contacts data', async () => {
    const error = new Error('Network Error');
    axios.get.mockRejectedValue(error);
    const { getByText, queryByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <HomePage />
      </MemoryRouter>
    );

    expect(getByText('Hello Anastya')).toBeInTheDocument();
    expect(getByText('Recently Added Contacts')).toBeInTheDocument();
    await waitFor(async () => {
      expect(getByText(error.message)).toBeInTheDocument();
      contacts.forEach(async (contact) => {
        expect(queryByText(contact.name)).toBeNull();
        expect(queryByText(contact.phoneNumber)).toBeNull();
      });
    });
  });

  it('should display List of Contacts text from Home Page after click GO TO CONTACTS button in the Contact Page Screen', async () => {
    globalThis.Request = jest.fn();
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/'],
      initialIndex: 0
    });
    const { getByRole, getByText, queryByRole } = render(<RouterProvider router={router} />);
    const navigateToContactPageButton = getByRole('button', { name: 'GO TO CONTACTS' });
    const user = userEvent.setup();

    await user.click(navigateToContactPageButton);

    expect(queryByRole('button', { name: 'GO TO CONTACTS' })).toBeNull();
    expect(getByText('List of Contacts')).toBeInTheDocument();
  });
});
