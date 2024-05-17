'use client'

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "react-feather/dist";

export const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <>
        <div className="main-wrapper login-body">
            <div className="login-wrapper">
                <div className="container">
                    <div className="loginbox">
                        <div className="login-left">
                            {/* <img className="img-fluid" src={login} alt="Logo" /> */}
                        </div>
                        <div className="login-right">
                            <div className="login-right-wrap">
                                <h1>Welcome to Preskool</h1>
                                <p className="account-subtitle">
                                    Need an account? <Link href="/register">Sign Up</Link>
                                </p>
                                <h2>Sign in</h2>
                                {/* Form */}
                                <form action="./admindashboard">
                                    <div className="form-group">
                                        <label>
                                            Username <span className="login-danger">*</span>
                                        </label>
                                        <input className="form-control" type="text" />
                                        <span className="profile-views">
                                            <i className="fas fa-user-circle" />
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Password <span className="login-danger">*</span>
                                        </label>

                                        <input
                                            type={passwordVisible ? "" : "password"}
                                            className="form-control pass-input"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span
                                            className="toggle-password"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {passwordVisible ? (
                                                <EyeOff className="react-feather-custom" />
                                            ) : (
                                                <Eye className="react-feather-custom" />
                                            )}
                                        </span>
                                    </div>
                                    <div className="forgotpass">
                                        <div className="remember-me">
                                            <label className="custom_check mr-2 mb-0 d-inline-flex remember-me">
                                                {" "}
                                                Remember me
                                                <input type="checkbox" name="radio" />
                                                <span className="checkmark" />
                                            </label>
                                        </div>
                                        <Link href="/forgotpassword">Forgot Password?</Link>
                                    </div>
                                    <div className="form-group">
                                        <button
                                            className="btn btn-primary btn-block"
                                            type="submit"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </form>
                                {/* /Form */}
                                <div className="login-or">
                                    <span className="or-line" />
                                    <span className="span-or">or</span>
                                </div>
                                {/* Social Login */}
                                <div className="social-login">
                                        <Link href="#">
                                            <i className="fab fa-google-plus-g" />
                                        </Link>
                                        <Link href="#">
                                            <i className="fab fa-facebook-f" />
                                        </Link>
                                        <Link href="#">
                                            <i className="fab fa-twitter" />
                                        </Link>
                                        <Link href="#">
                                            <i className="fab fa-linkedin-in" />
                                        </Link>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default Login;
