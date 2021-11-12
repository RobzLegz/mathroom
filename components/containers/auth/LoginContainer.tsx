import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/userSlice";
import { checkForLogin, loginUser } from "../../../requests/auth/requests";
import Link from "next/link";

function LoginContainer() {
    const userInfo = useSelector(selectUser);

    const dispatch = useDispatch();
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
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
            <h1 onClick={() => router.push("/menu")}>Log in</h1>
            <div className="auth__container__form">
                <div className="auth__container__form__field">
                    <label htmlFor="login_email">Email</label>
                    <input
                        type="Email"
                        name="login_email"
                        id="login_email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value);setClicked(false)}}
                        autoComplete="off"
                    />
                </div>
                <div className="auth__container__form__field">
                    <label htmlFor="login_password">Password</label>
                    <input
                        type="Password"
                        name="login_password"
                        id="login_password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value);setClicked(false)}}
                        autoComplete="off"
                    />
                </div>
                <div className="auth__container__form__link">
                    <p>Don't have an account? <Link href="/auth/register">Register</Link></p>
                </div>
                <button disabled={clicked} onClick={(e) => loginUser(e, email, password, dispatch, router, clicked, setClicked)}>Log in</button>
                <small>Go to menu by clicking login title</small>
            </div>
        </form>
    )
}

export default LoginContainer