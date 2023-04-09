import React from "react";
import auth from "../firebase/connect"

interface TitleProps {
    setSession: any
    session: any
}
export default function Title({setSession , session}: TitleProps) {
    console.log(session)
    const handleLogout = () => {
        auth.signOut().then(() => {
            setSession({
                LoggedIn: false,
                User: null,
                error: null
            })
        }).catch((error : any) => {
            setSession({
                LoggedIn: true,
                User: null,
                error: error
            })
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8 col-md-10 col-12">
                    <h1 className="text-center mb-4">PM2.5 Database</h1>
                    <p className="lead text-center">Welcome to the PM2.5 database. This is a simple project for learning how to build and use an API.</p>
                    <div className="d-flex justify-content-center gap-3">
                        <h4 className={""}>Login as : {session.User.email}</h4>
                        <button className="btn btn-danger"
                                onClick={handleLogout}
                        >Log Out</button>
                    </div>
                    <hr className="my-4" />
                </div>
            </div>
        </div>
    )
}