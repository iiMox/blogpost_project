import React from "react";
import "./UserCard.css";
import defaultAvatar from "../../../images/default_avatar.png";
import maleAvatar from "../../../images/male.svg";
import femaleAvatar from "../../../images/female.svg";

const UserCard = ({
    fullname,
    username,
    avatar,
    title,
    description,
    userId,
}) => {
    return (
        <div className='user-card'>
            <img
                src={
                    avatar === null
                        ? defaultAvatar
                        : avatar === 1
                        ? maleAvatar
                        : femaleAvatar
                }
                alt='Profile'
            />
            <div className='profile-info'>
                <div className='overview'>
                    <div className='profile-name'>
                        {fullname !== undefined ? fullname : username}
                    </div>
                    <div className='title'>
                        {title === undefined ? "" : title}
                    </div>
                </div>
                <p className='profile-desc'>
                    {description === undefined ? "" : description}
                </p>
            </div>
        </div>
    );
};

export default UserCard;
