import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ styleName, onClick, style, onMouseOut, onMouseOver, children }) => {
  return (
    <button
      type="button"
      className={styleName}
      onClick={onClick}
      style={style}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onBlur
      onFocus
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  styleName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.string.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
