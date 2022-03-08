import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../helpers/Header";
import Error from "../../helpers/Error";
import "./Login.css";

const Login = () => {
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        avatar: "",
    });

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [errorLogin, setErrorLogin] = useState("");

    const [errorSignup, setErrorSignup] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const headerSize =
            document.querySelector(".loginPage .header").offsetHeight;

        const content = document.querySelector(".loginPage .content");

        content.style.height = window.innerHeight - headerSize + "px";
    });

    const createUser = async () => {
        if (
            newUser.username === "" ||
            newUser.email === "" ||
            newUser.password === ""
        ) {
            return setErrorSignup("Please provide all information.");
        }

        try {
            const res = await axios.post("/api/users", newUser);

            localStorage.setItem("User", JSON.stringify(res.data.user));
            localStorage.setItem("Token", res.data.token);

            navigate("/");
        } catch (e) {
            setErrorSignup("Please enter valid inforamtion.");
        }
    };

    const login = async () => {
        if (user.email === "" || user.password === "") {
            return setErrorLogin("Please provide an email and password.");
        }

        try {
            const res = await axios.post("/api/users/login", user);

            localStorage.setItem("User", JSON.stringify(res.data.user));
            localStorage.setItem("Token", res.data.token);

            navigate("/");
        } catch (e) {
            setErrorLogin("Invalid credentiels.");
        }
    };

    return (
        <div className='loginPage'>
            <Header />
            <div className='content'>
                <div className='login'>
                    <h2>Login</h2>
                    <form>
                        <label>Email</label>
                        <input
                            type='text'
                            onChange={(e) => {
                                setUser({ ...user, email: e.target.value });
                                setErrorLogin("");
                            }}
                        />
                        <label>Password</label>
                        <input
                            type='password'
                            onChange={(e) => {
                                setUser({ ...user, password: e.target.value });
                                setErrorLogin("");
                            }}
                        />
                        {errorLogin !== "" ? <Error error={errorLogin} /> : ""}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                login();
                            }}
                        >
                            Login
                        </button>
                    </form>
                </div>
                <div className='signup'>
                    <h2>Sign up</h2>
                    <form>
                        <label>Username</label>
                        <input
                            type='text'
                            onChange={(e) => {
                                setNewUser({
                                    ...newUser,
                                    username: e.target.value,
                                });
                                setErrorSignup("");
                            }}
                        />
                        <label>Email</label>
                        <input
                            type='email'
                            onChange={(e) => {
                                setNewUser({
                                    ...newUser,
                                    email: e.target.value,
                                });
                                setErrorSignup("");
                            }}
                        />
                        <label>Password</label>
                        <input
                            type='password'
                            onChange={(e) => {
                                setNewUser({
                                    ...newUser,
                                    password: e.target.value,
                                });
                                setErrorSignup("");
                            }}
                        />
                        {errorSignup !== "" ? (
                            <Error error={errorSignup} />
                        ) : (
                            ""
                        )}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                createUser();
                            }}
                        >
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
