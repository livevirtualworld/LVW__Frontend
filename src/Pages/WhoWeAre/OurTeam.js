import React from "react";
import style from './WhoWeAre.module.css';
import Sanad from '../../assets/team/sanad.png';
import Enzo from '../../assets/team/Enzo.png';
import Ariana from '../../assets/team/Arianna.png';
import Anisa from '../../assets/team/Anisa.png';
import Rana from '../../assets/team/Rana.png';
import Mohamed from '../../assets/team/Mohamed Ali.png'
import User from '../../assets/default-user.png'


const teamData = [
    {
        name: 'Sanad Hamdan',
        position: 'CEO / FOUNDER',
        image: Sanad,
        socialMedia: {
            facebook: 'https://www.facebook.com/story.php?story_fbid=406443851756849&substory_index=898726195041079&id=100071737136498',
            linkedin: 'https://www.linkedin.com/company/live-virtual-world/'
        }
    },
    {
        name: 'Enzo La Rosa',
        position: 'CFO',
        image: Enzo,
        socialMedia: {
            facebook: 'https://www.facebook.com/story.php?story_fbid=406443851756849&substory_index=898726195041079&id=100071737136498',
            linkedin: 'https://www.linkedin.com/company/live-virtual-world/'
        }
    },
    {
        name: 'Rana Ekhail',
        position: 'CMO',
        image: Rana,
        socialMedia: {
            facebook: 'https://www.facebook.com/livevirtualworld',
            linkedin: 'https://www.linkedin.com/company/live-virtual-world/'
        }
    },
    {
        name: 'Arianna Colombani',
        position: 'Director Of Education',
        image: Ariana,
        socialMedia: {
            facebook: 'https://www.facebook.com/livevirtualworld',
            linkedin: 'https://www.linkedin.com/company/live-virtual-world/'
        }
    },
    {
        name: 'Mohammed Ali',
        position: 'COO',
        image: Mohamed,
        socialMedia: {
            facebook: 'https://www.facebook.com/livevirtualworld',
            linkedin: 'https://www.linkedin.com/company/live-virtual-world/'
        }
    },
    {
        name: 'Fatma Khalil',
        position: 'CTO',
        image: User,
        socialMedia: {
            facebook: 'https://www.facebook.com/livevirtualworld',
            linkedin: 'https://www.linkedin.com/company/live-virtual-world/'
        }
    },
    {
        name: 'Amedeo Cristorafo',
        position: 'Advisor',
        image: User,
        socialMedia: {
            facebook: 'https://www.facebook.com/livevirtualworld',
            linkedin: 'https://www.linkedin.com/company/live-virtual-world/'
        }
    },
    {
        name: 'Karim Ahsraf',
        position: 'Ui & Ux',
        image: User,
        socialMedia: {
            facebook: 'https://www.facebook.com/livevirtualworld',
            linkedin: 'https://www.linkedin.com/company/live-virtual-world/'
        }
    },
];

function OurTeam() {
    const navigateToProfile = (profileUrl) => {
        window.open(profileUrl, "_blank"); // Open the profile URL in a new tab
    };

    return (
        <div className={style['our__team']}>
            <div className={style['container']}>
                <div className={style['cards']}>
                    {teamData.map((member, index) => (
                        <div key={index} className={style['card__box']}>
                            <div className={style['after__hover']}>
                                <img src={member.image} alt={member.name} />
                                <ul>
                                    <li>
                                        <i className="fa-brands fa-facebook-f"
                                        onClick={() => navigateToProfile(member.socialMedia.facebook)}></i>
                                    </li>
                                    <li>
                                        <i className="fa-brands fa-linkedin-in"
                                        onClick={() => navigateToProfile(member.socialMedia.linkedin)}></i>
                                    </li>
                                </ul>
                            </div>
                            <h2>{member.name}</h2>
                            <h3>{member.position}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OurTeam;
