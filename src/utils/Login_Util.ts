import auth from '../firebase/connect';
import Swal from 'sweetalert2';
import React from "react";


export const handleEmail = (e: React.ChangeEvent<HTMLInputElement>, setEmail: any) => {
    setEmail(e.target.value)
}

export const handlePassword = (e: React.ChangeEvent<HTMLInputElement>, setPassword: any) => {
    setPassword(e.target.value)
}

export const handleLogin = async (email: string, password: string, setSession: any) =>{
    try {
        const resp = await auth.signInWithEmailAndPassword(email, password);
        const {user} = resp;
        setSession({
            LoggedIn: true,
            User: user,
            error: null
        });
        // console.log(user);
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