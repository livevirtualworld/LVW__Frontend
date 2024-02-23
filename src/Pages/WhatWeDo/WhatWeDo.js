import React from 'react'
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import style from './WhatWeDo.module.css'
import Pyramids from '../../assets/fynn-schmidt-IYKL2uhgsnU-unsplash.jpg'
import Italy from '../../assets/jacek-dylag-SPpsFbCaN2A-unsplash.jpg'
import Footer from '../Footer/Footer';




function WhatWeDo() {
    return (
        <>
            <Navbar />
            <div className={style['bgImage']}></div>
            <div className={style['header__title']}>
                <h1>What We Do</h1>
            </div>
            <div className={style['container']}>
                <div className={style['body__content']}>
                    <p><span>LVW</span> offers a range of services that revolve around providing immersive and interactive live virtual experiences</p>
                    <h3>1- Live Virtual Tours</h3>
                    <p>Begin your journey with LVW, where every tour is a visual masterpiece in Full-HD Quality, aired live from exciting and exclusive locations.
                        Using your microphone, engage in real-time chats with our skilled specialists and tour guides, ensuring an immersive and personalized experience.
                        Our professional camera operator creates a cinematic live-stream, while a virtual director improves the adventure with specialized media content, allowing virtual travelers to interact seamlessly with our dedicated streaming operators.
                        Only with LVW can you immerse yourself in this unique, interactive adventure.</p>
                        <img src={Pyramids} alt='Giza'/>
                        <h3>2- Live Virtual Educational Experiences</h3>
                        <p>Take a trip through time with LVW's Live Virtual Education experiences.
                            Our Interactive and  immersive experiences, led by verified professional Tour Guide and Experts in your subject, are enhanced by a professional camera operator who professionally captures every moment.
                            With relevant media content, the virtual director enriches the tour and provides a new angle on a range of topics.Whether your group is concentrated in one area or dispersed throughout several sites, our customized live-streaming virtual field trips creates dynamic and captivating learning environments. Our ability to access a wide range of historical, cultural, and artistic locations allows us to create pedagogical tours that transcend subjects for students. New tools help teachers incorporate technology into traditional classrooms more easily.
                            Join us for an innovative educational approach with Live Virtual World.</p>
                        <div className={style['blockquote']}>
                            <p>"Bringing the world into your world."</p>
                        </div>
                    <h3>3- Live Virtual Shopping Experiences </h3>
                    <p>"Stay tuned, coming soon..."<br/>
                        *Add Contact Us form .</p>
                    <h3 className={style['last__serv']}>4- Live Virtual Property Tours</h3>
                    <p>"Stay tuned, coming soon...".</p>
                        <img src={Italy} alt='Italy'/>
                </div>
                <div className={style['nav__join']}>
                <button><NavLink to='/login'>Join Us Now</NavLink></button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default WhatWeDo;