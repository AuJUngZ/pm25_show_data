import React from "react";
import auth from "../firebase/connect";
import Swal from "sweetalert2";

export default function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        console.log("Email: ", email + " Password: " + password + " Confirm Password: " + confirmPassword);
    }

    const handleClose = () => {
        resetForm();
    }

    const handleRegister = async () => {
        try {
            if (password === confirmPassword && password !== "" && email !== "") {
                Swal.fire({
                    title: 'You want to register?',
                    text: 'Click ok to continue',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Ok',
                    cancelButtonText: 'Cancel'
                }).then(async (result) => {
                        if (result.isConfirmed) {
                            try {
                                const resp = await auth.createUserWithEmailAndPassword(email, password);
                                const {user} = resp;
                                //show success message then close automatically
                                Swal.fire({
                                    title: 'Register Success',
                                    text: "welcome to our website",
                                    icon: 'success',
                                    timer: 2000,
                                    timerProgressBar: true,
                                    didOpen: () => {
                                        Swal.showLoading()
                                    }
                                })
                                resetForm();
                                //reload page
                                window.location.reload();
                            } catch (e: any) {
                                Swal.fire({
                                    title: 'Register Error',
                                    text: e.message,
                                    icon: 'error',
                                    confirmButtonText: 'Ok'
                                })
                            }
                        }
                    }
                )
            } else {
                console.log("adad")
                Swal.fire({
                    title: 'Password Error',
                    text: 'Please check your password and confirm password',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        } catch (e: any) {
            Swal.fire({
                title: 'Register Error',
                text: e.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    return (
        <div className="modal fade" id="registerModal" aria-labelledby="registerModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="registerModalLabel">Register</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email"
                                       onChange={handleEmail}
                                       value={email}
                                       autoComplete={"off"}
                                />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone
                                    else.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password"
                                       onChange={handlePassword}
                                       value={password}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="password"
                                       onChange={handleConfirmPassword}
                                       value={confirmPassword}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                onClick={handleClose}
                        >Close
                        </button>
                        <button type="button" className="btn btn-primary"
                                onClick={handleRegister}
                        >Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}