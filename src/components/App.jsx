import React, { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import style from './App.module.css';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';

class App extends Component {
  state = {
    pictureName: '',
    page: 1,
    isPictures: false,
    showModal: false,
    largeImageURL: '',
    gallery: [],
    loader: false,
    error: null,
  };

  perPage = 12;

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.pictureName;
    const prevPage = prevState.page;
    const { pictureName, page } = this.state;

    if (prevName !== pictureName) {
      this.setState({ gallery: [] });
    }
    if (prevName !== pictureName || prevPage !== page) {
      this.setState({ loader: true });
      await fetch(
        `https://pixabay.com/api/?q=${pictureName}&page=${page}&key=27859965-17b92fa88b33871dcb6f37147&image_type=photo&orientation=horizontal&per_page=${this.perPage}`
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
          this.handleGetPictures(
            galleryPictures.total !==
              (page - 1) * this.perPage + galleryPictures.hits.length &&
              galleryPictures.total > 0
          );
        })
        .catch(error => this.setState({ error }))
        .finally(() => {
          this.setState({ loader: false });
        });
    }
  }

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL,
    }));
  };

  handleSubmitForm = pictureName => {
    this.setState({ pictureName, page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleGetPictures = isPictures => {
    this.setState({ isPictures });
  };

  render() {
    const { pictureName, isPictures, largeImageURL, gallery, error, loader } =
      this.state;
    return (
      <div className={style.App}>
        <Searchbar onSubmit={this.handleSubmitForm} />
        {error && <h1>{error.message}</h1>}
        {loader && <Loader />}
        <ImageGallery gallery={gallery} toggleModal={this.toggleModal} />
        {this.state.showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
        {isPictures && pictureName && <Button loadMore={this.loadMore} />}
        {!isPictures && pictureName && <p>No more images</p>}
      </div>
    );
  }
}

export { App };
