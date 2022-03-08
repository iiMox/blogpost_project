import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import searchIcon from "../../../images/search.png";
import homeIcon from "../../../images/home.png";
import loginIcon from "../../../images/login.png";
import postIcon from "../../../images/post.png";
import homeDarkIcon from "../../../images/home_dark.png";
import loginDarkIcon from "../../../images/login_dark.png";
import postDarkIcon from "../../../images/post_dark.png";

const Header = ({ changeTerm, reload }) => {
    const inputRef = useRef(null);

    const navigate = useNavigate();

    return (
        <div className='header'>
            <ul>
                <li>
                    <a
                        href='/'
                        style={{
                            color: `${
                                window.location.pathname === "/"
                                    ? "#fff"
                                    : "#000"
                            }`,
                        }}
                    >
                        {window.location.pathname === "/" ? (
                            <img src={homeIcon} alt='Home' />
                        ) : (
                            <img src={homeDarkIcon} alt='Home' />
                        )}
                        Home
                    </a>
                </li>
                <li>
                    <a
                        href='/login'
                        style={{
                            color: `${
                                window.location.pathname === "/login"
                                    ? "#fff"
                                    : "#000"
                            }`,
                        }}
                    >
                        {window.location.pathname === "/login" ? (
                            <img src={loginIcon} alt='Login' />
                        ) : (
                            <img src={loginDarkIcon} alt='Login' />
                        )}
                        Login / Sign up
                    </a>
                </li>
                <li>
                    <a
                        href='/post'
                        style={{
                            color: `${
                                window.location.pathname === "/post"
                                    ? "#fff"
                                    : "#000"
                            }`,
                        }}
                    >
                        {window.location.pathname === "/post" ? (
                            <img src={postIcon} alt='Post' />
                        ) : (
                            <img src={postDarkIcon} alt='Post' />
                        )}
                        Post
                    </a>
                </li>
            </ul>
            <div className='search'>
                <form>
                    <input
                        type='text'
                        placeholder='What are you searching for ?'
                        ref={inputRef}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                if (
                                    window.location.search.replace("?", "") !==
                                    ""
                                ) {
                                    changeTerm(e.target.value);
                                    reload(false);
                                }
                                navigate(`/search?${e.target.value}`);
                            }
                        }}
                    />
                </form>
                <img
                    src={searchIcon}
                    alt='Search'
                    onMouseEnter={(e) => {
                        inputRef.current.style.transform = "translatey(0px)";
                    }}
                />
            </div>
        </div>
    );
};

export default Header;
