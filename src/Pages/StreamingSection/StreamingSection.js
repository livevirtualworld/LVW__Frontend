import React, { useState, useEffect } from 'react'
import style from './StreamingSection.module.css'
import Avatar from '../../assets/avatar.png'
import LiveImage from '../../assets/live/image 5.png'
import Watch from '../../assets/live/icons.svg'
import Send from '../../assets/live/Send.svg'
import axios from 'axios'

function StreamingSection() {
    const [liveTours, setLiveTours] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/user/liveTours").then((res) => {
            setLiveTours(res.data.data)
        })
    }, []);

    return (
        <secrtion className={style["live__section"]}>
            <div className={style["container"]}>
                <div className={style["live__section__content"]}>
                    <div className={style["live__section__left"]}>
                        <div className={style["live__video"]}>
                            {/* <div style={{ width: '100%', height: '0px', position: 'relative', paddingBottom: '56.25%' }}>
                                <iframe src="https://player.onestream.live/embed?token=MjU1NDI0&type=up"
                                    style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' , borderRadius: '15px'}}
                                    scrolling="no"
                                    frameborder="0"
                                    allow="autoplay"
                                    allowfullscreen>
                                </iframe>
                            </div> */}
                            <img src={LiveImage} alt='' />
                            <div className={style["video__top__buttons"]}>
                                <button className={style["public__btn"]}>
                                    {liveTours[0]?.category === 'public' ? 'Public' : (liveTours[0]?.category === 'VIP' ? 'VIP' : (liveTours[0]?.category === 'free' ? 'Free' : ''))}
                                </button>
                                <button className={style["live__now__btn"]}>Live Now</button>
                                {/* <div className={style["video__views"]}>
                                    <p>120</p>
                                    <img src={Watch} alt="" />
                                </div> */}
                            </div>
                            {/* <div className={style["video__bottom__buttons"]}>
                                <img src="./assets/images/live/btn.svg" alt="" />
                                <img src="./assets/images/live/btn (1).svg" alt="" />
                                <img src="./assets/images/live/btn (2).svg" alt="" />
                                <img src="./assets/images/live/btn (3).svg" alt="" />
                            </div> */}
                        </div>
                        <div className={style["video__details"]}>
                            <div className={style["video__title"]}>
                                <h4>{liveTours[0]?.title}</h4>
                                <p>{liveTours[0]?.city}, {liveTours[0]?.address}</p>
                            </div>
                            <div className={style["title__buttons"]}>
                                <button className={style["guests__btn"]}>10</button>
                                <button className={style["title__btn"]}>
                                    {liveTours[0]?.tourType === 'tourism' ? 'Tourism' : (liveTours[0]?.tourType === 'shopping' ? 'Shopping' : (liveTours[0]?.tourType === 'education' ? 'Education' : ''))}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={style["live__section__right"]}>
                    {/* <iframe src="https://chat.onestream.live/embed?token=dW5pdmVyc2FsLWNoYXQtMjU1NDI0"
                    style={{width:'100%',height:'100%',overflow: 'hidden', borderRadius: '15px'}}
                    scrolling="no" 
                    frameborder="0"
                    allow="autoplay"
                    allowfullscreen ></iframe> */}
                        <div className={style["live__chat__box"]}>
                            <div className={style["chat__header"]}>
                                <div className={style["chat__manager"]}>
                                    <img src={Avatar} alt="" className={style["avatar1"]} />
                                    <img src={Avatar} alt="" className={style["avatar2"]} />
                                    <img src={Avatar} alt="" className={style["avatar3"]} />
                                    <p className={style["plus__img"]}>+</p>
                                </div>
                            </div>
                            <div className={style["chat__comments"]}>
                                <div className={style["user__comments"]}>
                                    <img src={Avatar} alt="" />
                                    <h5>Afraz Explores <span className={style["chat__time"]}>4:30PM</span> Afraz <span className={style["chat__state"]}>Started the tour</span></h5>
                                </div>
                                <div className={style["user__comments"]}>
                                    <img src={Avatar} alt="" />
                                    <h5>Afraz Explores <span className={style["chat__time"]}>4:30PM</span> Afraz <span className={style["chat__state"]}>Started the tour</span></h5>
                                </div>
                                <div className={style["user__comments"]}>
                                    <img src={Avatar} alt="" />
                                    <h5>Afraz Explores <span className={style["chat__time"]}>4:30PM</span> Afraz <span className={style["chat__state"]}>Started the tour</span></h5>
                                </div>
                                <div className={style["user__comments"]}>
                                    <img src={Avatar} alt="" />
                                    <h5>Afraz Explores <span className={style["chat__time"]}>4:30PM</span> Afraz <span className={style["chat__state"]}>Started the tour</span></h5>
                                </div>
                                <div className={style["user__comments"]}>
                                    <img src={Avatar} alt="" />
                                    <h5>Afraz Explores <span className={style["chat__time"]}>4:30PM</span> Afraz <span className={style["chat__state"]}>Started the tour</span></h5>
                                </div>
                                <div className={style["user__comments"]}>
                                    <img src={Avatar} alt="" />
                                    <h5>Afraz Explores <span className={style["chat__time"]}>4:30PM</span><span className={style["chat__emoji"]}><img src="./assets/images/live/emoji.svg" alt="" /></span></h5>
                                </div>
                                <div className={style["write__message__box"]}>
                                    <textarea placeholder="Write your message..." />
                                    <img src={Send} alt="" className={style["send__icon"]} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </secrtion>
    );
}
export default StreamingSection