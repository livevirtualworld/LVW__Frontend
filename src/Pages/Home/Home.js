import React, { useState, useEffect, useRef } from 'react'
import style from './Home.module.css'
import Vector from '../../assets/Vector.svg'
import Vector1 from '../../assets/Vector (1).svg'
import logo from '../../assets/logo.png'
import United_Kingdom from '../../assets/United Kingdom (GB).png'
import egypt from "../../assets/Egypt (EG).png"
import video from "../../assets/video.png"
import chatBox from "../../assets/Frame 39479.png"
import chatIcon from "../../assets/chat.svg"
import Map from "../../assets/Map.png"
import Search from "../../assets/Search.png"
import LocationOne from "../../assets/Doctor.svg"
import LocationTwo from "../../assets/Doctor.svg"
import LocationThree from "../../assets/Doctor.svg"
import BtnOne from '../../assets/btn.svg'
import BtnTwo from '../../assets/btn (1).svg'
import BtnThree from '../../assets/btn (2).svg'
import CardImg from "../../assets/image3.png"
import CardImg2 from "../../assets/image4.png"
import Education from "../../assets/image 5.png"
import Shopping from "../../assets/image 6.png"
import Tourism from "../../assets/image 7.png"
import VectorEmail from "../../assets/vector1.svg"
import VectorEmail2 from "../../assets/vector2.svg"
import logo1 from "../../assets/logo (1).png"
import facebook from "../../assets/Facebook.svg"
import twitter from "../../assets/Twitter.svg"
import youtube from "../../assets/YouTube.svg"
import linked from "../../assets/LinkedIn.svg"
import instagram from "../../assets/Instagram.svg"
import frame97 from '../../assets/Frame 39497.png'
import frame98 from '../../assets/Frame 39498.png'
import ChatBot from '../../assets/girl.png'
import SendIcon from "../../assets/live/Send.svg"


import Swiper from 'swiper';

