import React, { useEffect } from 'react'
import style from './card.module.css'
import TourCardImage from '../../assets/image3.png'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Card(props) {
    // Calculate the number of full stars and half stars based on the rating value
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
    useEffect(()=>
    {
        console.log(props.data)
    },[])
  return (
    <div className={style["tour__card"]}>
        <NavLink
         to={`/tourDetails`} state={props.data._id}
        >
                            <div className={style["tour__trip__image__buttons"]}>
                                <img src={props.data.img?.length>0?`http://localhost:5000/${props.data.img&&props.data.img[0]}`:TourCardImage} alt="" className={style["tour__card-img"]} />
                                <div className={style["tour__card__buttons"]}>
                                    <button className={style["tour__public__btn"]}>{props.data.category&&props.data.category}</button>
                                    <button className={style["tour__live__now__btn"]}>Live Now</button>
                                </div>
                            </div>
                            <div className={style["tour__card__content"]}>
                                <div className={style["tour__card__rate"]}>
                                    <div className={style["card__rate__icons"]}>
                                        {/* <i className="fa-solid fa-star" style={{ color: '#fe2629' }} />
                                        <i className="fa-solid fa-star" style={{ color: '#fe2629' }} />
                                        <i className="fa-solid fa-star" style={{ color: '#fe2629' }} />
                                        <i className="fa-solid fa-star" style={{ color: '#fe2629' }} />
                                        <i className="fa-solid fa-star" style={{ color: '#fe2629' }} /> */}
                                        {starIcons}
                                    </div>
                                    <span>({props.data.avgRate&&Math.round(props.data.avgRate)})</span>
                                </div>
                                <h4>{props.data.description}</h4>
                                <p>{props.data.address}
                                </p></div>
                                </NavLink>
                        </div>
  )
}

export default Card
