import PropTypes from 'prop-types';

const Loader = ({ 'data-testid': dataTestId }) => (
  <div className="loader-container" data-testid={dataTestId}>
    <div className="loader" />
  </div>
);

Loader.propTypes = {
  'data-testid': PropTypes.string.isRequired
};

export default Loader;
