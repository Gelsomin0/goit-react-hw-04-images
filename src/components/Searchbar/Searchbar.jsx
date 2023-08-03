import { useState } from "react";
import css from './Searchbar.module.css';
import { ImSearch } from "react-icons/im";
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
    const [value, setValue] = useState('');

    const getInputValue = ({target: {value}}) => {
        setValue(value);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        onSubmit(value);
        setValue('');
    }

    return (
        <header className={css.searchbar}>
            <form
                className={css.searchForm}
                onSubmit={onSubmitForm}
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
                    onChange={getInputValue}
                    value={value}
                />
            </form>
        </header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}