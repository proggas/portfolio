import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

/** Returns HTML for the header component used at the top of each page */
function Header(props) {
    const { title } = props;
    return <div className={"header"}>{title}</div>;
}

/** Info about required prop types for each section */
Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
