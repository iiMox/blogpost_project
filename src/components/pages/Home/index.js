import React from "react";
import axois from "axios";
import { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../helpers/Header";
import HeaderUser from "../../helpers/HeaderUser";
import PostCard from "../../helpers/PostCard";
import backgroundImg from "../../../images/homepage background.png";
import axios from "axios";

const Home = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));

    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            const postsArray = await axios.get("/api/posts");

            if (
                posts.length !== postsArray.length &&
                posts.every((value, index) => value === postsArray[index])
            ) {
                setPosts([...postsArray.data]);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getPosts();
    });

    return (
        <div className='home'>
            {user === null ? <Header /> : <HeaderUser />}
            <div className='content'>
                <div className='posts'>
                    {posts.length === 0 ? (
                        <div className='message'>Sorry ! No posts fo now.</div>
                    ) : (
                        <div>
                            {posts.map((post) => {
                                return (
                                    <PostCard
                                        key={post._id}
                                        postId={post._id}
                                        title={post.title}
                                        content={post.content}
                                        images={post.images}
                                        owner={post.owner}
                                        date={post.createdAt}
                                        likes={post.likes}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
