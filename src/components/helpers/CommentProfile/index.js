import React from "react";
import moment from "moment";
import axios from "axios";
import { useState, useEffect } from "react";
import "./CommentProfile.css";
import defaultAvatar from "../../../images/default_avatar.png";
import maleAvatar from "../../../images/male.svg";
import femaleAvatar from "../../../images/female.svg";

const CommentProfile = ({ comment, date, owner, post }) => {
    const [commentOwnern, setCommentOwner] = useState({
        fullname: "",
        username: "",
        avatar: null,
    });

    const [postOwner, setPostOwner] = useState({
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

    const getPostOwner = async () => {
        try {
            const postRes = await axios.get(`/api/posts/user/${post}`);

            const postOwner = await axios.get(
                `/api/users/${postRes.data.owner}`
            );

            setPostOwner({
                username: postOwner.data.username,
                fullname: postOwner.data.fullname,
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getOwner();
        getPostOwner();
    });

    return (
        <div className='comment-profile'>
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
                    <div className='infos'>
                        You commented on{" "}
                        <span
                            style={{
                                color: "#5ce1e6",
                                fontWeight: "500",
                            }}
                        >
                            {postOwner.fullname !== undefined
                                ? postOwner.fullname
                                : postOwner.username}
                        </span>
                        's post
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

export default CommentProfile;
