import auth from "../firebase/connect";
import Swal from "sweetalert2";
import React from "react";


export const handleEmail = (e: React.ChangeEvent<HTMLInputElement>, setEmail: any) => {
    setEmail(e.target.value);
}

export const handlePassword = (e: React.ChangeEvent<HTMLInputElement>, setPassword: any) => {
    setPassword(e.target.value);
}

export const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>, setConfirmPassword: any) => {
    setConfirmPassword(e.target.value);
}

const resetForm = (setEmail: any, setPassword: any, setConfirmPassword: any) => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
}

export const handleClose = (setEmail: any, setPassword: any, setConfirmPassword: any) => {
    resetForm(setEmail, setPassword, setConfirmPassword);
}

export const handleRegister =(password: string, confirmPassword: string, email: string, setEmail: any, setPassword: any, setConfirmPassword: any) =>{
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
                            resetForm(setEmail, setPassword, setConfirmPassword);
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
            // console.log("adad")
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