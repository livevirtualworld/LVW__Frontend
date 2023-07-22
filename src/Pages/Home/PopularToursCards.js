import React from 'react'
import CardImg2 from "../../assets/image4.png"
import style from './Home.module.css'








function PopularToursCard() {
    return (
        <div className={style["card"]}>
        <div className={style["trip__image__buttons"]}>
            <img src={CardImg2} alt="" className={style["card-img"]} />
        </div>
        <div className={style["card__content"]}>
            <div className={style["card__rate"]}>
                <div className={style["card__rate__icons"]}>
                    <i className="fa-solid fa-star" style={{ color: '#fe2629' }} />
                    <i className="fa-solid fa-star" style={{ color: '#fe2629' }} />
                    <i className="fa-solid fa-star" style={{ color: '#fe2629' }} />
                    <i className="fa-solid fa-star" style={{ color: '#fe2629' }} />
                    <i className="fa-solid fa-star" style={{ color: '#fe2629' }} />
                </div>
                <span>(5.0)</span>
            </div>
            <h4>Discovering the Mysteries of the Pyramid of Giza Tour</h4>
            <p>Cairo, Egypt
            </p></div>
    </div>
  
    );
  }
  
  export default PopularToursCard;