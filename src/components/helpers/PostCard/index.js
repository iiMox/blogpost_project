import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import "./PostCard.css";
import Comment from "../Comment";
import likeImg from "../../../images/like.png";
import likeFilledImg from "../../../images/like_filled.png";
import commentImg from "../../../images/comment.png";
import defaultAvatar from "../../../images/default_avatar.png";
import maleAvatar from "../../../images/male.svg";
import femaleAvatar from "../../../images/female.svg";
import prevIcon from "../../../images/prev.png";
import nextIcon from "../../../images/next.png";

const PostCard = ({ postId, title, content, images, owner, likes, date }) => {
    const [liked, setLiked] = useState(
        localStorage.getItem("User")
            ? likes.filter(
                  (like) =>
                      like.user === JSON.parse(localStorage.getItem("User"))._id
              ).length > 0
                ? true
                : false
            : false
    );
    const [show, setShow] = useState(false);

    const [postOwner, setPostOwner] = useState({ fullname: "", username: "" });

    const [activeIndex, setActiveIndex] = useState(0);

    const [comments, setComments] = useState([]);

    const [newComment, setNewComment] = useState({
        comment: "",
        post: postId,
    });

    const [loaded, setLoaded] = useState(false);

    const commentRef = useRef(null);

    const getOwner = async () => {
        try {
            const user = await axios.get(`/api/users/${owner}`);

            if (
                user.data.fullname !== postOwner.fullname ||
                user.data.username !== postOwner.username
            ) {
                setPostOwner({
                    fullname: user.data.fullname,
                    username: user.data.username,
                    avatar: user.data.avatar,
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getComments = async () => {
        try {
            const commentsArray = await axios.get(
                `/api/comments/post/${postId}`
            );

            setComments([...commentsArray.data]);
            setLoaded(true);
        } catch (e) {
            console.log(e);
        }
    };

    const addComment = async () => {
        try {
            const res = await axios.post(`/api/comments`, newComment, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });
            commentRef.current.value = "";
            setLoaded(false);
        } catch (e) {
            console.log(e);
        }
    };

    const likePost = async () => {
        try {
            if (!liked) {
                const res = axios.patch(
                    `/api/posts/liked/${postId}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "Token"
                            )}`,
                        },
                    }
                );
                setLiked(true);
            } else {
                const res = axios.patch(
                    `/api/posts/disliked/${postId}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "Token"
                            )}`,
                        },
                    }
                );
                setLiked(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (!loaded) {
            getOwner();
            getComments();
        }
    });

    return (
        <div className='post-card'>
            <div className='owner'>
                <img
                    src={
                        postOwner.avatar === null
                            ? defaultAvatar
                            : postOwner.avatar === 1
                            ? maleAvatar
                            : femaleAvatar
                    }
                    alt='Owner'
                />
                <div className='owner-info'>
                    <div className='owner-name'>
                        {postOwner.fullname !== undefined
                            ? postOwner.fullname
                            : postOwner.username}
                        <div className='date'>
                            {moment(date).format("MMMM DD, YYYY")}
                        </div>
                    </div>
                </div>
            </div>
            <div className='hr'></div>
            <h2>{title}</h2>
            <div className='post-content'>{content}</div>
            <div className='images'>
                <div className='images-holder'>
                    {images.map((image) => {
                        return (
                            <img
                                style={{
                                    display:
                                        activeIndex === images.indexOf(image)
                                            ? "block"
                                            : "none",
                                }}
                                key={image._id}
                                src={image.image}
                                alt='Post'
                            />
                        );
                    })}
                </div>
                <div className='control'>
                    <div
                        className='prev'
                        onClick={() => {
                            setActiveIndex(
                                activeIndex === 0
                                    ? images.length - 1
                                    : activeIndex - 1
                            );
                        }}
                    >
                        <img src={prevIcon} alt='Previous' />
                    </div>
                    <div
                        className='next'
                        onClick={() => {
                            setActiveIndex(
                                activeIndex === images.length - 1
                                    ? 0
                                    : activeIndex + 1
                            );
                        }}
                    >
                        <img src={nextIcon} alt='Next' />
                    </div>
                </div>
            </div>
            <div className='action-bar'>
                {localStorage.getItem("User") ? (
                    <div
                        className='like-button'
                        onClick={(e) => {
                            likePost();
                        }}
                    >
                        {liked ? (
                            <img src={likeFilledImg} alt='Like' />
                        ) : (
                            <img src={likeImg} alt='Like' />
                        )}
                    </div>
                ) : (
                    ""
                )}
                <div
                    className='comment-button'
                    onClick={(e) => {
                        show ? setShow(false) : setShow(true);
                    }}
                >
                    <img src={commentImg} alt='Like' />
                </div>
            </div>
            {show ? (
                <div className='post-comments'>
                    {localStorage.getItem("User") ? (
                        <div className='add-comment'>
                            <form>
                                <img
                                    src={
                                        JSON.parse(localStorage.getItem("User"))
                                            .avatar === null
                                            ? defaultAvatar
                                            : JSON.parse(
                                                  localStorage.getItem("User")
                                              ).avatar === 1
                                            ? maleAvatar
                                            : femaleAvatar
                                    }
                                    alt='Owner'
                                />
                                <input
                                    type='text'
                                    placeholder='Add a comment...'
                                    ref={commentRef}
                                    onChange={(e) => {
                                        setNewComment({
                                            ...newComment,
                                            comment: e.target.value,
                                        });
                                    }}
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addComment();
                                    }}
                                >
                                    Add Comment
                                </button>
                            </form>
                        </div>
                    ) : (
                        ""
                    )}
                    <div className='hr'></div>
                    <div className='comments'>
                        {comments.length === 0 ? (
                            <div className='no-comments'>No comments.</div>
                        ) : (
                            comments.map((comment) => {
                                return (
                                    <Comment
                                        comment={comment.comment}
                                        date={comment.createAt}
                                        owner={comment.owner}
                                        key={comment._id}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default PostCard;
