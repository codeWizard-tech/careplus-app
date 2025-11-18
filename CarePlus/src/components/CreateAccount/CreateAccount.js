import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";
import doctorImg from "url:../../assets/home_screen.png";

function CreateAccount() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleCreateAccount = (e) => {
        e.preventDefault();

        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = savedUsers.find((u) => u.email === email);

        if (userExists) {
            setMessage("User already exists with this email!");
            return;
        }

        const newUser = { name, email, password };
        savedUsers.push(newUser);

        localStorage.setItem("users", JSON.stringify(savedUsers));

        setMessage("Account created successfully! You can now login.");
    };

    return (
        <div className="create-container">

            <div className="left-side">
                <div className="create-box">
                    <h2 className="title">Create Your CarePlus Account</h2>

                    {message && (
                        <p className={message.includes("successfully") ? "msg-success" : "msg-error"}>
                            {message}
                        </p>
                    )}

                    {/* Show login button only after success */}
                    {message === "Account created successfully! You can now login." && (
                        <button
                            className="create-acc-login-btn"
                            style={{ marginBottom: "15px" }}
                            onClick={() => navigate("/")}
                        >
                            Go to Login
                        </button>
                    )}

                    <form onSubmit={handleCreateAccount} className="create-acc-form">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="create-btn">Create Account</button>
                    </form>
                </div>
            </div>

            <div className="right-side">
                <img src={doctorImg} width="600px" className="create-img" alt="careplus" />
            </div>

        </div>
    );
}

export default CreateAccount;
