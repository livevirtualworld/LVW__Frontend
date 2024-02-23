import React from "react";
import style from './WhoWeAre.module.css'
import Sanad from '../../assets/team/Picture1.jpg'
import Enzo from '../../assets/team/Picture2.jpg'
import Ariana from '../../assets/team/Picture3.jpg'
import Rana from '../../assets/team/Picture4.jpg'




function OurTeam() {
    const navigateToProfile = (profileUrl) => {
        window.open(profileUrl, "_blank"); // Open the profile URL in a new tab
    };
    return (
        <>
            <div className={style['our__team']}>
                <div className={style['container']}>
                    <div className={style['cards']}>
                        <div className={style['card__box']}>
                            <div className={style['after__hover']}>
                                <img src={Sanad} />
                                <ul>
                                    <li><i class="fa-brands fa-facebook-f" onClick={() => navigateToProfile("https://www.facebook.com/story.php?story_fbid=406443851756849&substory_index=898726195041079&id=100071737136498")}></i></li>
                                    <li><i class="fa-brands fa-linkedin-in" onClick={() => navigateToProfile("https://www.linkedin.com/company/live-virtual-world/")}></i></li>
                                </ul>
                            </div>
                            <h2>Sanad Hamdan</h2>
                            <h3>CEO / FOUNDER</h3>
                        </div>
                        <div className={style['card__box']}>
                            <div className={style['after__hover']}>
                                <img src={Enzo} />
                                <ul>
                                    <li><i class="fa-brands fa-facebook-f" onClick={() => navigateToProfile("https://www.facebook.com/story.php?story_fbid=406443851756849&substory_index=898726195041079&id=100071737136498")}></i></li>
                                    <li><i class="fa-brands fa-linkedin-in" onClick={() => navigateToProfile("https://www.linkedin.com/company/live-virtual-world/")}></i></li>
                                </ul>
                            </div>
                            <h2>Enzo La Rosa</h2>
                            <h3>Finance & Strategic Specialist</h3>
                        </div>
                        <div className={style['card__box']}>
                        <div className={style['after__hover']}>
                            <img src={Rana} />
                            <ul>
                                <li><i class="fa-brands fa-facebook-f" onClick={() => navigateToProfile("https://www.facebook.com/story.php?story_fbid=406443851756849&substory_index=898726195041079&id=100071737136498")}></i></li>
                                <li><i class="fa-brands fa-linkedin-in" onClick={() => navigateToProfile("https://www.linkedin.com/company/live-virtual-world/")}></i></li>
                            </ul>
                            </div>
                                <h2>Rana Khalil</h2>
                                <h3>Chief Marketing Officer</h3>
                        </div>
                        <div className={style['card__box']}>
                        <div className={style['after__hover']}>
                            <img src={Ariana} />
                            <ul>
                                <li><i class="fa-brands fa-facebook-f" onClick={() => navigateToProfile("https://www.facebook.com/story.php?story_fbid=406443851756849&substory_index=898726195041079&id=100071737136498")}></i></li>
                                <li><i class="fa-brands fa-linkedin-in" onClick={() => navigateToProfile("https://www.linkedin.com/company/live-virtual-world/")}></i></li>
                            </ul>
                            </div>
                                <h2>Arianna Colombani</h2>
                                <h3>Accessibility & Education Specialist</h3>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default OurTeam;