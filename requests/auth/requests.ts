import valid, { validateEmail } from "../../utils/valid";
import { login, setToken, setUserInfo } from "../../redux/slices/userSlice";
import { clearNotification, setNotification } from "../../redux/slices/notificationSlice";
import axios from "axios";

const registerUser = (e: any, username: string, email: string, password: string, cfPassword: string, agreedToPrivacyPolicy: boolean, dispatch: any, router: any) => {
    e.preventDefault(); 
    dispatch(setNotification({type: "loading", message: "loading"}));
    
    const errMsg = valid(username, email, password, cfPassword);
    if(errMsg){
        return dispatch(setNotification({type: "error", message: errMsg}));
    }
    
    if(!agreedToPrivacyPolicy){
        return dispatch(setNotification({type: "error", message: "To register You must accept our privacy policy!"}));
    }  
    
    const userData = {
        username: username,
        email: email,
        password: password,
        cf_password: cfPassword,
    };

    axios.post("/api/auth/register", userData)
        .then((res: any) => {
            dispatch(setNotification({type: "success", message: "Register success. Log in now"}));
            router.push("/auth/login");
        }).catch((err: any) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

const loginUser = (e: any, email: string, password: string, dispatch: any, router: any) => {
    e.preventDefault();
    dispatch(setNotification({type: "loading", message: "loading"}));

    if(!email || !password){
        return dispatch(setNotification({type: "error", message: "Please fill out all fields!"}));
    }

    if(password.length < 6){
        return dispatch(setNotification({type: "error", message: "Password should be at least 6 characters!"}));
    }

    const emailValid = validateEmail(email);
    
    if(emailValid){
        const userData = {
            email: email,
            password: password,
        };
    
        axios.post("/api/auth/login", userData)
            .then((res: any) => {
                localStorage.setItem("firstLogin", "true");
                window.localStorage.setItem("refreshtoken", res.data.refresh_token)
                dispatch(clearNotification());
                checkForLogin(dispatch, router);
            }).catch((err: any) => {
                const message: string = err.response.data.err;
                dispatch(setNotification({type: "error", message: message}));
            });
    }else{
        dispatch(setNotification({type: "error", message: "Please enter a valid email!"}));
    }    
}

const checkForLogin = (dispatch: any, router: any) => {
    const first_login = window.localStorage.getItem("firstLogin");
    const rf_token = window.localStorage.getItem("refreshtoken");

    if(rf_token){
        const headers = {
            headers: {
                Authorization: rf_token
            }
        }
        
        if(first_login){
            axios.get("/api/auth/accessToken", headers)
                .then((res: any) => {
                    dispatch(setToken(res.data.access_token));
                    dispatch(setUserInfo(res.data.user));
                    dispatch(login());
                }).catch((err) => {
                    const message: string = err.response.data.err;
                    dispatch(setNotification({type: "error", message: message}));
                    window.localStorage.removeItem("firstLogin");
                    window.localStorage.removeItem("refreshtoken");
                    router.push("/auth/login");
                });
        }else{
            router.push("/auth/login");
        }
    }else{
        router.push("/auth/login");
    }
}

export {registerUser, loginUser, checkForLogin};