import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import React, { Component } from 'react';
import styles from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    gallery: [],
    loader: false,
    error: null,
  };

  perPage = 12;

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pictureName;
    const prevPage = prevProps.currentPage;
    const { pictureName, currentPage, onGet } = this.props;

    if (prevName !== pictureName) {
      this.setState({ gallery: [] });
    }
    if (prevName !== pictureName || prevPage !== currentPage) {
      this.setState({ loader: true });
      await fetch(
        `https://pixabay.com/api/?q=${pictureName}&page=${currentPage}&key=27859965-17b92fa88b33871dcb6f37147&image_type=photo&orientation=horizontal&per_page=${this.perPage}`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error('Sorry'));
        })
        .then(galleryPictures => {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...galleryPictures.hits],
          }));
          onGet(
            galleryPictures.total !==
              (currentPage - 1) * this.perPage + galleryPictures.hits.length &&
              galleryPictures.total > 0
          );
        })
        .catch(error => this.setState({ error }))
        .finally(() => {
          this.setState({ loader: false });
        });
    }
  }

  render() {
    const { gallery, loader, error } = this.state;
    const { toggleModal } = this.props;
    return (
      <>
        {error && <h1>{error.message}</h1>}
        {loader && <Loader />}
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
}
