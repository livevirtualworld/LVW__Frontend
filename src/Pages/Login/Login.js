import React from 'react'
import style from './Login.module.css'
import Logo from '../../assets/logo.svg'
import Vector from '../../assets/Group 39467.svg'

function Login() {
  
    return (
        <main>
        <div className={style["form__box"]}>
          <div className={style["inner-box"]}>
            <div className={style["forms-wrap"]}>
              {/*--------------------- Sign In Form-----------------------*/}
              <form className={style["sign-in-form"]} id="sign__in__form" >
                <div className={style["logo"]}>
                  <img src={Logo} alt="" />
                </div>
                <div className={style["heading"]}>
                  <h2>Welcome Back</h2>
                  <h6>Not registred yet?</h6>
                  <a href="#" className={style["toggle"]} id="signIn">Sign up</a>
                </div>
                <div className={style["actual-form"]}>
                  <div className={style["input-wrap"]}>
                    <input type="email" className={style["input-field"]} id="log__email" />
                    <label>Email</label>
                    <small />
                  </div>
                  <div className={style["input-wrap"]}>
                    <input type="password" className={style["input-field"]} id="log__pass" />
                    <label>Password</label>
                    <small />
                  </div>
                  <input type="submit" defaultValue="Login" className={style["sign-btn"]} />
                  <p className="text">
                    Forget your password?
                    <a id="forg" href="#">Click here</a>
                  </p>
                </div>
              </form>
              {/*--------------------- Sign up Form-----------------------*/}
              <form className={style["sign-up-form"]} id="sign__up__form">
                <div className={style["logo sign__logo"]}>
                  <img src={Logo} alt="" />
                </div>
                <div className={style["heading"]}>
                  <h2>Get Started</h2>
                  <h6>Already have an account?</h6>
                  <a href="#" className={style["toggle"]} id="signUp">Login</a>
                </div>
                <div className={style["actual-form sign__form"]}>
                  <div className={style["input-wrap"]}>
                    <input type="text" id="name" className={style["input-field"]} />
                    <label>Name</label>
                    <small />
                  </div>
                  <div className={style["input-wrap"]}>
                    <input type="email" id="email" className={style["input-field"]} />
                    <label>Email</label>
                    <small />
                  </div>
                  <div className={style["input-wrap"]}>
                    <input type="password" id="pass" className={style["input-field"]} />
                    <label>Password</label>
                    <small />
                  </div>
                  <input type="submit" defaultValue="Sign Up" className={style["sign-btn"]} />
                  <p className={style["text"]}>
                    By signing up, I agree to the
                    <a href="#">Terms of Services</a> and
                    <a href="#">Privacy Policy</a>
                  </p>
                </div>
              </form>
              {/*--------------------- Forget Password Form-----------------------*/}
              <form className={style["sign-up-form"]} id="forgForm">
                <div className={style["logo logo__forg"]}>
                  <img src={Logo} alt="" />
                </div>
                <div className={style["heading heading__forg"]}>
                  <h2>Welcome Back</h2>
                </div>
                <div className={style["input-wrap"]}>
                  <input type="password" className={style["input-field"]} id="new__pass" />
                  <label>Password</label>
                  <small />
                </div>
                <div className="input-wrap">
                  <input type="password" className={style["input-field"]} id="confirm__pass" />
                  <label>Confirm Password</label>
                  <small />
                </div>
                <input type="submit" defaultValue="Reset Password" className={style["sign-btn"]} />
              </form>
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
  
  export default Login;
  
