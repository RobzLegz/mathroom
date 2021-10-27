import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/userSlice';
import { checkForLogin, registerUser } from '../../../requests/auth/requests';
import Link from "next/link";

function RegisterContainer() {
    const userInfo = useSelector(selectUser);

    const dispatch = useDispatch();
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cfPassword, setCFPassword] = useState<string>("");
    const [agreedToPrivacyPolicy, setAgreedToPrivacyPolicy] = useState<boolean>(false);
    const [clicked, setClicked] = useState<boolean>(false);

    useEffect(() => {
        if(userInfo.loggedIn){
            router.push("/");
        }else{
            const token = window.localStorage.getItem("refreshtoken");

            if(token){
                checkForLogin(dispatch, router);
            }
        }
    }, [userInfo.loggedIn, dispatch]);

    return (
        <form className="auth__container">
            <div className="auth__container__form">
                <div className="auth__container__form__field">
                    <label htmlFor="register_username">username</label>
                    <input 
                        type="username" 
                        name="register_username" 
                        id="register_username" 
                        placeholder="username"
                        value={username}
                        onChange={(e) => {setUsername(e.target.value);setClicked(false)}}
                        autoComplete="off"
                    />
                </div>
                <div className="auth__container__form__field">
                    <label htmlFor="register_email">email</label>
                    <input 
                        type="email" 
                        name="register_email" 
                        id="register_email" 
                        placeholder="email"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value);setClicked(false)}}
                        autoComplete="off"
                    />
                </div>
                <div className="auth__container__form__field">
                    <label htmlFor="register_password">password</label>
                    <input 
                        type="password" 
                        name="register_password" 
                        id="register_password" 
                        placeholder="password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value);setClicked(false)}}
                        autoComplete="off"
                    />
                </div>
                <div className="auth__container__form__field">
                    <label htmlFor="register_cf_password">password again</label>
                    <input 
                        type="password" 
                        name="register_cf_password" 
                        id="register_cf_password" 
                        placeholder="confirm password"
                        value={cfPassword}
                        onChange={(e) => {setCFPassword(e.target.value);setClicked(false)}}
                        autoComplete="off"
                    />
                </div>
                <div className="auth__container__form__link">
                    <p>Already have an account? <Link href="/auth/login">Login</Link></p>
                </div>
                <div className="auth__container__form__privacyPolicy">
                    <div className={`auth__container__form__privacyPolicy__checkbox ${agreedToPrivacyPolicy ? "auth__container__form__privacyPolicy__checkbox__agreed" : ""}`} onClick={() => setAgreedToPrivacyPolicy(!agreedToPrivacyPolicy)}>{agreedToPrivacyPolicy && (<img src="/png/white-check-mark.png" alt="white check mark" />)}</div>
                    <p>I agree to your <Link href="/privacy-policy">privacy policy</Link></p>
                </div>
                <button disabled={clicked} onClick={(e) => registerUser(e, username, email, password, cfPassword, agreedToPrivacyPolicy, dispatch, router, clicked, setClicked)}>Register</button>
            </div>
        </form>
    )
}

export default RegisterContainer
