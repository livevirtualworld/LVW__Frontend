import React, { useState } from 'react'
import style from './ForgetPassword.module.css'
import Logo from '../../assets/logo.svg'
import Vector from '../../assets/Group 39467.svg'
import axios from "axios";
import SuccessandErrorModals from '../SuccessandErorrModals/SuccessandErrorModals';
import { useNavigate } from 'react-router-dom';



function ForgetPassword() {
    const navigate = useNavigate();

    const [tap, setTap] = useState("signUp")
    const [hi, setHi] = useState(false)
    const [forgetEmail, setForgetEmail] = useState("")
    const [forgetPassword, setForgetPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    //small error tag
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [matchingError, setMatchingError] = useState(false);


    const [showSuccessRegisterModal, setShowSuccessRegisterModal] = useState(false);
    const [showSuccessLoginModal, setShowSuccessLoginModal] = useState(false);

    //Error
    const [showErrorRegisterModal, setShowErrorRegisterModal] = useState(false);
    const [showErrorLoginModal, setShowErrorLoginModal] = useState(false);
    const [errorLoginMsg, setErrorLoginMsg] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!forgetPassword) {
            setPasswordError(true)
            return;
        } else if (!confirmPassword) {
            setConfirmPasswordError(true)
            return;
        } else if (forgetPassword !== confirmPassword) {
            setMatchingError(true);
            return;
        } else {
            setPasswordError(false)
            setConfirmPasswordError(false)
            setMatchingError(false);
            axios.put("http://localhost:5000/user/updatePassword", {
                email: forgetEmail,
                password: forgetPassword
            }).then((res) => {
                if (res.data.status === 200) {
                    setShowSuccessRegisterModal(true);
                    setTimeout(() => {
                        setShowSuccessRegisterModal(false);
                        navigate("/login");
                    }, 3000);
                }
            })

        }

    }



    return (
        <main className={`${hi === true ? style.signn : ""}`}>
            <div className={style["form__box"]}>
                <div className={style["inner-box"]}>
                    <div className={style["forms-wrap"]}>
                        {/*--------------------- Sign In Form-----------------------*/}
                        {
                            showErrorLoginModal && <SuccessandErrorModals message={errorLoginMsg} success={false} />
                        }
                        <form className={style["sign-in-form"]} id="sign__in__form" >
                            <div className={style["logo"]}>
                                <img src={Logo} alt="" />
                            </div>
                            <div className={style["heading"]}>
                                <h2>To reset your password enter your email.</h2>
                            </div>
                            <div className={style["actual-form"]}>
                                <div className={style["input-wrap"]}>
                                    <input onChange={(e) => {
                                        setForgetEmail(e.target.value)
                                    }} type="email" className={style["input-field"]} id="log__email" />
                                    <label>Email</label>
                                    {emailError && <small className={style["error-message__small"]}>This field can't be empty</small>}
                                </div>
                                <input onClick={(e) => {
                                    e.preventDefault()
                                    if (!forgetEmail) {
                                        setEmailError(true)
                                        return;
                                    }
                                    else {
                                        setEmailError(false)
                                        axios.post("http://localhost:5000/user/checkEmail", {
                                            email: forgetEmail,
                                        }).then((res) => {
                                            if (res.data.status === 200) {
                                                hi ? setHi(false) : setHi(true)
                                                setTap("signUp")
                                            }
                                            else if (res.data.status === 400) {
                                                setErrorLoginMsg(res.data.message)
                                                setShowErrorLoginModal(true);
                                                setTimeout(() => {
                                                    setShowErrorLoginModal(false);
                                                }, 3000);
                                            }

                                        })
                                    }
                                }} type="submit" defaultValue="Login" className={style["sign-btn"]} />
                            </div>
                        </form>
                        {/*--------------------- Sign up Form-----------------------*/}

                        {/* Success Modal */}
                        {showSuccessRegisterModal && <SuccessandErrorModals message={"Password updated successfully"} success={true} />}
                        {

                            tap === "signUp" &&
                            <form className={style["sign-up-form"]} id="sign__up__form" onSubmit={handleSubmit} enctype="multipart/form-data">
                                <div className={style["logo sign__logo"]}>
                                    <img src={Logo} alt="" />
                                </div>
                                <div className={style["heading"]}>
                                    <h2>Complete your process to update your password!</h2>
                                </div>
                                <div className={style["actual-form sign__form"]}>
                                    <div className={style["input-wrap"]}>
                                        <input
                                            type='password'
                                            id="name"
                                            className={style["input-field"]}
                                            onChange={(e) => {
                                                setForgetPassword(e.target.value)
                                            }}
                                        />
                                        <label>Password</label>
                                        {passwordError && <small className={style["error-message__small"]}>This field can't be empty</small>}
                                    </div>
                                    <div className={style["input-wrap"]}>
                                        <input
                                            type='password'
                                            id="pass"
                                            className={style["input-field"]}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value)
                                            }}
                                        />
                                        <label>Confirm Password</label>
                                        {confirmPasswordError && <small className={style["error-message__small"]}>This field can't be empty</small>}
                                        {matchingError && <small className={style["error-message__small"]}>Password are not matching</small>}
                                    
                                    </div>
                                    <input type="submit" className={style["sign-btn"]} />
                                </div>
                            </form>
                        }
                    </div>
                    <div className={style["carousel"]}>
                        <div className={style["carousel__welcome"]}>
                            <h2>Welcome to</h2>
                            <img src={Logo} alt="" className={style["carousel__logo"]} />
                        </div>
                        <div className={style["carousel__text"]}>
                            <h1>Book your Tour Now!</h1>
                        </div>
                        <img src={Vector} alt="" className={style["carousel__vector"]} />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ForgetPassword;

