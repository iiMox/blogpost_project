import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Post.css";
import Header from "../../helpers/Header";
import HeaderUser from "../../helpers/HeaderUser";
import UploadImage from "../../helpers/UploadImage";
import addImage from "../../../images/add.png";

const Post = () => {
    const user = JSON.parse(localStorage.getItem("User"));

    const [images, setImages] = useState([]);

    const [post, setPost] = useState({
        title: "",
        content: "",
        images: [],
    });

    const navigate = useNavigate();

    const removeImage = (id) => {
        const newArray = images.filter((image) => {
            return image.id !== id;
        });

        setImages(newArray);
    };

    const createPost = async () => {
        try {
            await axios.post("/api/posts", post, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (user === null) {
            const headerSize =
                document.querySelector(".post-page .header").offsetHeight;
            const message = document.querySelector(".post-page .message");

            message.style.height = window.innerHeight - headerSize + "px";
        } else {
            const headerSize = document.querySelector(
                ".post-page .header-user"
            ).offsetHeight;
            const content = document.querySelector(".post-page .content");

            content.style.minHeight = window.innerHeight - headerSize + "px";
        }
    });

    return user === null ? (
        <div className='post-page'>
            <Header />
            <div className='message'>
                Please login or sign up to gain access. <br />
                Thank you.
            </div>
        </div>
    ) : (
        <div className='post-page'>
            <HeaderUser />
            <div className='content'>
                <form>
                    <h2>Create Post</h2>
                    <div className='hr'></div>
                    <input
                        type='text'
                        placeholder='Post title'
                        onChange={(e) => {
                            setPost({ ...post, title: e.target.value });
                        }}
                    />
                    <textarea
                        placeholder='What do you think ?'
                        onChange={(e) => {
                            setPost({ ...post, content: e.target.value });
                        }}
                    ></textarea>
                    <div className='images-section'>
                        <div className='selected-images'>
                            {images.length !== 0
                                ? images.map((image) => {
                                      return (
                                          <UploadImage
                                              image={image}
                                              remove={removeImage}
                                              key={image.id}
                                          />
                                      );
                                  })
                                : ""}
                        </div>
                        <div className='upload-container'>
                            <div className='upload-border'>
                                <button
                                    className='upload-button'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document
                                            .querySelector(".hidden-upload")
                                            .click();
                                    }}
                                >
                                    Upload
                                </button>
                            </div>
                            <input
                                type='file'
                                className='hidden-upload'
                                accept='image/*'
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    var fReader = new FileReader();
                                    fReader.readAsDataURL(e.target.files[0]);
                                    fReader.onloadend = function (event) {
                                        setImages([
                                            ...images,
                                            {
                                                id: images.length + 1,
                                                image: event.target.result,
                                            },
                                        ]);
                                        setPost({
                                            ...post,
                                            images: [
                                                ...post.images,
                                                { image: event.target.result },
                                            ],
                                        });
                                        e.target.value = "";
                                    };
                                }}
                            />
                        </div>
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            createPost();
                        }}
                    >
                        <img src={addImage} alt='Add' />
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Post;
