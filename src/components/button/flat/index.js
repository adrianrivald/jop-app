import React from 'react';
import PropTypes from 'prop-types';

const FlatButton = ({ role, text, className, onClick }) => {
    let roleStyle = 'bg-flora text-white'

    if (role === 'white' ) roleStyle = 'bg-white text-flora border border-flora'

    return(
        <button className={`${roleStyle} font-bold rounded-lg p-3 ${className}`} onClick={onClick}>{text}</button>
    )
}

FlatButton.defaultProps = {
    role: 'green',
    onClick: () => {},
}

FlatButton.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    role: PropTypes.oneOf(['green', 'white']).isRequired
}

export default FlatButton