function Home() {
    const [menu, setMenu] = useState(false)
    const [lang, setLang] = useState("english")
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const swiperContainer = useRef(null);


    useEffect(() => {
        window.addEventListener('DOMContentLoaded', (event) => {

            const swiper = new Swiper(swiperContainer.current, {
                slidesPerView: 4,
                // spaceBetween: 0,
                loop: false,
                centerSlide: 'true',
                fade: 'true',
                grabCursor: 'true',
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    dynamicBullets: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },

                breakpoints: {
                    1200: {

                        slidesPerView: 3,
                    },
                    992: {
                        slidesPerView: 2,
                    },
                    0: {
                        slidesPerView: 0,
                    },
                },
            });
            return () => {
                swiper.destroy(); // Cleanup Swiper instance when component unmounts
            };
        });
    }, []);

    return (
        <>

            {/*------------------------Navbar Section-----------------------*/}

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
                            <i onClick={() => {
                                if (menu == false) {
                                    setMenu(true)
                                    console.log(true)
                                }
                                else {
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
                                    lang == "english" &&
                                    <a><img src={United_Kingdom} alt='' /> English</a>
                                }
                                {
                                    lang == "arabic" &&
                                    <a href="#"><img src={egypt} alt='' /> العربية</a>
                                }
                                {
                                    lang == "italiano" &&
                                    <a href="#"><img src={United_Kingdom} alt='' /> Italiano</a>
                                }
                                <ul>
                                    <li onClick={() => {
                                        setLang("english")
                                    }}><a href="#"><img src={United_Kingdom} alt='' /> English</a></li>
                                    <li onClick={() => {
                                        setLang("arabic")
                                    }}><a href="#"><img src={egypt} alt='' /> العربية</a></li>
                                    <li onClick={() => {
                                        setLang("italiano")
                                    }}><a href="#"><img src={United_Kingdom} alt='' /> Italiano</a></li>
                                </ul>
                            </div>
                            <div className={style["nav__join"]}>
                                <a href="#">Join Us Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/*------------------------Hero Banner Section------------------*/}
            <section className={style["hero__banner__section"]}>
                <img src="./assets/images/bg.png" alt="" className={style["header__background__img"]} />
                <div className={style["container"]}>
                    <div className={style["hero__banner__content"]}>
                        <div className={style["hero__banner__text"]}>
                            <h1><span className={style["explore"]}>Explore</span> <span className={style["world"]}>The World Right From</span> <span className={style["couch"]}>Your Couch</span></h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit
                                nullam neque ultrices.</p>
                            <div className={style["hero__banner__buttons"]}>
                                <button className={style["find__tour__btn"]}>Find A Tour</button>
                                <button className={style["join__us__btn"]}>Work With Us</button>
                            </div>
                        </div>
                        <div className={style["hero__banner__video"]}>
                            <figure>
                                <img src={video} alt="" />
                            </figure>
                        </div>
                    </div>
                    <div className={style["chat__preview"]} id="chatPreview" style={{ display: isChatOpen ? "block" : "none" }}>
                        <div className={style["chat__box"]}>
                            <div className={style["chat__header"]}>
                                <div className={style["header__content"]}>
                                    <div className={style["header__name__img"]}>
                                        <img src={ChatBot} alt="" />
                                        <div className={style["chat__bot__name"]}>
                                            <h3>Amanda Jack</h3>
                                            <h5>LVW Team</h5>
                                        </div>
                                    </div>
                                    <i className={style["fa-solid fa-xmark"]} style={{ color: '#000000' }} />
                                </div>
                            </div>
                            <div className={style["chat__body"]}>
                                <div className={style["start__left__side"]}>
                                    <p>Welcome to LVW</p>
                                </div>
                                <div className={style["start__left__side"]}>
                                    <p>Can you tell me where you want to go?</p>
                                </div>
                                <div className={style["right__side"]}>
                                    <p>I want to go to France</p>
                                </div>
                            </div>
                            <div className={style["write__message__box"]}>
                                <textarea placeholder="Write your message..." rows={5} cols={10} defaultValue={""} />
                                <img src={SendIcon} alt="" className={style["send__icon"]} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*------------------------Counter Section-----------------------*/}
            <section className={style["counter__section"]}>
                <div className={style["container"]}>
                    <div className={style["counter__content"]}>
                        <div className={style["counter__content__box"]}>
                            <h2>32K<span>+</span></h2>
                            <p>Virtual Travelers</p>
                        </div>
                        <div className={style["counter__content__box"]}>
                            <h2>87K<span>+</span></h2>
                            <p>Public Tour</p>
                        </div>
                        <div className={style["counter__content__box"]}>
                            <h2>125K<span>+</span></h2>
                            <p>Private Tour</p>
                        </div>
                    </div>
                    <div className={style["chat__icon"]} id="chatIcon" >
                        <img src={chatIcon} alt="" onClick={toggleChat} />
                    </div>
                </div>
            </section>

            {/*------------------------Map Section---------------------------*/}
            <section className={style["map__section"]}>
                <div className={style["container"]}>
                    <h2>Find your tour on the map</h2>
                    <div className={style["map__img"]}>
                        <img src={Map} alt="" />
                    </div>
                    <div className={style["map__search__bar"]}>
                        <img src={Search} alt="" className={style["map__search__icon"]} />
                        <input className={style["search"]} type="search" placeholder="Location..." />
                    </div>
                    <img src={LocationOne} alt="" className={style["location__one"]} />
                    <img src={LocationTwo} alt="" className={style["location__two"]} />
                    <img src={LocationThree} alt="" className={style["location__three"]} />
                    <div className={style["map__bottom__icons"]}>
                        <img src={BtnOne} alt="" className={style["cursor__pointer__icon"]} />
                        <img src={BtnTwo} alt="" className={style["cursor__pointer__icon"]} />
                        <img src={BtnThree} alt="" className={style["cursor__pointer__icon"]} />
                    </div>
                </div>
            </section>

            {/*------------------------Live Tours Section--------------------*/}
            {/* <section className={style["live__tours__section"]}>
                <div className={style["container"]}>
                    <h2>Live tours to join now</h2>
                    <div ref={swiperContainer} className="swiper-container slide-container">
                        <div className="slide-content">
                            <div className="swiper-wrapper card-wrapper">

                                <div className="swiper-slide card">
                                    <div className={style["trip__image__buttons"]}>
                                        <img src={CardImg} alt="" className={style["card-img"]} />
                                        <span>FREE</span>
                                        <div className={style["card__buttons"]}>
                                            <button className={style["public__btn"]}>Public</button>
                                            <button className={style["live__now__btn"]}>Live Now</button>
                                        </div>
                                    </div>
                                    <div className={style["card__content"]}>
                                        <div className={style["card__rate"]}>
                                            <div className={style["card__rate__icons"]}>
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                            </div>
                                            <span>(5.0)</span>
                                        </div>
                                        <h4>Discovering the Mysteries of the Pyramid of Giza Tour</h4>
                                        <p>Cairo, Egypt
                                        </p></div>
                                </div>

                                <div className="swiper-slide card">
                                    <div className={style["trip__image__buttons"]}>
                                        <img src={CardImg} alt="" className={style["card-img"]} />
                                        <span>FREE</span>
                                        <div className={style["card__buttons"]}>
                                            <button className={style["public__btn"]}>Public</button>
                                            <button className={style["live__now__btn"]}>Live Now</button>
                                        </div>
                                    </div>
                                    <div className={style["card__content"]}>
                                        <div className={style["card__rate"]}>
                                            <div className={style["card__rate__icons"]}>
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                            </div>
                                            <span>(5.0)</span>
                                        </div>
                                        <h4>Discovering the Mysteries of the Pyramid of Giza Tour</h4>
                                        <p>Cairo, Egypt
                                        </p></div>
                                </div>

                                <div className="swiper-slide card">
                                    <div className={style["trip__image__buttons"]}>
                                        <img src={CardImg} alt="" className={style["card-img"]} />
                                        <span>FREE</span>
                                        <div className={style["card__buttons"]}>
                                            <button className={style["public__btn"]}>Public</button>
                                            <button className={style["live__now__btn"]}>Live Now</button>
                                        </div>
                                    </div>
                                    <div className={style["card__content"]}>
                                        <div className={style["card__rate"]}>
                                            <div className={style["card__rate__icons"]}>
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                            </div>
                                            <span>(5.0)</span>
                                        </div>
                                        <h4>Discovering the Mysteries of the Pyramid of Giza Tour</h4>
                                        <p>Cairo, Egypt
                                        </p></div>
                                </div>

                            </div>
                        </div>
                        <div className="swiper-button-next swiper-navBtn" />
                        <div className="swiper-button-prev swiper-navBtn" />
                    </div>
                </div>
            </section> */}

            {/*------------------------Popular Tours Section-----------------*/}
            {/* <section className={style["popular__tour__section"]}>
                <div className={style["container"]}>
                    <h2>Popular tour to book</h2>
                    <div ref={swiperContainer} className="swiper-container slide-container">
                        <div className="slide-content">
                            <div className="swiper-wrapper card-wrapper">
                                <div className={style["card swiper-slide"]}>
                                    <div className={style["trip__image__buttons"]}>
                                        <img src={CardImg2} alt="" className={style["card-img"]} />
                                    </div>
                                    <div className={style["card__content"]}>
                                        <div className={style["card__rate"]}>
                                            <div className={style["card__rate__icons"]}>
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                                <i className={style["fa-solid fa-star"]} style={{ color: '#fe2629' }} />
                                            </div>
                                            <span>(5.0)</span>
                                        </div>
                                        <h4>Discovering the Mysteries of the Pyramid of Giza Tour</h4>
                                        <p>Cairo, Egypt</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-button-next swiper-navBtn" />
                        <div className="swiper-button-prev swiper-navBtn" />
                        <div className="swiper-pagination" />
                    </div>
                </div>
            </section > */}


            {/*------------------------Popular Topics Section-----------------*/}
            < section className={style["popular__topics__section"]} >
                <div className={style["container"]}>
                    <h2>Popular topics</h2>
                    <div className={style["popular__topics"]}>
                        <div className={style["popular__topics__item"]}>
                            <img src={Education} alt="" />
                            <h3 className={style["education__text"]}>Education</h3>
                        </div>
                        <div className={style["popular__topics__item"]}>
                            <img src={Shopping} alt="" />
                            <h3 className={style["shopping__text"]}>Shoping</h3>
                        </div>
                        <div className={style["popular__topics__item"]}>
                            <img src={Tourism} alt="" />
                            <h3 className={style["tourism__text"]}>Tourism</h3>
                        </div>
                    </div>
                </div>
            </section >

            {/*------------------------Travellers Reviews Section-------------*/}
            {/* <section className={style["travellers__reviews__section"]}>
        <div className={style["container"]}>
          <h2>What our travelers say</h2>
          <div ref={swiperContainer} className="swiper-container slide-container">
            <div className={style["slide-content"]}>
              <div className="card-wrapper swiper-wrapper">
                <div className={style["review__card swiper-slide"]}>
                  <div className={style["review__card"]}>
                    <h3>John Carter</h3>
                    <div className={style["review__card__rate"]}>
                      <div className={style["review__rate__icons"]}>
                        <i className={style["fa-solid fa-star"]} style={{color: '#fe2629'}} />
                        <i className={style["fa-solid fa-star"]} style={{color: '#fe2629'}} />
                        <i className={style["fa-solid fa-star"]} style={{color: '#fe2629'}} />
                        <i className={style["fa-solid fa-star"]} style={{color: '#fe2629'}} />
                        <i className={style["fa-solid fa-star"]} style={{color: '#fe2629'}} />
                      </div>
                      <span>(5.0)</span>
                    </div>
                    <p>“Lorem ipsum dolor sit amet conse ctetur adipiscing lectus a nunc mauris scelerisque
                      sed egestas pharetraol quis pharetra arcu pharetra blandit.”</p>
                    <span className={style["review__date"]}>23 May 2023</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-button-next swiper-navBtn" />
            <div className="swiper-button-prev swiper-navBtn" />
            <div className="swiper-pagination" />
          </div>
        </div>
      </section> */}

            {/*------------------------Email Newsletter Section---------------*/}
            <section className={style["email__newsletter__section"]}>
                <div className={style["container"]}>
                    <div className={style["email__newsletter__content"]}>
                        <div className={style["email__newsletter__text"]}>
                            <h2>Join our email newsletter to keep updated about new tours</h2>
                            <div className={style["email__input__and__btn"]}>
                                <input type="email" placeholder="example@mail.com" className={style["email__input"]} />
                                <button className={style["subscribe__btn"]}>Subscribe</button>
                            </div>
                            <div className={style["icon__text__newsletter"]}>
                                <i className={style["bx bxs-check-circle"]} style={{ color: '#ffffff' }} />
                                <p>Join the 10,000 users in our newsletter</p>
                            </div>
                        </div>
                        <div className={style["newsletter__vectors"]}>
                            <img src={VectorEmail} alt="" className={style["left__vector"]} />
                            <img src={VectorEmail2} alt="" className={style["right__vector"]} />
                        </div>
                    </div>
                </div>
            </section>

            {/*------------------------Footer Section---------------*/}
            <footer>
                <div className={style["container"]}>
                    <div className={style["footer__content"]}>
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
                            <li><img src={frame97} alt='' /></li>
                            <li><img src={frame98} alt='' /></li>
                        </ul>
                    </div>
                    <div className={style["footer__footer"]}>
                        <h4>Copyright © 2023 LVW.</h4>
                    </div>
                </div>
            </footer>




        </>
    )
}

export default Home