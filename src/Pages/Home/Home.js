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
import Mapp from "../../assets/Map.png"
import Map from './Map'
import Search from "../../assets/Search.png"
import LocationOne from "../../assets/Doctor.svg"
import LocationTwo from "../../assets/Doctor.svg"
import LocationThree from "../../assets/Doctor.svg"
import BtnOne from '../../assets/btn.svg'
import BtnTwo from '../../assets/btn (1).svg'
import BtnThree from '../../assets/btn (2).svg'
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
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import LiveToursCard from './LiveToursCard'
import PopularToursCard from './PopularToursCards'
import ReviewCard from './ReviewCard'
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { Reviews } from '@mui/icons-material'
import Navbar from '../Navbar/Navbar'
import videoBG from '../../assets/intro.mp4'
import Footer from '../Footer/Footer'

const uri = process.env.REACT_APP_BACKEND


function Home() {
    const [menu, setMenu] = useState(false)
    const [lang, setLang] = useState("english")
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [tours, setTours] = useState([])
    const [filteredTours, setFilteredTours] = useState([])
    const [travelers, setTravelers] = useState(0)
    const [publicTours, setPublicTours] = useState(0)
    const [vip, setVip] = useState(0)
    const [popularTours, setPopularTours] = useState([])
    const [popularReviews, setPopularReviews] = useState([])
    const [liveTours, setLiveTours] = useState([])
    const [subscribe, setSubscribe] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);


    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    useEffect(() => {
        axios.get(`${uri}/admin/allTours`).then((res) => {
            if(res.data.status == 200){
                axios.get(`${uri}/user/getAllBooks`).then((result) => {
                    if(res.data.status == 200){
                        const groupedBokking = result.data.reduce((bookRes, obj) => {
                          const filteredGrouped = bookRes.find(tour => tour?.id === obj?.tour)
                          if (filteredGrouped) {
                            filteredGrouped.numberOfGuests += obj.numberOfGuests
                          } else {
                            bookRes.push({ id: obj?.tour, numberOfGuests: obj.numberOfGuests })
                          }
                          return bookRes;
                        }, []
                        )
                        const repeatedTours = groupedBokking.filter(obj => obj.numberOfGuests >= 5)
                        const newFilteredBooked = res.data.data.filter(obj => !repeatedTours.some(objTwo => obj._id === objTwo.id))
                        console.log(newFilteredBooked)
                        const filteredBooke = newFilteredBooked.filter((book) => new Date(book.endTime) > new Date());
                
                        setTours(filteredBooke)
                        setFilteredTours(filteredBooke)
                    }
                })
            }
    })
        axios.get(`${uri}/user/allTravelers`).then((res) => {
            if(res.data.status == 200){
                setTravelers(res.data.travelers)
            }
        })
        axios.get(`${uri}/user/public`).then((res) => {
            if(res.data.status == 200){
                setPublicTours(res.data.length)
            }
        })
        axios.get(`${uri}/user/vip`).then((res) => {
            if(res.data.status == 200){
                setVip(res.data.length)
            }
        })
        axios.get(`${uri}/user/popularTours`).then((res) => {
            if(res.data.status == 200){
                setPopularTours(res.data)
            }
        })
        axios.get(`${uri}/user/popularReviews`).then((res) => {
            if(res.data.status == 200){
                setPopularReviews(res.data)
            }
        })
        axios.get(`${uri}/user/liveTours`).then((res) => {
            if(res.data.status == 200){
                setLiveTours(res.data.data)
            }
        })
    }, []);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 576 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 576, min: 0 },
            items: 1
        }
    };

    function search(text) {
        console.log(text)
        const x = tours.filter((tour) => {
            console.log(tour.address)
            return tour.address.toLowerCase().includes(text.toLowerCase())
        })
        setFilteredTours(x)
    }

    function subscribeToNewsletter() {
        axios.post(`${uri}/subscribe`, {
            email: subscribe
        }).then((res) => {
            console.log(res.data)
            if (res.data.status === 200) {
                console.log("send successfully")
            }
            else if (res.data.status === 400) {
                console.log("Error")
            }
        })
    }

    return (
        <>

            {/*------------------------Navbar Section-----------------------*/}

            <Navbar />

            {/*------------------------Hero Banner Section------------------*/}
            <section className={style["hero__banner__section"]}>
                <video src={videoBG} autoPlay loop muted />
                <div className={style["container"]}>
                    <div className={style["hero__banner__content"]}>
                        <div className={style["hero__banner__text"]}>
                        <h1><span className={style["explore"]}>Live Virtual World</span><span className={style["world"]}>Every stream A journey</span><span className={style["couch"]}>Every experience A connection</span></h1>
                            {/* <h1><span className={style["explore"]}>Live Virtual World</span><span className={style["world"]}>A World Without</span><span className={style["couch"]}>Borders</span></h1> */}
                            {/* <h1><span className={style["explore"]}>Explore</span> <span className={style["world"]}>The World Right From</span> <span className={style["couch"]}>Your Couch</span></h1> */}
                            {/* <h1><span className={style["world"]}>Every stream, <span className={style['journey']}>A journey</span></span><span className={style["couch"]}>Every experience, <span className={style['journey']}>A connection</span></span></h1> */}
                            {/* <h1><span className={style["explore"]}>We're here to ensure</span> <span className={style["world"]}>every LIVE virtual</span> <span className={style["couch"]}>tour is a success!</span></h1> */}
                            {/* <p>Dive into the world with LVW.  We bring exclusive locations to the comfort of your home, allowing you to interact live with experts, professors, and individuals renowned for their arts and specialties.</p> */}
                            <div className={style["hero__banner__buttons"]}>
                                <NavLink to={"/tours"}><button className={style["find__tour__btn"]}>Find A Tour</button></NavLink>
                                <NavLink to={"/login"}><button className={style["join__us__btn"]}>Work With Us</button></NavLink>
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
                            <h2>{travelers}<span>+</span></h2>
                            <p>Virtual Travelers</p>
                        </div>
                        <div className={style["counter__content__box"]}>
                            <h2>{publicTours}<span>+</span></h2>
                            <p>Public Tour</p>
                        </div>
                        <div className={style["counter__content__box"]}>
                            <h2>{vip}<span>+</span></h2>
                            <p>Private Tour</p>
                        </div>
                    </div>
                    {/* <div className={style["chat__icon"]} id="chatIcon" >
                        <img src={chatIcon} alt="" onClick={toggleChat} />
                    </div> */}
                </div>
            </section>

            {/*------------------------Map Section---------------------------*/}
            <section className={style["map__section"]}>
                <div className={style["container"]}>
                    <h2>Find your tour on the map</h2>
                    <Map tours={filteredTours} />
                    <div className={style["map__search__bar"]}>
                        <img src={Search} alt="" className={style["map__search__icon"]} />
                        <input onChange={(e) => { search(e.target.value) }} className={style["search"]} type="search" placeholder="Location..." />
                    </div>
                </div>
            </section>

            {/*------------------------Live Tours Section--------------------*/}
            <section className={style["live__tours__section"]}>
                <div className={style["container"]}>
                    <h2>Live Tours to Join Now</h2>
                    <Carousel responsive={responsive}>
                        {
                            liveTours?.map((tour) => {
                                return <LiveToursCard key={tour._id} data={tour} />
                            })
                        }
                    </Carousel>
                </div>
            </section>

            {/*------------------------Popular Tours Section-----------------*/}
            <section className={style["popular__tour__section"]}>
                <div className={style["container"]}>
                    <h2>Popular Tour to Book</h2>
                    <Carousel responsive={responsive}>
                        {
                            popularTours?.map((tour) => {
                                return <PopularToursCard key={tour._id} data={tour} />
                            })
                        }
                    </Carousel>
                </div>
            </section >


            {/*------------------------Popular Topics Section-----------------*/}
            < section className={style["popular__topics__section"]} >
                <div className={style["container"]}>
                    <h2>Our Services</h2>
                    <div className={style["popular__topics"]}>
                        <div className={style["popular__topics__item"]}>
                            <NavLink to="/tourtype/education">
                                <img src={Education} alt="" />
                                <h3 className={style["education__text"]}>Education</h3>
                            </NavLink>
                        </div>
                        <div className={style["popular__topics__item"]}>
                            <NavLink to="/tourtype/shopping">
                                <img src={Shopping} alt="" />
                                <h3 className={style["shopping__text"]}>Shopping</h3>
                            </NavLink>
                        </div>
                        <div className={style["popular__topics__item"]}>
                            <NavLink to="/tourtype/tourism">
                                <img src={Tourism} alt="" />
                                <h3 className={style["tourism__text"]}>Tourism</h3>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section >

            {/*------------------------Travellers Reviews Section-------------*/}
            <section className={style["travellers__reviews__section"]}>
                <div className={style["container"]}>
                    <h2>What Our Travelers Say</h2>
                    <Carousel responsive={responsive}>
                        {
                            popularReviews?.map((Review) => {
                                return <ReviewCard key={Review._id} data={Review} />
                            })
                        }
                    </Carousel>
                </div>
            </section>

            {/*------------------------Email Newsletter Section---------------*/}
            <section className={style["email__newsletter__section"]}>
                <div className={style["container"]}>
                    <div className={style["email__newsletter__content"]}>
                        <div className={style["email__newsletter__text"]}>
                            <h2>Join our email newsletter to keep updated about new tours</h2>
                            <div className={style["email__input__and__btn"]}>
                                <input
                                    type="email"
                                    placeholder="example@mail.com"
                                    className={style["email__input"]}
                                    value={subscribe}
                                    onChange={(e) => setSubscribe(e.target.value)}
                                />
                                <button onClick={subscribeToNewsletter} className={style["subscribe__btn"]}>Subscribe</button>
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
            <Footer />
        </>
    )
}

export default Home