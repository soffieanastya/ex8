import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../../../src/pages/ContactPage/ContactForm';

describe('ContactForm', () => {
  const handleAddContact = jest.fn().mockResolvedValue({});
  const isSavingContact = false;
  beforeEach(() => {
    render(<ContactForm handleAddContact={handleAddContact} isSavingContact={isSavingContact} />);
  });

  it('should trigger handler submit once with inputted new contact object as the parameter then clear all inputs', async () => {
    const user = userEvent.setup();
    const nameInput = screen.getByLabelText('Name:');
    const phoneNumberInput = screen.getByLabelText('Phone Number:');
    const addContactButton = screen.getByRole('button', { name: 'Add Contact' });
    const inputtedContact = {
      name: 'React',
      phoneNumber: '08123456789'
    };

    await user.type(nameInput, inputtedContact.name);
    await user.type(phoneNumberInput, inputtedContact.phoneNumber);
    await user.click(addContactButton);

    expect(handleAddContact).toHaveBeenNthCalledWith(1, inputtedContact);
    expect(nameInput).not.toHaveValue();
    expect(phoneNumberInput).not.toHaveValue();
    expect(nameInput).not.toHaveValue();
    expect(phoneNumberInput).not.toHaveValue();
  });
});
