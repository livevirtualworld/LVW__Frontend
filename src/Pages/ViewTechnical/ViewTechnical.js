import React, { useState, useEffect } from 'react'
import style from './ViewTechnical.module.css'
import Vector from '../../assets/Vector.svg'
import Vector1 from '../../assets/Vector (1).svg'
import logo from '../../assets/logo.png'
import United_Kingdom from '../../assets/United Kingdom (GB).png'
import egypt from "../../assets/Egypt (EG).png"
import egypt1 from "../../assets/Egypt (EG) (1).png"
import frame27 from "../../assets/Frame 27.png"
import image1 from "../../assets/01.png"
import rounded from "../../assets/Line Rounded.png"
import Italy from '../../assets/italy.png'
import group66 from "../../assets/Group 39466.svg"
import logo1 from "../../assets/logo (1).png"
import facebook from "../../assets/Facebook.svg"
import twitter from "../../assets/Twitter.svg"
import youtube from "../../assets/YouTube.svg"
import linked from "../../assets/LinkedIn.svg"
import instagram from "../../assets/Instagram.svg"
import frame97 from '../../assets/Frame 39497.png'
import frame98 from '../../assets/Frame 39498.png'
import axios from 'axios';
import Navbar from '../Navbar/Navbar'
import Card from '../Card/Card';
import { useParams } from 'react-router-dom';
import TechnicalCard from '../Card/TechnicalCard'




