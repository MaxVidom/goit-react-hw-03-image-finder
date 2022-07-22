import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import style from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    const { code } = evt;
    const { onClose } = this.props;
    if (code === 'Escape') {
      console.log('Done');
      onClose();
    }
  };

  handleClickBackdrop = evt => {
    const { currentTarget, target } = evt;
    const { onClose } = this.props;
    if (currentTarget === target) {
      onClose();
    }
  };

  render() {
    const { largeImageURL } = this.props;
    return createPortal(
      <div className={style.overlay} onClick={this.handleClickBackdrop}>
        <div className={style.modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
