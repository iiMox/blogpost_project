import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Search.css";
import Header from "../../helpers/Header";
import HeaderUser from "../../helpers/HeaderUser";
import PostCard from "../../helpers/PostCard";
import UserCard from "../../helpers/UserCard";

const SearchPage = () => {
    const [type, setType] = useState("users");

    const [search, setSearch] = useState(
        window.location.search.replace("?", "")
    );

    const [users, setUsers] = useState([]);

    const [loaded, setLoaded] = useState(false);

    const [posts, setPosts] = useState([]);

    const getUsers = async () => {
        try {
            const res = await axios.get(`/api/users/search/${search}`);
            setUsers(res.data);
            setLoaded(true);
        } catch (e) {
            console.log(e);
        }
    };

    const getPosts = async () => {
        try {
            const res = await axios.get(`/api/posts/search/${search}`);
            setPosts(res.data);
            setLoaded(true);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (!loaded) {
            getUsers();
            getPosts();
        }
    });

    return (
        <div className='search'>
            {localStorage.getItem("Token") !== null ? (
                <HeaderUser changeTerm={setSearch} reload={setLoaded} />
            ) : (
                <Header changeTerm={setSearch} reload={setLoaded} />
            )}
            <div className='content'>
                <ul>
                    <li
                        onClick={(e) => setType("users")}
                        style={{
                            color: `${type === "users" ? "#5ce1e6" : "#333"}`,
                        }}
                    >
                        Users
                    </li>
                    <li
                        onClick={(e) => setType("posts")}
                        style={{
                            color: `${type === "posts" ? "#5ce1e6" : "#333"}`,
                        }}
                    >
                        Posts
                    </li>
                </ul>
                <div className='results'>
                    {type === "users" ? (
                        users.length === 0 ? (
                            <div className='no-data'>Sorry ! No results.</div>
                        ) : (
                            users.map((user) => {
                                return (
                                    <UserCard
                                        key={user._id}
                                        fullname={user.fullname}
                                        username={user.username}
                                        title={user.title}
                                        description={user.description}
                                        avatar={user.avatar}
                                        userId={user._id}
                                    />
                                );
                            })
                        )
                    ) : posts.length === 0 ? (
                        <div className='no-data'>Sorry ! No results.</div>
                    ) : (
                        posts.map((post) => {
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
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
