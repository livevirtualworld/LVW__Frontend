import React from 'react'
import CardImg2 from "../../assets/image4.png"
import style from './Home.module.css'
import { NavLink } from 'react-router-dom';



function PopularToursCard(props) {
    const fullStars = Math.floor(props.data.avgRate || 0);
    const hasHalfStar = (props.data.avgRate || 0) - fullStars >= 0.5;

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
    return (
        <NavLink
                to={`/tourDetails`} state={props.data._id}
            >
        <div className={style["card"]}>
            <div className={style["trip__image__buttons"]}>
                {props.data.img.length > 0 ? (
                    <img src={`http://localhost:5000/${props.data.img[0]}`} alt="" className={style["card-img"]} />):(
                        <img src={CardImg2} alt="" className={style["card-img"]} />)
                }
            </div>
            <div className={style["card__content"]}>
                <div className={style["card__rate"]}>
                    <div className={style["card__rate__icons"]}>
                        {starIcons}
                    </div>
                    <span>({props.data.avgRate?.toFixed(1)})</span>
                </div>
                <h4>{props.data.title}</h4>
                <p>{props.data.city},{props.data.address}
                </p></div>
        </div>
        </NavLink>
    );
}

export default PopularToursCard;