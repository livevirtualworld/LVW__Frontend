import React from 'react'
import style from './StreamingSection.module.css'
import Avatar from '../../assets/avatar.png'
import LiveImage from '../../assets/live/image 5.png'
import Watch from '../../assets/live/icons.svg'
import Send from '../../assets/live/Send.svg'


function StreamingSection() {
    return (
        <secrtion className={style["live__section"]}>
            <div className={style["container"]}>
                <div className={style["live__section__content"]}>
                    <div className={style["live__section__left"]}>
                        <div className={style["live__video"]}>
                            <img src={LiveImage} alt="" />
                            <div className={style["video__top__buttons"]}>
                                <button className={style["public__btn"]}>Public</button>
                                <button className={style["live__now__btn"]}>Live Now</button>
                                <div className={style["video__views"]}>
                                    <p>120</p>
                                    <img src={Watch} alt="" />
                                </div>
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
                                <h4>Explore the pyramid from inside</h4>
                                <p>Cairo, Egypt</p>
                            </div>
                            <div className={style["title__buttons"]}>
                                <button className={style["guests__btn"]}>10</button>
                                <button className={style["title__btn"]}>Send Trip</button>
                            </div>
                        </div>
                    </div>
                    <div className={style["live__section__right"]}>
                        <div className={style["live__chat__box"]}>
                            <div className={style["chat__header"]}>
                                <div className={style["chat__manager"]}>
                                    <img src={Avatar} alt="" className={style["avatar1"]} />
                                    <img src={Avatar} alt="" className={style["avatar2"]} />
                                    <img src={Avatar} alt="" className={style["avatar3"]} />
                                    <p className={style["plus__img"]}>+</p>
                                </div>
                                {/* <i className="fa-solid fa-microphone " style={{ color: '#ffffff' , fontSize: '15px'}} id={style['speaker']}/>
                                <i className="fa-solid fa-microphone-slash " style={{ color: '#060c13' }} id={style['first__mute']}/>
                                <i className="fa-solid fa-microphone-slash " style={{ color: '#060c13' }} id={style['sec__mute']}/> */}
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