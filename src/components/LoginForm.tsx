import React from "react";
import auth from "../firebase/connect"
import Swal from "sweetalert2";
import Head from "next/head";
import Register from "@/components/Register";

interface setSession {
    setSession: any
}

export default function LoginForm({setSession}: setSession) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleLogin = async () => {
        try {
            const resp = await auth.signInWithEmailAndPassword(email, password);
            const {user} = resp;
            setSession({
                LoggedIn: true,
                User: user,
                error: null
            });
            console.log(user);
            Swal.fire({
                title: 'Login Success',
                text: 'Welcome to PM2.5 Database',
                icon: 'success',
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                }
            })
        } catch (e: any) {
            setSession({
                LoggedIn: false,
                User: null,
                error: e.message
            });
            Swal.fire({
                title: 'Login Error',
                text: 'Please check your Email and Password',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }
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
                                               onChange={handleEmail}
                                        />
                                        <label htmlFor="email">Email Address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="password"
                                               placeholder="Password"
                                               onChange={handlePassword}
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    {/*click to register*/}
                                    <div className="d-grid mb-3">
                                        <button type="button" className="btn btn-primary"
                                                onClick={handleLogin}
                                        >Login
                                        </button>
                                    </div>
                                    <div className="d-grid mb-3">
                                        <button type="button" className="btn btn-outline-warning"
                                                data-bs-toggle="modal" data-bs-target="#registerModal"
                                        >Register</button>
                                        <Register/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}