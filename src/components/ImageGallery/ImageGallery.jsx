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

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pictureName;
    const currentName = this.props.pictureName;
    const prevPage = prevProps.currentPage;
    const page = this.props.currentPage;

    if (prevName !== currentName) {
      this.setState({ gallery: [] });
    }
    if (prevName !== currentName || prevPage !== page) {
      this.setState({ loader: true });
      await fetch(
        `https://pixabay.com/api/?q=${currentName}&page=${page}&key=27859965-17b92fa88b33871dcb6f37147&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error('Sorry'));
        })
        .then(galleryPictures => {
          console.log(page);
          this.props.onGet(galleryPictures.total > 0);
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...galleryPictures.hits],
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => {
          this.setState({ loader: false });
        });
    }
  }

  render() {
    const { gallery, loader, error } = this.state;
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
              />
            );
          })}
        </ul>
      </>
    );
  }
}
