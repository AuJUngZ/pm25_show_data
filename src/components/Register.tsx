import React from "react";
import auth from "../firebase/connect";
import Swal from "sweetalert2";
import {handleConfirmPassword, handleEmail, handlePassword, handleClose, handleRegister} from "@/utils/Register_Util";

export default function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    return (
        <div className="modal fade" id="registerModal" aria-labelledby="registerModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="registerModalLabel">Register</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() =>{
                                    handleClose(setEmail, setPassword, setConfirmPassword)
                                }}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email_register"
                                       onChange={(e) => {
                                           handleEmail(e, setEmail)
                                       }}
                                       value={email}
                                       autoComplete={"off"}
                                />
                                <div id="emailHelp" className="form-text">We will never share your email with anyone
                                    else.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password_init"
                                       onChange={(e) => {
                                           handlePassword(e, setPassword)
                                       }}
                                       value={password}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="password_confirm"
                                       onChange={(e) => {
                                           handleConfirmPassword(e, setConfirmPassword)
                                       }}
                                       value={confirmPassword}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                onClick={() =>{
                                    handleClose(setEmail, setPassword, setConfirmPassword)
                                }}
                        >Close
                        </button>
                        <button type="button" className="btn btn-primary"
                                onClick={() =>{
                                    handleRegister(password, confirmPassword, email, setEmail, setPassword, setConfirmPassword)
                                }}
                        >Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}