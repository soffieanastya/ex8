import axios from 'axios';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import {
  within, render, waitFor
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import CONTACTS_API_URL from '../../../src/config';
import appRoutes from '../../../src/appRoutes';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn()
}));

describe('ContactPage', () => {
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
    }
  ];

  const responsePayload = {
    data: {
      contacts
    }
  };

  it('should display list of contacts from server and not display error message when successfully fetched data from the server', async () => {
    axios.get.mockResolvedValue(responsePayload);
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/contacts'],
      initialIndex: 0
    });
    const { findByText, queryByText, getByText } = render(<RouterProvider router={router} />);
    const error = new Error('Network Error');

    contacts.forEach(async (contact) => {
      expect(await findByText(contact.name)).toBeDefined();
      expect(getByText(contact.phoneNumber)).toBeDefined();
    });
    expect(queryByText(error.message)).toBeNull();
  });

  it('should not display list of contacts from server and display error message when failed fetched data from the server', async () => {
    const error = new Error('Network Error');
    axios.get.mockRejectedValue(error);
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/contacts'],
      initialIndex: 0
    });
    const { queryByText, findByText } = render(<RouterProvider router={router} />);

    contacts.forEach((contact) => {
      expect(queryByText(contact.name)).toBeNull();
      expect(queryByText(contact.phoneNumber)).toBeNull();
    });
    expect(await findByText(error.message)).toBeDefined();
  });

  it('should display input name, input phone number and add contact button', () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/contacts'],
      initialIndex: 0
    });
    const { getByLabelText, getByRole } = render(<RouterProvider router={router} />);

    expect(getByLabelText('Name:')).not.toHaveValue();
    expect(getByLabelText('Phone Number:')).not.toHaveValue();
    expect(getByRole('button', { name: 'Add Contact' })).toBeDefined();
  });

  it('should display new contact to the list of contacts after adding new contact', async () => {
    axios.get.mockResolvedValue(responsePayload);
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/contacts'],
      initialIndex: 0
    });
    const { getByLabelText, getByRole } = render(<RouterProvider router={router} />);
    const user = userEvent.setup();
    const nameInput = getByLabelText('Name:');
    const phoneNumberInput = getByLabelText('Phone Number:');
    const addContactButton = getByRole('button', { name: 'Add Contact' });
    const inputtedContact = {
      name: 'React',
      phoneNumber: '08123456789'
    };

    await user.type(nameInput, inputtedContact.name);
    await user.type(phoneNumberInput, inputtedContact.phoneNumber);
    axios.post.mockResolvedValue({ data: { ...inputtedContact, id: '12' } });
    const updatedContacts = {
      data: { contacts: [...contacts, { ...inputtedContact, id: '12' }] }
    };
    axios.get.mockResolvedValue(updatedContacts);
    await user.click(addContactButton);

    const list = getByRole('list');
    expect(await within(list).findByText(inputtedContact.name)).toBeDefined();
    expect(await within(list).findByText(inputtedContact.phoneNumber)).toBeDefined();
  });

  it('should display error message and not display new contact to the list of contacts after failed to add new contact to the server', async () => {
    axios.get.mockResolvedValue(responsePayload);
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/contacts'],
      initialIndex: 0
    });
    const {
      getByLabelText, getByRole, queryByText, findByText
    } = render(
      <RouterProvider router={router} />
    );
    const user = userEvent.setup();
    const nameInput = getByLabelText('Name:');
    const phoneNumberInput = getByLabelText('Phone Number:');
    const addContactButton = getByRole('button', { name: 'Add Contact' });
    const inputtedContact = {
      name: 'React',
      phoneNumber: '08123456789'
    };
    const errorPostData = new Error('Network Error');

    await user.type(nameInput, inputtedContact.name);
    await user.type(phoneNumberInput, inputtedContact.phoneNumber);
    axios.post.mockRejectedValue(errorPostData);
    await user.click(addContactButton);

    const list = getByRole('list');
    expect(queryByText(list, inputtedContact.name)).toBeNull();
    expect(queryByText(list, inputtedContact.phoneNumber)).toBeNull();
    expect(await findByText(errorPostData.message)).toBeDefined();
  });

  it('should display contact list containing search name', async () => {
    axios.get.mockResolvedValue(responsePayload);
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/contacts'],
      initialIndex: 0
    });
    const { getByPlaceholderText, getByRole, queryByText } = render(
      <RouterProvider router={router} />
    );
    const searchInput = getByPlaceholderText('Search by name or phone number');
    const user = userEvent.setup();
    const searchText = 's';
    axios.get.mockResolvedValue(responsePayload);

    await user.type(searchInput, searchText);

    const list = getByRole('list');
    expect(searchInput).toBeDefined();
    expect(searchInput).toHaveValue(searchText);
    expect(await within(list).findByText(contacts[1].name)).toBeDefined();
    expect(await within(list).findByText(contacts[1].phoneNumber)).toBeDefined();
    expect(queryByText(list, contacts[0].name)).toBeNull();
    expect(queryByText(list, contacts[0].phoneNumber)).toBeNull();
  });

  it('should display contact list containing search phone number', async () => {
    axios.get.mockResolvedValue(responsePayload);
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/contacts'],
      initialIndex: 0
    });
    const { getByPlaceholderText, getByRole, queryByText } = render(
      <RouterProvider router={router} />
    );
    const searchInput = getByPlaceholderText('Search by name or phone number');
    const user = userEvent.setup();
    const searchText = '089999999988';

    await user.type(searchInput, searchText);

    const list = getByRole('list');
    expect(searchInput).toBeDefined();
    expect(searchInput).toHaveValue(searchText);
    expect(await within(list).findByText(contacts[1].name)).toBeDefined();
    expect(await within(list).findByText(contacts[1].phoneNumber)).toBeDefined();
    expect(queryByText(list, contacts[0].name)).toBeNull();
    expect(queryByText(list, contacts[0].phoneNumber)).toBeNull();
  });

  it('should display loader when fetching data from the server then remove loader after the data is fetched', async () => {
    axios.get.mockResolvedValue(responsePayload);
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/contacts'],
      initialIndex: 0
    });
    const { getByTestId, findByText } = render(<RouterProvider router={router} />);
    const loader = getByTestId('contact-list-loader');

    expect(loader).toBeInTheDocument();
    contacts.forEach(async (contact) => {
      expect(await findByText(contact.name)).toBeDefined();
      expect(await findByText(contact.phoneNumber)).toBeDefined();
    });
    await waitFor(() => expect(loader).not.toBeInTheDocument());
  });

  it('should display loader when saving new contact to the server then remove loader after successfully saved data', async () => {
    axios.get.mockResolvedValue(responsePayload);
    const inputtedContact = {
      name: 'React',
      phoneNumber: '08123456789'
    };
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/contacts'],
      initialIndex: 0
    });
    const {
      getByLabelText, getByRole, getByTestId, queryByTestId
    } = render(
      <RouterProvider router={router} />
    );
    const user = userEvent.setup();
    const nameInput = getByLabelText('Name:');
    const phoneNumberInput = getByLabelText('Phone Number:');
    const addContactButton = getByRole('button', { name: 'Add Contact' });

    await user.type(nameInput, inputtedContact.name);
    await user.type(phoneNumberInput, inputtedContact.phoneNumber);
    axios.post.mockResolvedValue({ data: { ...inputtedContact, id: '12' } });
    const updatedContacts = {
      data: { contacts: [...contacts, { ...inputtedContact, id: '12' }] }
    };
    axios.get.mockResolvedValue(updatedContacts);
    user.click(addContactButton);
    await waitFor(() => {
      expect(getByTestId('add-contact-loader')).toBeInTheDocument();
      expect(addContactButton).not.toBeInTheDocument();
    });

    const addContactButtonAfter = getByRole('button', { name: 'Add Contact' });
    expect(addContactButtonAfter).toBeInTheDocument();
    const list = getByRole('list');
    expect(await within(list).findByText(inputtedContact.name)).toBeDefined();
    expect(await within(list).findByText(inputtedContact.phoneNumber)).toBeDefined();
    expect(queryByTestId('add-contact-loader')).toBeNull();
  });

  it('should clear error message after success add contact after failed once', async () => {
    axios.get.mockResolvedValue(responsePayload);
    const inputtedContact = {
      name: 'React',
      phoneNumber: '08123456789'
    };
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/contacts'],
      initialIndex: 0
    });
    const {
      getByLabelText, getByRole, queryByText, findByText
    } = render(
      <RouterProvider router={router} />
    );
    const user = userEvent.setup();
    const nameInput = getByLabelText('Name:');
    const phoneNumberInput = getByLabelText('Phone Number:');
    const addContactButton = getByRole('button', { name: 'Add Contact' });
    const error = new Error('Network Error');

    await user.type(nameInput, inputtedContact.name);
    await user.type(phoneNumberInput, inputtedContact.phoneNumber);
    axios.post.mockRejectedValue(error);
    await user.click(addContactButton);
    expect(queryByText(inputtedContact.name)).not.toBeInTheDocument();
    expect(queryByText(inputtedContact.phoneNumber)).not.toBeInTheDocument();
    expect(await findByText(error.message)).toBeInTheDocument();

    axios.get.mockResolvedValue(responsePayload);
    const addContactButtonAfter = getByRole('button', { name: 'Add Contact' });
    await user.type(nameInput, inputtedContact.name);
    await user.type(phoneNumberInput, inputtedContact.phoneNumber);
    axios.post.mockResolvedValue({ data: { ...inputtedContact, id: '12' } });
    axios.get.mockResolvedValue({
      data: { contacts: [...responsePayload.data.contacts, { ...inputtedContact, id: '12' }] }
    });
    await user.click(addContactButtonAfter);

    expect(axios.post).toBeCalledTimes(2);
    expect(await findByText(inputtedContact.name)).toBeInTheDocument();
    expect(await findByText(inputtedContact.phoneNumber)).toBeInTheDocument();
    expect(queryByText(error.message)).toBeNull();
  });

  it('should display Hello Anastya text from Home Page after click GO TO HOME button in the Contact Page Screen', async () => {
    globalThis.Request = jest.fn();
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/contacts'],
      initialIndex: 0
    });
    const { getByRole, getByText, queryByRole } = render(<RouterProvider router={router} />);
    const navigateToHomeButton = getByRole('button', { name: 'GO TO HOME' });
    const user = userEvent.setup();

    await user.click(navigateToHomeButton);

    expect(queryByRole('button', { name: 'GO TO HOME' })).toBeNull();
    expect(getByText('Hello Anastya')).toBeInTheDocument();
  });

  it('should display selected user detail on /contacts/id route and contacts', async () => {
    globalThis.Request = jest.fn();
    const contact = {
      id: '1',
      name: 'Gio',
      phoneNumber: '089999999999',
      address: 'Jl. jalan bumi',
      birthday: '12 October 2000'
    };
    const responsePayloadDetail = {
      data: contact
    };

    const responsePayloadList = {
      data: { contacts }
    };
    when(axios.get)
      .calledWith(CONTACTS_API_URL)
      .mockResolvedValue(responsePayloadList)
      .calledWith(`${CONTACTS_API_URL}/${contact.id}`)
      .mockResolvedValue(responsePayloadDetail);
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/contacts'],
      initialIndex: 0
    });

    const { findByTestId, findByText: findByTextContacts } = render(
      <RouterProvider router={router} />
    );
    const user = userEvent.setup();
    const gioDetailLink = await findByTextContacts(contact.name);

    await user.click(gioDetailLink);

    expect(axios.get).toHaveBeenNthCalledWith(1, CONTACTS_API_URL);
    expect(axios.get).toHaveBeenNthCalledWith(2, `${CONTACTS_API_URL}/${contact.id}`);
    const contactDetail = await findByTestId('contact-detail');
    expect(await within(contactDetail).findByText(`Halo, ${contact.name}`)).toBeInTheDocument();
    expect(
      await within(contactDetail).findByText(`Phone Number: ${contact.phoneNumber}`)
    ).toBeInTheDocument();
    expect(
      await within(contactDetail).findByText(`Address: ${contact.address}`)
    ).toBeInTheDocument();
    expect(
      await within(contactDetail).findByText(`Birthday: ${contact.birthday}`)
    ).toBeInTheDocument();
  });
});
