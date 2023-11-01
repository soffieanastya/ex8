import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import ContactSearch from '../../../src/pages/ContactPage/ContactSearch';

describe('SearchContactInput', () => {
  const handleSearchContact = jest.fn();
  beforeEach(() => {
    render(<ContactSearch handleSearchContact={handleSearchContact} />);
  });
  it('should trigger handleSearchContact once with search text s as the parameter', async () => {
    const searchInput = screen.getByPlaceholderText('Search by name or phone number');
    const user = userEvent.setup();
    const searchText = 's';

    await user.type(searchInput, searchText);

    expect(handleSearchContact).toHaveBeenNthCalledWith(1, searchText);
  });
});
