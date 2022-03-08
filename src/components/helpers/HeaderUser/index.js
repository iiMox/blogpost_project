import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./HeaderUser.css";
import searchIcon from "../../../images/search.png";
import homeIcon from "../../../images/home.png";
import profileIcon from "../../../images/profile.png";
import postIcon from "../../../images/post.png";
import logoutIcon from "../../../images/logout.png";
import homeDarkIcon from "../../../images/home_dark.png";
import profileDarkIcon from "../../../images/profile_dark.png";
import postDarkIcon from "../../../images/post_dark.png";
import logoutDarkIcon from "../../../images/logout_dark.png";

const HeaderUser = ({ changeTerm, reload }) => {
    const inputUserRef = useRef(null);

    const navigate = useNavigate();

    return (
        <div className='header-user'>
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
                <li>
                    <a
                        href='/profile'
                        style={{
                            color: `${
                                window.location.pathname === "/profile"
                                    ? "#fff"
                                    : "#000"
                            }`,
                        }}
                    >
                        {window.location.pathname === "/profile" ? (
                            <img src={profileIcon} alt='Profile' />
                        ) : (
                            <img src={profileDarkIcon} alt='Profile' />
                        )}
                        Profile
                    </a>
                </li>
                <li>
                    <a
                        href='/logout'
                        style={{
                            color: `${
                                window.location.pathname === "/logout"
                                    ? "#fff"
                                    : "#000"
                            }`,
                        }}
                    >
                        {window.location.pathname === "/logout" ? (
                            <img src={logoutIcon} alt='Logout' />
                        ) : (
                            <img src={logoutDarkIcon} alt='Logout' />
                        )}
                        Logout
                    </a>
                </li>
            </ul>
            <div className='search'>
                <form>
                    <input
                        type='text'
                        placeholder='What are you searching for ?'
                        ref={inputUserRef}
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
                        inputUserRef.current.style.transform =
                            "translatey(0px)";
                    }}
                />
            </div>
        </div>
    );
};

export default HeaderUser;
