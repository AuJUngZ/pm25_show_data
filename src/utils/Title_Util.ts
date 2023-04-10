import auth from "@/firebase/connect";

export const handleLogout = (setSession : any) => {
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
