
import React from 'react'
import style from './Footer.module.css'
import logo1 from "../../assets/logo (1).png"
import facebook from "../../assets/Facebook.svg"
import youtube from "../../assets/YouTube.svg"
import linked from "../../assets/LinkedIn.svg"
import instagram from "../../assets/Instagram.svg"
import frame97 from '../../assets/Frame 39497.png'
import frame98 from '../../assets/Frame 39498.png'

function Footer() {
    return ( 
<footer>
                <div className={style["container"]}>
                    <div className={style["footer__content"]}>
                        <ul>
                            <li><img src={logo1} alt='' /></li>
                            <li>Click the icons below to explore our profiles and stay updated with our latest  news!</li>
                            <li className={style["links"]}>
                            <a href="https://www.facebook.com/livevirtualworld" target="_blank" rel="noopener noreferrer"><img src={facebook} alt='' /></a>
                            <a href="https://www.instagram.com/live_virtual_world?igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer"><img src={instagram} alt='' /></a>
                            <a href="https://www.linkedin.com/company/live-virtual-world" target="_blank" rel="noopener noreferrer"><img src={linked} alt='' /></a>
                            <a href="https://www.youtube.com/@livevirtualworld7827?si=EnL3pBzNfYYrxW8W" target="_blank" rel="noopener noreferrer"><img src={youtube} alt='' /></a>
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

     );
}

export default Footer;