import React, { useState } from 'react'
import style from './userProfile.module.css'
import Vector from '../../assets/Vector.svg'
import Vector1 from '../../assets/Vector (1).svg'
import logo from '../../assets/logo.png'
import United_Kingdom from '../../assets/United Kingdom (GB).png'
import egypt from "../../assets/Egypt (EG).png"
import egypt1 from "../../assets/Egypt (EG) (1).png"
import frame27 from "../../assets/Frame 27.png"
import image1 from "../../assets/01.png"
import rounded from "../../assets/Line Rounded.png"
import group66 from "../../assets/Group 39466.svg"
import logo1 from "../../assets/logo (1).png"
import facebook from "../../assets/Facebook.svg"
import twitter from "../../assets/Twitter.svg"
import youtube from "../../assets/YouTube.svg"
import linked from "../../assets/LinkedIn.svg"
import instagram from "../../assets/Instagram.svg"
import frame97 from '../../assets/Frame 39497.png'
import frame98 from '../../assets/Frame 39498.png'
function UserProfile() {
  const [lang , setLang] = useState("english")
  const [tap , setTap] = useState("about")
  const [menu,setMenu] = useState(false)
  return (
    <div>
        <nav>
          <div className={style["container"]}>
            <div className={style["nav__content"]}>
              <div className={style["nav__right"]}>
                <div className={style["nav__logo"]}>
                  <img src={logo} alt="logo" />
                </div>
                <div className={style["nav__search"]}>
                  <input type="text" placeholder="Tour name or location..." />
                </div>
                <ul className={style["nav__links"]}>
                  <li><a>Home</a></li>
                  <li className={style["active"]}><a>Tours <img src={Vector} alt='' /></a>
                  </li>
                  <li><a href="#">Our Mission</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </div>
              <div className={style["menu"]}>
              <i onClick={()=>{
                if(menu ==false){
                setMenu(true)
                console.log(true)
                }
                else{
                  setMenu(false)
                  console.log(false)
                }

              }} className="fas fa-bars" />
              {
                menu == true &&
                <div className={style["drobdown"]}>
                  <ul className={style["nav__link"]} id="drobDown">
                    <li><a href="#">Home</a></li>
                    <li className={style["active"]}><a>Tours <img src={Vector} alt='' /></a>
                    </li>
                    <li><a href="#">Our Mission</a></li>
                    <li><a href="#">Contact Us</a></li>
                  </ul>
                </div>
              }
              </div>
              <div className={style["nav__left"]}> 
                <div className={style["nav__langs"]}>
                  {
                    lang =="english" &&
                  <a><img src={United_Kingdom} alt=''/> English</a>
                  }
                  {
                    lang =="arabic" &&
                    <a href="#"><img src={egypt} alt=''/> العربية</a>
                  }
                  {
                    lang =="italiano" &&
                    <a href="#"><img src={United_Kingdom} alt=''/> Italiano</a>
                  }
                  <ul>
                    <li onClick={()=>{
                      setLang("english")
                    }}><a href="#"><img src={United_Kingdom} alt=''/> English</a></li>
                    <li onClick={()=>{
                      setLang("arabic")
                    }}><a href="#"><img src={egypt} alt=''/> العربية</a></li>
                    <li onClick={()=>{
                      setLang("italiano")
                    }}><a href="#"><img src={United_Kingdom} alt=''/> Italiano</a></li>
                  </ul>
                </div>
                <div className={style["nav__join"]}>
                  <a href="#">Join Us Now</a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className={style["path"]}>
          <div className={style["container"]}>
            <div className={style["path__content"]}>
              <h3>Home</h3>
              <img src={Vector1} alt=''/>
              <h3>Users</h3>
              <img src={Vector1} alt='' />
              <h3>Sophie Smith</h3>
            </div>
          </div>
        </div>
        <div className={style["profile"]}>
          <div className={style["container"]}>
            <div className={style["profile__content"]}>
              <img src={frame27} alt=''/>
            </div>
            <div className={style["profile__info"]}>
              <img src={image1} alt='' />
              <div className={style["profile__text"]}>
                <h3>Sophie Smith</h3>
                <h4>Tour Guide</h4>
              </div>
            </div>
          </div>
        </div>
        <div className={style["profile-main-content"]}>
          <div className={style["container"]}>
            <div className={style["profile-main-content__content"]}>
              <div className={style["profile-main-content__info"]}>
                <div className={style["tabs"]}>
                    <a className={` ${tap === "about" ? style.active : ""}`} onClick={()=>{
                      setTap("about")
                    }}>About</a>
                    <a className={` ${tap === "tours" ? style.active : ""}`} onClick={()=>{
                      setTap("tours")
                    }}>Sophie’s Tours</a>
                </div>
                <div className={style["text"]} id="text">
                  {
                    tap === "about" &&
                    <>
                  <p>Hi, I'm Sophie, a passionate virtual tour guide with extensive experience in providing immersive and engaging virtual tours. </p>
                  <p>Originally from the UK I moved out to Egypt 24yrs ago falling in love with the history and the culture I have never looked back!</p>
                  <p>I have a deep love for history, culture, and travel, and I enjoy sharing my knowledge with people from all around the world. My goal is to transport you to fascinating destinations and make you feel like you're right there, experiencing the sights, sounds, and stories.</p>
                  <h4>Education</h4>
                  <h5>Bachelor's Degree in History</h5>
                  <p>XYZ University, New York </p>
                  <p>(2011 - 2015)</p>
                  <h4>Experiences</h4>
                  <h5>Virtual Tour Guide</h5>
                  <p>Wanderlust Tours</p>
                  <p>(2018 - Now)</p>
                  <h5>Tour Guide</h5>
                  <p>City Explorers Company</p>
                  <p>(2016 - 2018)</p>
                  </>
                  }
                  {
                    tap == "tours" &&
                    <>
                    <p>Hi, I'm Sophie, a passionate virtual tour guide with extensive experience in providing immersive and engaging virtual tours. </p>
                  <p>Originally from the UK I moved out to Egypt 24yrs ago falling in love with the history and the culture I have never looked back!</p>
                  <p>I have a deep love for history, culture, and travel, and I enjoy sharing my knowledge with people from all around the world. My goal is to transport you to fascinating destinations and make you feel like you're right there, experiencing the sights, sounds, and stories.</p>
                  <h4>Education</h4>
                  <h5>Bachelor's Degree in History</h5>
                  <p>XYZ University, New York </p>
                  <p>(2011 - 2015)</p>
                  <h4>Experiences</h4>
                  <h5>Virtual Tour Guide</h5>
                  <p>Wanderlust Tours</p>
                  <p>(2018 - Now)</p>
                  <h5>Tour Guide</h5>
                  <p>City Explorers Company</p>
                  <p>(2016 - 20222222222222222222222222)</p>
                  </>
                  }
                </div>
              </div>
              <div className={style["languages"]}>
                <h3>Languages</h3>
                <div className={style["langs"]}>
                  <a href="#"><img src={rounded} alt='' /> English</a>
                  <a href="#"><img src={egypt1} alt='' /> Arabic</a>
                </div>
                <h3>Address</h3>
                <a href="#"><img src={group66} alt='' /> Cairo, Egypt</a>
                <p>Joined since 14 Nov 2022</p>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div className={style["container"]}>
            <div  className={style["footer__content"]}>
              <ul>
                <li><img src={logo1} alt='' /></li>
                <li>Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam mauris sed ma</li>
                <li className={style["links"]}>
                  <a href="#"><img src={facebook} alt='' /></a>
                  <a href="#"><img src={twitter} alt='' /></a>
                  <a href="#"><img src={instagram} alt='' /></a>
                  <a href="#"><img src={linked} alt='' /></a>
                  <a href="#"><img src={youtube} alt='' /></a>
                </li>
              </ul>
              <ul>
                <li>Website</li>
                <li>Tours</li>
                <li>Pricing</li>
                <li>Our Mission</li>
                <li>Contact Us</li>
              </ul>
              <ul>
                <li>Company</li>
                <li>About</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
              <ul>
                <li>Support</li>
                <li>Getting started</li>
                <li>Help center</li>
                <li>Report a bug</li>
                <li>Chat support</li>
              </ul>
              <ul>
                <li>Downloads</li>
                <li><img src={frame97} alt=''/></li>
                <li><img src={frame98} alt='' /></li>
              </ul>
            </div>
            <div className={style["footer__footer"]}>
              <h4>Copyright © 2023 LVW.</h4>
            </div>
          </div>
        </footer>
      </div>
  )
}

export default UserProfile
