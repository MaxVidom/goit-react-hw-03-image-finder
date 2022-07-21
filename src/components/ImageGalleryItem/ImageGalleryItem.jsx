import React, { Component } from 'react';
import style from './ImageGalleryItem.module.css';
import Modal from 'components/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <>
        <li className={style.imageGalleryItem} onClick={this.toggleModal}>
          <img
            className={style.imageGalleryItemImage}
            src={this.props.webformatURL}
            alt=""
          />
        </li>
        {this.state.showModal && (
          <Modal
            largeImageURL={this.props.largeImageURL}
            onClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}
