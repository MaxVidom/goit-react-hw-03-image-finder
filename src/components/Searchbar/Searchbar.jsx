import React, { Component } from 'react';
import style from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    inputName: '',
  };

  handleNameChange = evt => {
    const { value } = evt.currentTarget;
    this.setState({ inputName: value });
  };

  handleSubmitForm = evt => {
    const { inputName } = this.state;
    const { onSubmit } = this.props;
    evt.preventDefault();
    onSubmit(inputName);
    this.setState({ inputName: '' });
  };

  render() {
    const { inputName } = this.state;
    return (
      <header className={style.searchbar}>
        <form className={style.searchForm} onSubmit={this.handleSubmitForm}>
          <button type="submit" className={style.searchFormButton}>
            <span className={style.searchFormButtonLabel}>Search</span>
          </button>
          <input
            className={style.searchFormInput}
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            value={inputName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
