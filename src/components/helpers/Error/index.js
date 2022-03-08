import React from "react";
import "./Error.css";
import errorImg from "../../../images/error.png";

const Error = ({ error }) => {
    return (
        <div className='error'>
            <img src={errorImg} alt='Error' />
            <span className='error-text'>{error}</span>
        </div>
    );
};

export default Error;
