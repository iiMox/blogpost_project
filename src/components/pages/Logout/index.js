import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";
import HeadeUser from "../../helpers/HeaderUser";
import yesImage from "../../../images/yes.png";
import noImage from "../../../images/delete.png";
import logoutImage from "../../../images/logout_red.png";

const Logout = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await axios.post(
                "/api/users/logoutAll",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "Token"
                        )}`,
                    },
                }
            );
            localStorage.removeItem("User");
            localStorage.removeItem("Token");

            navigate("/");
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const headerSize = document.querySelector(
            ".logout .header-user"
        ).offsetHeight;

        const content = document.querySelector(".logout .content");

        content.style.height = window.innerHeight - headerSize + "px";
    });

    return (
        <div className='logout'>
            <HeadeUser />
            <div className='content'>
                <div className='container'>
                    <img src={logoutImage} alt='Logout' />
                    <div className='confirmation'>Do you want to logout ?</div>
                    <div className='buttons'>
                        <button
                            style={{ backgroundColor: "#39C16C" }}
                            onClick={(e) => {
                                logout();
                            }}
                        >
                            <img src={yesImage} alt='Yes' />
                            Yes
                        </button>
                        <button
                            style={{ backgroundColor: "#F44336" }}
                            onClick={(e) => {
                                navigate("/");
                            }}
                        >
                            <img src={noImage} alt='No' />
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logout;
