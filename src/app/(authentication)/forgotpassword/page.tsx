import Link from "next/link";

export default function ForgotPassword() {
    return (
        <>
            {/* Main Wrapper */}
            <div className="main-wrapper login-body" dir="rtl">
                <div className="login-wrapper">
                    <div className="container">
                        <div className="loginbox">
                            <div className="login-left">
                                <img className="img-fluid" alt="Logo" />
                            </div>
                            <div className="login-right">
                                <div className="login-right-wrap">
                                    <h1>Reset Password</h1>
                                    <p className="account-subtitle">Let Us Help You</p>
                                    {/* Form */}
                                    <form action="./login">
                                        <div className="form-group">
                                            <label>
                                                Enter your registered email address{" "}
                                                <span className="login-danger">*</span>
                                            </label>
                                            <input className="form-control" type="text" />
                                            <span className="profile-views">
                                                <i className="fas fa-envelope" />
                                            </span>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-primary btn-block" type="submit">
                                                Reset My Password
                                            </button>
                                        </div>
                                        <div className="form-group mb-0">
                                            <Link href="/login">
                                                <button
                                                    className="btn btn-primary primary-reset btn-block"
                                                    type="submit"
                                                >
                                                    Login
                                                </button>
                                            </Link>
                                        </div>
                                    </form>
                                    {/* /Form */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}


