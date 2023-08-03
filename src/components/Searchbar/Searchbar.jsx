import { Component } from "react";
import css from './Searchbar.module.css';
import { ImSearch } from "react-icons/im";
import PropTypes from 'prop-types';

export class Searchbar extends Component{
    state = {
        value: '',
    }

    getInputValue = ({target: {value}}) => {
        this.setState({ value });
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.value);
        this.setState({ value: '' });
    }

    render() {
        return (
            <header className={css.searchbar}>
                <form
                    className={css.searchForm}
                    onSubmit={this.onSubmitForm}
                >
                    <button
                        type="submit"
                        className={css.searchForm_button}
                    >
                        <span className={css.searchForm_button_label}>
                            <ImSearch className={css.search_icon} />
                        </span>
                    </button>

                    <input
                        className={css.searchForm_input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.getInputValue}
                        value={this.state.value}
                    />
                </form>
            </header>
        );
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}