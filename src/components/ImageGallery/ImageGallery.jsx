import ImageGalleryItem from 'components/ImageGalleryItem';
import styles from './ImageGallery.module.css';

export default function ImageGallery({ toggleModal, gallery }) {
  return (
    <>
      <ul className={styles.imageGallery}>
        {gallery.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              toggleModal={toggleModal}
            />
          );
        })}
      </ul>
    </>
  );
}