function ViewTechnical() {
    const { id, role } = useParams(); // Access the 'id' from the route parameters
    const strId = id.toString()
    const [technicalData, setTechnicalData] = useState(null); // State to store the retrieved data
    const [loading, setLoading] = useState(true); // State to manage loading status

    const [tap, setTap] = useState("about")

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options).replace(/,/g, '');
        const parts = formattedDate.split(' ');
        return `${parts[1]} ${parts[0]}, ${parts[2]}`;
    };

    const fullStars = Math.floor(technicalData?.avgRate || 0);
    const hasHalfStar = (technicalData?.avgRate || 0) - fullStars >= 0.5;

    // Generate an array of stars based on the calculated values
    const starIcons = Array.from({ length: 5 }, (_, index) => {
        if (index < fullStars) {
            return <i key={index} className="fa-solid fa-star" style={{ color: '#fe2629' }} />;
        } else if (hasHalfStar && index === fullStars) {
            return <i key={index} className="fa-solid fa-star-half" style={{ color: '#fe2629' }} />;
        } else {
            return <i key={index} className="fa-regular fa-star" style={{ color: '#fe2629' }} />;
        }
    });

    useEffect(() => {
        if (role === "tourGuide") {
            axios.post("http://localhost:5000/technical/getOneTourGuide", { id: id.toString() }) // You can adjust the API endpoint as needed
                .then((response) => {
                    if (response.data.success) {
                        // Data was successfully retrieved
                        setTechnicalData(response.data.data);
                    } else {
                        // Data was not found or there was an error
                        console.error(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error('An error occurred while fetching data:', error);
                })
                .finally(() => {
                    // Update the loading state when the request is complete
                    setLoading(false);
                });
        }
        else if (role === "cameraOperator") {
            axios.post("http://localhost:5000/technical/getOneCameraOperator", { id: id.toString() }) // You can adjust the API endpoint as needed
                .then((response) => {
                    if (response.data.success) {
                        // Data was successfully retrieved
                        setTechnicalData(response.data.data);
                    } else {
                        // Data was not found or there was an error
                        console.error(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error('An error occurred while fetching data:', error);
                })
                .finally(() => {
                    // Update the loading state when the request is complete
                    setLoading(false);
                });
        }
        else if (role === "director") {
            axios.post("http://localhost:5000/technical/getOneDirector", { id: id.toString() }) // You can adjust the API endpoint as needed
                .then((response) => {
                    if (response.data.success) {
                        // Data was successfully retrieved
                        setTechnicalData(response.data.data);
                    } else {
                        // Data was not found or there was an error
                        console.error(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error('An error occurred while fetching data:', error);
                })
                .finally(() => {
                    // Update the loading state when the request is complete
                    setLoading(false);
                });
        }
    }, [id, role]);
    let x = []
    for (let i = 0; i < technicalData?.company?.length; i++) {
        x.push([technicalData?.position[i], technicalData?.company[i], technicalData?.startDate[i], technicalData?.endDate[i]])
    }
    const hasAllInformation = technicalData?.faculty && technicalData?.university && technicalData?.startYear && technicalData?.graduateYear;

    return (
        <div>
            <Navbar />
            <div className={style["path"]}>
                <div className={style["container"]}>
                    <div className={style["path__content"]}>
                        <h3>Home</h3>
                        <img src={Vector1} alt='' />
                        <h3>Users</h3>
                        <img src={Vector1} alt='' />
                        <h3>{technicalData?.name}</h3>
                    </div>
                </div>
            </div>
            <div className={style["profile"]}>
                <div className={style["container"]}>
                    <div className={style["profile__content"]}>
                        <img src={`http://localhost:5000/${technicalData?.coverImg}`} alt='' />
                    </div>
                    <div className={style["profile__info"]}>
                        <img className={style['profile__info__image']} src={`http://localhost:5000/${technicalData?.img}`} alt='' />            <div className={style["profile__text"]}>
                            <div>
                                <h3>{technicalData?.name}</h3>
                                {role === 'tourGuide' && <h4>Tour Guide</h4>}
                                {role === 'cameraOperator' && <h4>Camera Operator</h4>}
                                {role === 'director' && <h4>Director</h4>}
                            </div>
                            <div className={style['technical__rate']}>
                            <div className={style["stars"]}>
                                {starIcons}
                            </div>
                                <h5>({(technicalData?.avgRate?.toFixed(1))})</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style["profile-main-content"]}>
                <div className={style["container"]}>
                    <div className={style["profile-main-content__content"]}>
                        <div className={style["profile-main-content__info"]}>
                            <div className={style["tabs"]}>
                                <a className={` ${tap === "about" ? style.active : ""}`} onClick={() => {
                                    setTap("about")
                                }}>About</a>
                                <a className={` ${tap === "tours" ? style.active : ""}`} onClick={() => {
                                    setTap("tours")
                                }}>{technicalData?.name}’s Tours</a>
                            </div>
                            <div className={style["text"]} id="text" style={{ display: tap == "tours" && 'flex', flexWrap: 'wrap' }}>
                                {
                                    tap === "about" &&
                                    <>
                                        <h4>Description</h4>
                                        {technicalData?.description ? (
                                            <p>{technicalData.description}</p>
                                        ) : (
                                            <p style={{ margin: "10px 0" }}>You don't have description yet!</p>
                                        )}
                                        <h4>Education</h4>
                                        {!hasAllInformation ? (
                                            <p style={{ margin: "10px 0" }}>You don't have Education Data yet!</p>
                                        ) : (
                                            <div>
                                                <h5>{technicalData?.university}</h5>
                                                <p>{technicalData?.faculty}</p>
                                                <p>({technicalData?.startYear} - {technicalData?.graduateYear})</p>
                                            </div>
                                        )}

                                        <h4>Experiences</h4>
                                        <div style={{ position: 'relative' }}>
                                            {
                                                x.length > 0 ?

                                                    x.map((item, index) => (
                                                        <div key={index} style={{ marginBottom: '20px' }}>
                                                            <h5>{item[0]}</h5>
                                                            <p>{item[1]}</p>
                                                            <p>({item[2]} - {item[3]})</p>
                                                        </div>
                                                    )) :
                                                    (
                                                        <p style={{ margin: "10px 0" }}>You don't have Experience Data yet!</p>
                                                    )
                                            }
                                        </div>
                                        {/* <h5>Virtual Tour Guide</h5>
                    <p>Wanderlust Tours</p>
                    <p>(2018 - Now)</p>
                    <h5>Tour Guide</h5>
                    <p>City Explorers Company</p>
                    <p>(2016 - 2018)</p> */}
                                    </>
                                }
                                {
                                    tap == "tours" &&
                                    <>
                                        {technicalData && technicalData?.tours.length > 0 ? (
                                            technicalData?.tours.map((item) => {
                                                return <TechnicalCard key={item._id} data={item} />
                                            })
                                        ) : (
                                            <p style={{ margin: "10px 0" }}>You don't have any tour yet!</p>
                                        )}
                                    </>
                                }
                            </div>
                        </div>
                        <div className={style["languages"]}>
                            <h3>Languages</h3>
                            <div className={style["langs"]}>
                                {technicalData?.languages?.length === 3 && (
                                    <div className={style["langs"]}>
                                        {technicalData?.languages.map((language) => (
                                            <a href="#" key={language}>
                                                {language === 'english' && <img src={rounded} alt='' />}
                                                {language === 'arabic' && <img src={egypt1} alt='' />}
                                                {language === 'italian' && <img src={Italy} alt='' />}
                                                {language.charAt(0).toUpperCase() + language.slice(1)}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <h3>Address</h3>
                            <a href="#">
                                <img src={group66} alt='' />
                                {technicalData?.city}, {technicalData?.address}
                            </a>
                            <p>Joined since {formatDate(technicalData?.joinedAt)}</p>
                        </div>

                    </div>
                </div>
            </div>
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
        </div>
    )
}

export default ViewTechnical
