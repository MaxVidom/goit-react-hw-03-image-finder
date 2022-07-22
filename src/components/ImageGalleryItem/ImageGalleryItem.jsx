import style from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  toggleModal,
}) {
  return (
    <>
      <li
        className={style.imageGalleryItem}
        onClick={() => toggleModal(largeImageURL)}
      >
        <img
          className={style.imageGalleryItemImage}
          src={webformatURL}
          alt=""
        />
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
