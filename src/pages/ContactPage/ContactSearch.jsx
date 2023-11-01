import PropTypes from 'prop-types';

const SearchContactInput = ({ handleSearchContact }) => {
  const handleSearchTextChange = (event) => {
    handleSearchContact(event.target.value);
  };

  return (
    <input type="text" name="searchText" id="search-text" onChange={handleSearchTextChange} placeholder="Search by name or phone number" />
  );
};

SearchContactInput.propTypes = {
  handleSearchContact: PropTypes.func.isRequired
};

export default SearchContactInput;
