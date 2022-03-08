import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./Profile.css";
import HeaderUser from "../../helpers/HeaderUser";
import Error from "../../helpers/Error";
import profileImg from "../../../images/default_avatar.png";
import settingsImg from "../../../images/setting.png";
import saveImage from "../../../images/save.png";
import cancelImage from "../../../images/error.png";
import PostCard from "../../helpers/PostCard";
import CommentProfile from "../../helpers/CommentProfile";
import maleAvatar from "../../../images/male.svg";
import femaleAvatar from "../../../images/female.svg";

const Profile = () => {
    const [user, setUser] = useState({});

    const [updatedUser, setUpdatedUser] = useState(user);

    const [current, setCurrent] = useState("Posts");

    const [avatar, setAvatar] = useState(0);

    const [show, setShow] = useState(false);

    const [myPosts, setMyPosts] = useState([]);

    const [myComments, setMycomments] = useState([]);

    const [loaded, setLoaded] = useState(false);

    const [error, setError] = useState("");

    const getUser = async () => {
        try {
            const res = await axios.get("/api/users/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });

            setUser(res.data);
            setAvatar(user.avatar);
        } catch (e) {}
    };

    const getPosts = async () => {
        try {
            const postsArray = await axios.get(
                "/api/posts/me",

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "Token"
                        )}`,
                    },
                }
            );

            if (
                myPosts.length !== postsArray.length &&
                myPosts.every((value, index) => value === postsArray[index])
            ) {
                setMyPosts([...postsArray.data]);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getComments = async () => {
        try {
            const commentsArray = await axios.get("/api/comments/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });

            if (
                myComments.length !== commentsArray.length &&
                myComments.every(
                    (value, index) => value === commentsArray[index]
                )
            ) {
                setMycomments([...commentsArray.data]);
                setLoaded(true);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const updateProfile = async () => {
        if (updatedUser.email === "") {
            setError("Email is required.");
        } else {
            try {
                await axios.patch("/api/users/me", updatedUser, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "Token"
                        )}`,
                    },
                });

                setLoaded(false);
                setShow(false);
            } catch (error) {
                if (error.response.data.error.includes("short")) {
                    setError("Password is to short.");
                } else if (
                    error.response.data.error.includes("Invalid Password")
                ) {
                    setError("Invalid password.");
                }
            }
        }
    };

    useEffect(() => {
        if (!loaded) {
            getUser();
            getPosts();
            getComments();
        }
    });

    return (
        <div className='profile'>
            <HeaderUser />
            <div className='content'>
                <div className='profile-info'>
                    <img
                        src={
                            user.avatar === null
                                ? profileImg
                                : user.avatar === 1
                                ? maleAvatar
                                : femaleAvatar
                        }
                        alt='Profile'
                    />
                    <div className='overview'>
                        <div className='profile-name'>
                            {user.fullname !== undefined
                                ? user.fullname
                                : user.username}
                            <img
                                src={settingsImg}
                                alt='Settings'
                                onClick={(e) => {
                                    setShow(true);
                                }}
                            />
                        </div>
                        <div className='title'>
                            {user.title === undefined ? "" : user.title}
                        </div>
                    </div>
                </div>
                <p className='profile-desc'>
                    {user.description === undefined ? "" : user.description}
                </p>
                <div className='profile-stats'>
                    <ul>
                        <li
                            onClick={(e) => {
                                setCurrent(e.target.innerText);
                            }}
                            style={{
                                color: `${
                                    current === "Posts" ? "#5ce1e6" : "#333"
                                }`,
                            }}
                        >
                            Posts
                        </li>
                        <li
                            onClick={(e) => {
                                setCurrent(e.target.innerText);
                            }}
                            style={{
                                color: `${
                                    current === "Comments" ? "#5ce1e6" : "#333"
                                }`,
                            }}
                        >
                            Comments
                        </li>
                    </ul>
                    <div className='hr'></div>
                    <div className='content-box'>
                        {current === "Posts" ? (
                            myPosts.length === 0 ? (
                                <div className='no-data'>No posts.</div>
                            ) : (
                                myPosts.map((post) => {
                                    return (
                                        <PostCard
                                            key={post._id}
                                            postId={post._id}
                                            title={post.title}
                                            content={post.content}
                                            images={post.images}
                                            date={post.createdAt}
                                            likes={post.likes}
                                            owner={post.owner}
                                        />
                                    );
                                })
                            )
                        ) : current === "Comments" ? (
                            myComments.map((comment) => {
                                return (
                                    <CommentProfile
                                        key={comment._id}
                                        comment={comment.comment}
                                        owner={comment.owner}
                                        post={comment.post}
                                        date={comment.createdAt}
                                    />
                                );
                            })
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
            <div
                className='update-container'
                style={{
                    height: window.innerHeight + "px",
                    zIndex: show ? "1" : "-1",
                    opacity: show ? "1" : "0",
                }}
            >
                <div className='edit-box'>
                    <h2>Update Profile</h2>
                    <div className='hr'></div>
                    {error === "" ? "" : <Error error={error} />}
                    <form>
                        <label>Full Name</label>
                        <input
                            type='text'
                            defaultValue={
                                user.fullname !== undefined ? user.fullname : ""
                            }
                            onChange={(e) => {
                                setUpdatedUser({
                                    ...updatedUser,
                                    fullname: e.target.value,
                                });
                                setError("");
                            }}
                        />
                        <label>Email</label>
                        <input
                            type='email'
                            defaultValue={user.email}
                            onChange={(e) => {
                                setUpdatedUser({
                                    ...updatedUser,
                                    email: e.target.value,
                                });
                                setError("");
                            }}
                        />
                        <label>Old Password</label>
                        <input
                            type='password'
                            onChange={(e) => {
                                setUpdatedUser({
                                    ...updatedUser,
                                    oldPassword: e.target.value,
                                });
                                setError("");
                            }}
                        />
                        <label>New Password</label>
                        <input
                            type='password'
                            onChange={(e) => {
                                setUpdatedUser({
                                    ...updatedUser,
                                    newPassword: e.target.value,
                                });
                                setError("");
                            }}
                        />
                        <label>Title</label>
                        <input
                            type='text'
                            defaultValue={
                                user.title !== undefined ? user.title : ""
                            }
                            onChange={(e) => {
                                setUpdatedUser({
                                    ...updatedUser,
                                    title: e.target.value,
                                });
                                setError("");
                            }}
                        />
                        <label>Description</label>
                        <textarea
                            defaultValue={
                                user.description !== undefined
                                    ? user.description
                                    : ""
                            }
                            onChange={(e) => {
                                setUpdatedUser({
                                    ...updatedUser,
                                    description: e.target.value,
                                });
                                setError("");
                            }}
                        ></textarea>
                        <label>Avatar</label>
                        <div className='avatars'>
                            <img
                                src={maleAvatar}
                                alt='Male'
                                style={{
                                    opacity: avatar === 1 ? "1" : "0.5",
                                }}
                                onClick={(e) => {
                                    setAvatar(1);
                                    setUpdatedUser({
                                        ...updatedUser,
                                        avatar: 1,
                                    });
                                    setError("");
                                }}
                            />
                            <img
                                src={femaleAvatar}
                                alt='Female'
                                style={{
                                    opacity: avatar === 2 ? "1" : "0.5",
                                }}
                                onClick={(e) => {
                                    setAvatar(2);
                                    setUpdatedUser({
                                        ...updatedUser,
                                        avatar: 2,
                                    });
                                    setError("");
                                }}
                            />
                        </div>
                        <div className='buttons'>
                            <button
                                style={{ backgroundColor: "#39C16C" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    updateProfile();
                                }}
                            >
                                <img src={saveImage} alt='Save' />
                                Save
                            </button>
                            <button
                                style={{ backgroundColor: "#ff0000" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShow(false);
                                }}
                            >
                                <img src={cancelImage} alt='Cancel' />
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
