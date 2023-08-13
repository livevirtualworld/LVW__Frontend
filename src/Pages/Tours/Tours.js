import React, { useState, useEffect } from 'react'
import $ from 'jquery';
import style from './Tours.module.css'
import Vector from '../../assets/Vector.svg'
import Vector1 from '../../assets/Vector (1).svg'
import logo from '../../assets/logo.png'
import United_Kingdom from '../../assets/United Kingdom (GB).png'
import egypt from "../../assets/Egypt (EG).png"
import Map from '../../assets/Map.png'
import SearchMap from '../../assets/Search.png'
import LocationOne from '../../assets/Doc.svg'
import LocationTwo from '../../assets/Doctor.svg'
import BtnOne from '../../assets/btn.svg'
import BtnTwo from '../../assets/btn (1).svg'
import BtnThree from '../../assets/btn (2).svg'
import Chat from '../../assets/chat.svg'
import TourCardImage from '../../assets/image3.png'
import logo1 from "../../assets/logo (1).png"
import facebook from "../../assets/Facebook.svg"
import twitter from "../../assets/Twitter.svg"
import youtube from "../../assets/YouTube.svg"
import linked from "../../assets/LinkedIn.svg"
import instagram from "../../assets/Instagram.svg"
import frame97 from '../../assets/Frame 39497.png'
import frame98 from '../../assets/Frame 39498.png'
import axios from 'axios';
import Card  from '../Card/Card';
function Tours() {
    const [tours,setTours] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // You can adjust the number of items per page
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentTours = tours?.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(tours?.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
  const [menu,setMenu] = useState(false)
    const [lang, setLang] = useState("english")
    const handleFirstClick = () => {
        if ($('.second').hasClass('on') && $('.tumbler').hasClass('on')) {
            $('.second').removeClass('on');
            $('.tumbler').removeClass('on');
            $('.first').addClass('on');
        }
        return false;
    };

    const handleSecondClick = () => {
        if ($('.first').hasClass('on')) {
            $('.first').removeClass('on');
            $('.second').addClass('on');
            $('.tumbler').addClass('on');
        }
        return false;
    };

    const handleTumblerClick = () => {
        if ($('.tumbler').hasClass('on') && $('.second').hasClass('on')) {
            $('.tumbler').removeClass('on');
            $('.second').removeClass('on');
            $('.first').addClass('on');
        } else {
            $('.tumbler').addClass('on');
            $('.first').removeClass('on');
            $('.second').addClass('on');
        }
        return false;
    };

    useEffect(() => {
        $('.first').click(handleFirstClick);
        $('.second').click(handleSecondClick);
        $('.tumbler').click(handleTumblerClick);
        axios.get("http://localhost:5000/admin//allTours").then((res)=>{
            console.log(res.data.data)
            setTours(res.data.data)
        })
    }, []);

    return (
        <>
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
                        <img src={Vector1} alt='' />
                        <h3>Tours</h3>
                    </div>
                </div>
            </div>

            <section className={style["search__bar__section"]}>
                <div className={style["container"]}>
                    <div className={style["search__bar__bk"]}>
                        <div className={style["search__bar__items"]}>
                            <button className={style["search__bar__btn"]}>
                                <div className={style["btn__info"]}>
                                    <span>Location</span>
                                    <i className="fa-solid fa-location-dot " id={style["myicon"]} style={{ color: '#060c13', fontSize: '20px' }} />
                                </div>
                                <ul className={style["location__dropdown"]}>
                                    <li className={style["active"]}><a href="#">Italy</a></li>
                                    <li><a href="#">Egypt</a></li>
                                    <li><a href="#">France</a></li>
                                </ul>
                            </button>
                            <button className={style["topic__btn"]}>
                                <div className={style["btn__info"]}>
                                    <span>Location</span>
                                    <i className="fa-solid fa-location-dot " id={style["myicon"]} style={{ color: '#060c13', fontSize: '20px' }} />
                                </div>
                                <ul className={style["topic__dropdown"]}>
                                    <li className={style["active"]}><a href="#">Education</a></li>
                                    <li><a href="#">Tourism</a></li>
                                    <li><a href="#">Health</a></li>
                                </ul>
                            </button>
                            <button className={style["search__bar__btn"]}>
                                <div className={style["btn__info"]}>
                                    <span>Location</span>
                                    <i className="fa-solid fa-location-dot " id={style["myicon"]} style={{ color: '#060c13', fontSize: '20px' }} />
                                </div>
                                <ul className={style["language__dropdown"]}>
                                    <li className={style["active"]}><a href="#">Italian</a></li>
                                    <li><a href="#">Arabic</a></li>
                                    <li><a href="#">English</a></li>
                                </ul>
                            </button>
                            <div className={style["live__now__search"]}>
                                <a  className={style["tumbler"]}>.</a>
                                <a  className={style["second"]}>Live Now Only</a>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={style["tours__map__section"]}>
                <div className={style["container"]}>
                    <h2>Map View</h2>
                    <div className={style["tours__map__img"]}>
                        <img src={Map} alt="" />
                    </div>
                    <div className={style["tours__map__search__bar"]}>
                        <img src={SearchMap} alt="" className={style["tours__map__search__icon"]} />
                        <input className={style["search"]} type="search" placeholder="Location..." />
                    </div>
                    <img src={LocationOne} alt="" className={style["tours__location__one"]} />
                    <img src={LocationTwo} alt="" className={style["tours__location__two"]} />
                    <div className={style["tours__map__bottom__icons"]}>
                        <img src={BtnOne} alt="" className={style["tours__cursor__pointer__icon"]} />
                        <img src={BtnTwo} alt="" className={style["tours__cursor__pointer__icon"]} />
                        <img src={BtnThree} alt="" className={style["tours__cursor__pointer__icon"]} />
                    </div>
                    <div className={style["tours__chat__icon"]}>
                        <img src={Chat} alt="" />
                    </div>
                </div>
            </section>

            <section className={style["list__view__section"]}>
                <div className={style["container"]}>
                    <h2>List View</h2>
                    <div className={style["list__view__cards"]}>
                        {currentTours?.map((item)=>{
                            return <Card key={item._id} data={item} />
                        })}
                        
                    </div>
                     {/* Pagination */}
                     <div className={style["pagination"]}>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={currentPage === index + 1 ? style["active"] : ""}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    
                </div>
            </section>

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
        </>
    );
}

export default Tours;