/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const FlatButton = ({ role, text, className, onClick, disabled, type }) => {
    let roleStyle = 'bg-flora text-white'

    if (role === 'white' ) roleStyle = 'bg-white text-flora border border-flora'

    return(
        <button type={type} disabled={disabled} className={`${roleStyle} font-bold rounded-lg p-3 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`} onClick={onClick}>{text}</button>
    )
}

FlatButton.defaultProps = {
    role: 'green',
    onClick: () => {},
    disabled: false
}

FlatButton.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    role: PropTypes.oneOf(['green', 'white']).isRequired
}

export default FlatButton