import React from "react";
import { NavLink } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import style from './WhoWeAre.module.css'
import Footer from "../Footer/Footer";
import OurTeam from "./OurTeam";
import Signature from '../../assets/signature.png'

// const teamDescriptions = [
//     {
//         name: 'Sanad Hamdan (Chief Executive Officer)',
//         description: "Founder and CEO of LVW, is a seasoned professional with a robust background in adventure tourism, classic tourism, team-building, and program management. From his beginnings as a Canyon Guide to orchestrating international events and leading operations in diverse roles, Sanad's expertise uniquely enriches LVW. His commitment to seamless experiences, coupled with a deep understanding of operational efficiency, positions LVW for significant growth under his visionary leadership."
//     },
//     {
//         name: 'Enzo La Rosa (Chief Finance Officer)',
//         description: "With 15 years of professional experience, a seasoned financial expert and business coach, brings his financial acumen and strategic planning skills to the team as the company's CFO. His experience in finance ensures that LVW operates with a sound financial foundation and is well-positioned for future growth. Brings over a decade of diverse expertise, ranging from programming to strategic consulting. With a meticulous focus on operational efficiency, cost analysis, and a flair for storytelling, Enzo enriches LVW's team with a profound understanding of business practices and a commitment to fostering growth."
//     },
//     {
//         name: 'Arianna Colombani (Director of Education & Accessibility) ',
//         description: "Founder and CEO of LVW, is a seasoned professional with a robust background in adventure tourism, classic tourism, team-building, and program management. From his beginnings as a Canyon Guide to orchestrating international events and leading operations in diverse roles, Sanad's expertise uniquely enriches LVW. His commitment to seamless experiences, coupled with a deep understanding of operational efficiency, positions LVW for significant growth under his visionary leadership."
//     },
//     {
//         name: 'Rana Khalil (Chief Marketing Officer)',
//         description: "As the Chief Marketing Officer at LVW, Rana brings a dynamic blend of strategic marketing expertise and a passion for driving brand success. She is a seasoned marketing professional with over 20 years of multifaceted expertise. Joining LVW is a personal pledge for her to contribute her passion, skills, and decades of experience to propel the brand forward. She is thrilled to be part of this journey, creating lasting connections and driving sustainable growth that will define LVW's future in the market."
//     },
//     {
//         name: 'Mohammad Ali (Chief Operation Officer)',
//         description: "**No Content Available**"
//     },
//     {
//         name: 'Anisa Bali (Coordinator)',
//         description: "**No Content Available**"
//     },
//     {
//         name: 'Fatma Khalil (Chief Technology Officer)',
//         description: "**No Content Available**"
//     },
//     {
//         name: 'Karim Ashraf (Graphic Designer & Ui Ux)',
//         description: "**No Content Available**"
//     },
//     {
//         name: 'Murad Al-Saidi (Graphic Designer)',
//         description: "**No Content Available**"
//     },
// ];

function WhoWeAre() {
    return (
        <>
            <Navbar />
            <div className={style['bgImage']}></div>
            <div className={style['header__title']}>
                <h1>Who We Are</h1>
            </div>
            <div className={style['container']}>
                <div className={style['main__title']}>
                    <h3><span>OUR Mission:</span> "Bringing the World into your World”</h3>
                    <div className={style['blockquote']}>
                        <p>"Every click is a Journey, every stream a Story"</p>
                    </div>
                    <h3><span>OUR Vision:</span> "To be the global hub for Real-Time Exploration, where the boundaries of geography fade, and the wonders of the world are but a stream away. Whether you're Traveler, student, teacher, fashion lover, streamer, we’re your passport to a world without borders”</h3>
                    <div className={style['lastquote']}>
                        <p>"The hub for diverse exclusive Live Virtual experiences"</p>
                    </div>
                </div>
                <div className={style['body__content']}>
                    <h2>OUR Team:</h2>
                    <OurTeam />
                    <div className={style['ceo__letter']}>
                        <div className={style['container']}>
                            <div className={style['letter__content']}>
                            <h3>WITH AN EYE ON TOMORROW</h3>
                            <h2>"At LVW, reality meets imagination, boundaries fade,<br />
                                and adventures await.<br />
                                We're not just bridging worlds; we're redefining exploration."
                            </h2>
                            <p>At Live Virtual World (LVW), we are committed to revolutionizing the way people explore and experience the world.
                                Our mission is to digitally bridge the gap between the physical and virtual worlds,
                                offering immersive and interactive virtual tours that transport you to magical destinations around the globe.</p>
                                <p>I am proud to lead a team of dedicated professionals who are passionate about delivering high-quality live streams and captivating storytelling.
                                    Our goal is to provide personalized experiences that engage and inspire our audience, whether you are a traveler seeking adventure,
                                    an educator enhancing learning experiences, or a business looking to offer innovative experiences to your clients.</p>
                                    <p>This is an exciting time for LVW as we continue to expand our geographic reach, enhance user experiences,
                                        and diversify our offerings.
                                        We are constantly innovating and exploring new markets to ensure that we remain at the forefront of the virtual tourism industry.</p>
                                        <p>I invite you to join us on this journey of exploration and discovery. </p>
                                        <p>Together, we can create a more immersive, inclusive, and impactful world.</p>
                                        <div className={style['signature']}>
                                            <img src={Signature} alt="signature" />
                                            <h3>Sanad Hamdan</h3>
                                            <p>Founder and Chief Executive Officer</p>
                                        </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style['last__div']}>
                    <h2>Start Your Tour</h2>
                    <button><NavLink to='/login'>Join Us Now</NavLink></button>
                </div>
            </div>
            <Footer />
        </>

    );
}

export default WhoWeAre;