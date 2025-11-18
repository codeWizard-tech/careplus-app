import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import './login.css';
import doctorImg from "url:../../assets/home_screen.png";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // alert(`Logged in as: ${email}`);

        // Get saved users from localStorage
        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

        const matchedUser = savedUsers.find(
            (user) => user.email === email && user.password === password
        );

        if (!matchedUser) {
            setError("Invalid email or password!");
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

        navigate("/dashboard");
    };

    return (
        <div className="login-container">
            <div className="left-side">
                <div className="login-card">
                    <h2 className="title">CarePlus Login</h2>
                    <p className="subtitle">Your health, in one place</p>

                    {error && <p className="error-text">{error}</p>}

                    <form onSubmit={handleLogin} className="login-form">
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

                        <button type="submit" className="login-btn">Login</button>
                    </form>

                    <p className="footer-text">
                        {/* New user? <a href="/create-account">Create an account</a> */}
                        New user? <Link to="/createAccount">Create an account</Link>
                    </p>
                </div>
            </div>
            <div className="right-side">
                    <img src={doctorImg} width="600px" className="login-image"/>
            </div>
        </div>
    );
}

export default Login;