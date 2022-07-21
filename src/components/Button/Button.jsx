import style from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ loadMore }) {
  return (
    <button className={style.button} type="button" onClick={loadMore}>
      Load more
    </button>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
