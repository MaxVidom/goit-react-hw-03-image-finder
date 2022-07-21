import React, { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import style from './App.module.css';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';

class App extends Component {
  state = {
    pictureName: '',
    page: 1,
    isPictures: false,
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
    const { pictureName, page, isPictures } = this.state;
    return (
      <div className={style.App}>
        <Searchbar onSubmit={this.handleSubmitForm} />

        <ImageGallery
          pictureName={pictureName}
          currentPage={page}
          onGet={this.handleGetPictures}
        />
        {isPictures && pictureName && <Button loadMore={this.loadMore} />}
      </div>
    );
  }
}

export { App };
