import React from "react";
import Head from "next/head";
import Register from "@/components/Register";
import {handleEmail, handleLogin, handlePassword} from "@/utils/Login_Util";

interface setSession {
    setSession: any
}

export default function LoginForm({setSession}: setSession) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <>
            <Head>
                <title>Login page</title>
            </Head>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-center">Login Form</h5>
                                <form>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" id="email"
                                               placeholder="Email Address"
                                               onChange={(e) => {
                                                   handleEmail(e, setEmail);
                                               }}
                                        />
                                        <label htmlFor="email">Email Address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="password"
                                               placeholder="Password"
                                               onChange={(e) => {
                                                   handlePassword(e, setPassword);
                                               }}
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    {/*click to register*/}
                                    <div className="d-grid mb-3">
                                        <button type="button" className="btn btn-primary"
                                                onClick={() => {
                                                    handleLogin(email, password, setSession);
                                                }}
                                        >Login
                                        </button>
                                    </div>
                                    <div className="d-grid mb-3">
                                        <button type="button" className="btn btn-outline-warning"
                                                data-bs-toggle="modal" data-bs-target="#registerModal"
                                        >Register
                                        </button>
                                    </div>
                                </form>
                                <Register/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}