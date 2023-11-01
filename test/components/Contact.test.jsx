import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contact from '../../src/components/Contact';

jest.mock('axios', () => ({
  get: jest.fn()
}));
describe('Contact', () => {
  const contact = {
    id: '1',
    name: 'Gio',
    phoneNumber: '089999999999'
  };
  it('should render contact with link', async () => {
    const { findByText, findByRole } = render(
      <MemoryRouter>
        <Contact contact={contact} isClickable />
      </MemoryRouter>
    );

    expect(await findByRole('link')).toBeInTheDocument();
    expect(await findByText(contact.name)).toBeDefined();
    expect(await findByText(contact.phoneNumber)).toBeInTheDocument();
  });

  it('should render contact without link', async () => {
    const { findByText, queryByRole } = render(
      <MemoryRouter>
        <Contact contact={contact} isClickable={false} />
      </MemoryRouter>
    );

    expect(queryByRole('link')).toBeNull();
    expect(await findByText(contact.name)).toBeDefined();
    expect(await findByText(contact.phoneNumber)).toBeInTheDocument();
  });
});
