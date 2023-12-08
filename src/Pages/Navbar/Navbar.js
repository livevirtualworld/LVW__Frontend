import React, { useState, useEffect, useRef } from 'react'
import style from './Navbar.module.css'
import { NavLink } from 'react-router-dom';
import Vector from '../../assets/Vector.svg'
import Vector1 from '../../assets/Vector (1).svg'
import logo from '../../assets/logo.png'
import United_Kingdom from '../../assets/United Kingdom (GB).png'
import egypt from "../../assets/Egypt (EG).png"
import Italy from "../../assets/italy.png"
import axios from 'axios';


function Navbar() {
    const [menu, setMenu] = useState(false)
    const [lang, setLang] = useState("english")
    const [personData, setPersonData] = useState("")
    const personId = JSON.parse(localStorage.getItem("id"));
    const personRole = localStorage.getItem("role")
    const userRole = localStorage.getItem("role")
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        if (userRole === "user") {
            axios.post("http://localhost:5000/user/getOneUser", { id: personId })
                .then((res) => {
                    setPersonData(res.data.data);
                })
                .catch((error) => {
                    console.error("Error fetching Director data:", error);
                });
        }
        else {

            if (JSON.parse(personRole) === "tourGuide") {
                axios.post("http://localhost:5000/technical/getOneTourGuide", { id: personId })
                    .then((res) => {
                        setPersonData(res.data.data);
                    })
                    .catch((error) => {
                        console.error("Error fetching Tour Guide data:", error);
                    });
            }
            if (JSON.parse(personRole) === "cameraOperator") {
                axios.post("http://localhost:5000/technical/getOneCameraOperator", { id: personId })
                    .then((res) => {
                        setPersonData(res.data.data);
                    })
                    .catch((error) => {
                        console.error("Error fetching Camera Operator data:", error);
                    });
            }
            if (JSON.parse(personRole) === "director") {
                axios.post("http://localhost:5000/technical/getOneDirector", { id: personId })
                    .then((res) => {
                        setPersonData(res.data.data);
                    })
                    .catch((error) => {
                        console.error("Error fetching Director data:", error);
                    });
            }
        }

    }, []);

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

    const handleLogout = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("id");

        // Redirect to the home page
        window.location.href = "/home";
    };

    function isActive(path) {
        return window.location.pathname === path ? style["active"] : "";
    }

    return (
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
                            <li className={isActive("/home")}><NavLink exact to="/home" activeClassName={style["active"]}>Home</NavLink></li>
                            <li className={isActive("/whatwedo")}><NavLink exact to="/whatwedo" activeClassName={style["active"]}>What We Do</NavLink></li>
                            <li className={isActive("/tours")}><NavLink to="/tours" activeClassName={style["active"]}>Tours</NavLink></li>
                            <li className={isActive("/whoweare")}><NavLink to="/whoweare" activeClassName={style["active"]}>Who We Are</NavLink></li>
                            <li className={isActive("/contactus")}><NavLink to="/contactus" activeClassName={style["active"]}>Contact Us</NavLink></li>
                        </ul>

                    </div>
                    <div className={style["menu"]}>
                        <i onClick={() => {
                            if (menu == false) {
                                setMenu(true)
                            }
                            else {
                                setMenu(false)
                            }

                        }} className="fas fa-bars" />
                        {
                            menu == true &&
                            <div className={style["drobdown"]}>
                                <ul className={style["nav__links"]}>
                                    <li className={isActive("/home")}><NavLink exact to="/home" activeClassName={style["active"]}>Home</NavLink></li>
                                    <li className={isActive("/tours")}><NavLink to="/tours" activeClassName={style["active"]}>Tours</NavLink></li>
                                    <li className={isActive("/our-mission")}><NavLink to="/our-mission" activeClassName={style["active"]}>Our Mission</NavLink></li>
                                    <li className={isActive("/contact-us")}><NavLink to="/contact-us" activeClassName={style["active"]}>Contact Us</NavLink></li>
                                </ul>
                            </div>
                        }
                    </div>
                    <div className={style["nav__left"]}>
                        {/* <div className={style["nav__langs"]}>
                            {
                                lang == "english" &&
                                <a style={{ color: 'black' }}><img src={United_Kingdom} alt='' /> English</a>
                            }
                            {
                                lang == "arabic" &&
                                <a href="#"><img src={egypt} alt='' /> العربية</a>
                            }
                            {
                                lang == "italiano" &&
                                <a href="#"><img src={Italy} alt='' /> Italiano</a>
                            }
                            <ul>
                                <li onClick={() => {
                                    setLang("arabic")
                                }}><a style={{ color: 'black', paddingTop: '5px', paddingRight: '14px', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} href="#"><img src={egypt} alt='' /> العربية</a></li>
                                <li onClick={() => {
                                    setLang("italiano")
                                }}><a style={{ color: 'black', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }} href="#"><img src={Italy} alt='' /> Italiano</a></li>
                            </ul>
                        </div> */}
                        <div className={style['nav__join']}>
                            {personData ? (
                                <div>
                                    <p className={style['nav__username']}>
                                        Welcome, {personData?.name}{' '}
                                        <img
                                            style={{ marginLeft: '3px', cursor: 'pointer' }}
                                            src={Vector}
                                            alt=""
                                            onClick={toggleUserMenu}
                                        />
                                    </p>
                                    {showUserMenu && (
                                        <div className={style['propro']}>
                                            <ul>
                                                {userRole === "user" ? (
                                                    <li>
                                                        <NavLink to="/userprofile" style={{ color: 'black' }}>
                                                            <i class="fa-solid fa-user" style={{ color: '000000', marginRight: '20px', fontSize: '20px' }}></i>Profile
                                                        </NavLink>
                                                    </li>
                                                ) : (<li>
                                                    <NavLink to="/technicalprofile" style={{ color: 'black' }}>
                                                        <i class="fa-solid fa-user" style={{ color: '000000', marginRight: '20px', fontSize: '20px' }}></i>Profile
                                                    </NavLink>
                                                </li>)}
                                                <li>
                                                    <a href="#" style={{ color: 'black' }}
                                                        onClick={handleLogout}
                                                    >
                                                        <i class="fa-solid fa-right-from-bracket" style={{ color: '000000', marginRight: '20px', fontSize: '20px' }}></i>Logout
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (

                                <NavLink to='/login'>Join Us Now</NavLink>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Navbar