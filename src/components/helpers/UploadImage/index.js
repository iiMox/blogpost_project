import React from "react";
import { useRef } from "react";
import deleteImg from "../../../images/delete.png";
import "./UploadImage.css";

const UploadImage = ({ image, remove }) => {
    const deleteRef = useRef(null);

    return (
        <div
            className='image-container'
            onMouseEnter={(e) => {
                deleteRef.current.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
                deleteRef.current.style.opacity = "0";
            }}
        >
            <img src={image.image} alt='Uploaded' />
            <div className='delete-hover' ref={deleteRef}>
                <img
                    src={deleteImg}
                    alt='Delete'
                    onClick={(e) => {
                        remove(image.id);
                    }}
                />
            </div>
        </div>
    );
};

export default UploadImage;
