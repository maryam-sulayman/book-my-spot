import React from 'react'
import '../styles/Button.css'

const Button = ({ title, handleClick, type = 'button', customClass }) => {
    return (
        <div >
        <button 
        type={type} 
        onClick={handleClick} 
        className= {`custom-button ${customClass}`}>
          {title}
        </button>
      </div>
    );
  };

export default Button