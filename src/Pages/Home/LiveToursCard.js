import React from 'react'
import CardImg from "../../assets/image3.png"
import style from './Home.module.css'
import { NavLink } from 'react-router-dom';


function LiveToursCard(props) {
    return (
        <NavLink
            to={`/tourDetails`} state={props.data._id}
        >
            <div className={style["card"]}>
                <div className={style["trip__image__buttons"]}>
                    {props.data.img.length > 0 ? (
                        <img src={`http://localhost:5000/${props.data.img[0]}`} alt="" className={style["card-img"]} />) : (
                        <img src={CardImg} alt="" className={style["card-img"]} />)
                    }
                    <span><i class="fa-regular fa-circle-stop" style={{color: '#fe2629', fontSize: '20px'}}></i></span>
                    <div className={style["card__buttons"]}>
                        <button className={style["public__btn"]}>
                            {props.data.category === 'public' ? 'Public' : (props.data.category === 'VIP' ? 'VIP' : '')}
                        </button>
                        <button className={style["live__now__btn"]}>Live Now</button>
                    </div>
                </div>
                <div className={style["card__content"]}>
                    <h4>{props.data.title}</h4>
                    <p>{props.data.city},{props.data.address}
                    </p></div>
            </div>
        </NavLink>

    );
}

export default LiveToursCard;