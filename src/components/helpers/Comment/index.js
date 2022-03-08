import React from "react";
import moment from "moment";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Comment.css";
import defaultAvatar from "../../../images/default_avatar.png";
import maleAvatar from "../../../images/male.svg";
import femaleAvatar from "../../../images/female.svg";

const Comment = ({ comment, date, owner }) => {
    const [commentOwnern, setCommentOwner] = useState({
        fullname: "",
        username: "",
    });

    const getOwner = async () => {
        try {
            const user = await axios.get(`/api/users/${owner}`);

            if (
                user.data.fullname !== commentOwnern.fullname ||
                user.data.username !== commentOwnern.username
            ) {
                setCommentOwner({
                    fullname: user.data.fullname,
                    username: user.data.username,
                    avatar: user.data.avatar,
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => getOwner());

    return (
        <div className='comment'>
            <img
                src={
                    commentOwnern.avatar === null
                        ? defaultAvatar
                        : commentOwnern.avatar === 1
                        ? maleAvatar
                        : femaleAvatar
                }
                alt='Owner'
            />
            <div className='comment-content'>
                <div className='comment-details'>
                    <div className='owner'>
                        {commentOwnern.fullname !== undefined
                            ? commentOwnern.fullname
                            : commentOwnern.username}
                    </div>
                    <div className='point'></div>
                    <div className='date'>
                        {moment(date).format("MMMM DD, YYYY")}
                    </div>
                </div>
                <p>{comment}</p>
            </div>
        </div>
    );
};

export default Comment;
