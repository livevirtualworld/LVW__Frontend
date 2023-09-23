import React, { useEffect, useState } from 'react'
import style from './card.module.css'
import TourCardImage from '../../assets/image3.png'
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FaStar } from 'react-icons/fa'
import axios from 'axios';
import { param } from 'jquery';



function TechnicalCard(props) {
    const [tourRating, setTourRating] = useState(null)
    const [tourHover, setTourHover] = useState(null)
    const [tourComment, setTourComment] = useState("")
    const [tourGuideRating, setTourGuideRating] = useState(null)
    const [tourGuideHover, setTourGuideHover] = useState(null)
    const [tourGuideComment, setTourGuideComment] = useState("")
    const [cameraOperatorRating, setCameraOperatorRating] = useState(null)
    const [cameraOperatorHover, setCameraOperatorHover] = useState(null)
    const [cameraOperatorComment, setCameraOperatorComment] = useState("")
    const [directorRating, setDirectorRating] = useState(null)
    const [directorHover, setDirectorHover] = useState(null)
    const [directorComment, setDirectorComment] = useState("")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [cardData , setcardData]= useState()
    // Calculate the number of full stars and half stars based on the rating value
    const fullStars = Math.floor(cardData?.avgRate || 0);
    const hasHalfStar = (cardData?.avgRate || 0) - fullStars >= 0.5;

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
    useEffect(() => {
        axios.get("http://localhost:5000/user/oneTour", {params: {id: props?.data}})
        .then((res)=>{
            setcardData(res.data)
        })
    }, [cardData])
    return (
        <div className={style["tour__card"]}>
            <NavLink
                to={`/tourDetails`} state={cardData?._id}
            >
                <div className={style["tour__trip__image__buttons"]}>
                    <img src={cardData?.img?.length > 0 ? `http://localhost:5000/${cardData?.img && cardData?.img[0]}` : TourCardImage} alt="" className={style["tour__card-img"]} />
                    <div className={style["tour__card__buttons"]}>
                        <button className={style["tour__public__btn"]}>
                            {cardData?.category === 'public' ? 'Public' : (cardData?.category === 'VIP' ? 'VIP' : '')}
                        </button>
                    </div>
                </div>
                <div className={style["tour__card__content"]}>
                    <div className={style["tour__card__rate"]}>
                        <div className={style["card__rate__icons"]}>
                            {starIcons}
                        </div>
                        <span>({cardData?.avgRate && Math.round(cardData?.avgRate)})</span>
                    </div>
                    <h4>{cardData?.description}</h4>
                    <p>{cardData?.address}
                    </p></div>
            </NavLink>
            {
                props.review && !props.isReview &&
                <>
                    <h6 onClick={handleOpen} className={style["make__reveiw__button"]}>Add Review</h6>
                    <Modal
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box className={style["box"]}>
                            <Typography id="keep-mounted-modal-title" variant="h6" component="h2"
                                className={style['modal__header']}
                                style={{ fontSize: '23px', fontWeight: '400' }}
                            >
                                Give Us Your Feedback
                            </Typography>
                            <i
                                className="fa-regular fa-circle-xmark"
                                style={{ color: '#000000', fontSize: '25px', fontWeight: '600', cursor: 'pointer', position: 'absolute', top: '25px', right: '20px' }}
                                onClick={() => setOpen(false)}
                            ></i>
                            <div className={style['modal__container']}>


                                <div className={style["first"]}>
                                    <div className={style["rate"]}>

                                        <Typography className={style["label"]}>Tour Rate</Typography>
                                        {[...Array(5)].map((star, i) => {
                                            const ratingValue = i + 1
                                            return <label>
                                                <input className={style["input"]}
                                                    type='radio'
                                                    name='rating'
                                                    value={ratingValue}
                                                    onClick={() => {
                                                        setTourRating(ratingValue)
                                                    }}

                                                ></input>
                                                <FaStar className={style["star"]}
                                                    size={25}
                                                    color={ratingValue <= (tourRating || tourHover) ? "#ffc107" : "#e4e5e9"}
                                                    onMouseEnter={() => {
                                                        setTourHover(ratingValue)
                                                    }}
                                                    onMouseLeave={() => {
                                                        setTourHover(null)
                                                    }}
                                                />
                                            </label>
                                        })}
                                        <Typography className={style["label"]}>Tour Comment</Typography>
                                        <textarea placeholder='Enter Tour Comment'
                                            className={style["area"]}
                                            onChange={(e) => {
                                                setTourComment(e.target.value)
                                            }}></textarea>
                                    </div>
                                    <div className={style["guide"]}>
                                        <Typography className={style["label"]}>Tour Guide Rate</Typography>
                                        {[...Array(5)].map((star, i) => {
                                            const ratingValue = i + 1
                                            return <label>
                                                <input className={style["input"]}
                                                    type='radio'
                                                    name='rating'
                                                    value={ratingValue}
                                                    onClick={() => {
                                                        setTourGuideRating(ratingValue)
                                                    }}

                                                ></input>
                                                <FaStar className={style["star"]}
                                                    size={25}
                                                    color={ratingValue <= (tourGuideRating || tourGuideHover) ? "#ffc107" : "#e4e5e9"}
                                                    onMouseEnter={() => {
                                                        setTourGuideHover(ratingValue)
                                                    }}
                                                    onMouseLeave={() => {
                                                        setTourGuideHover(null)
                                                    }}
                                                />
                                            </label>
                                        })}
                                        <Typography className={style["label"]}>Tour Guide Comment</Typography>
                                        <textarea placeholder='Enter Tour Guide Comment'
                                            className={style["area"]}
                                            onChange={(e) => {
                                                setTourGuideComment(e.target.value)
                                            }}></textarea>
                                    </div>
                                </div>
                                <div className={style["first"]}>
                                    <div className={style["operator"]}>
                                        <Typography className={style["label"]}>Camera Operator Rate</Typography>
                                        {[...Array(5)].map((star, i) => {
                                            const ratingValue = i + 1
                                            return <label>
                                                <input className={style["input"]}
                                                    type='radio'
                                                    name='rating'
                                                    value={ratingValue}
                                                    onClick={() => {
                                                        setCameraOperatorRating(ratingValue)
                                                    }}

                                                ></input>
                                                <FaStar className={style["star"]}
                                                    size={25}
                                                    color={ratingValue <= (cameraOperatorRating || cameraOperatorHover) ? "#ffc107" : "#e4e5e9"}
                                                    onMouseEnter={() => {
                                                        setCameraOperatorHover(ratingValue)
                                                    }}
                                                    onMouseLeave={() => {
                                                        setCameraOperatorHover(null)
                                                    }}
                                                />
                                            </label>
                                        })}
                                        <Typography className={style["label"]}>Camera Operator Comment</Typography>
                                        <textarea placeholder='Enter Camera Operator Comment'
                                            className={style["area"]}
                                            onChange={(e) => {
                                                setCameraOperatorComment(e.target.value)
                                            }}></textarea>
                                    </div>
                                    <div className={style["director"]}>
                                        <Typography className={style["label"]}>Director Rate</Typography>
                                        {[...Array(5)].map((star, i) => {
                                            const ratingValue = i + 1
                                            return <label>
                                                <input className={style["input"]}
                                                    type='radio'
                                                    name='rating'
                                                    value={ratingValue}
                                                    onClick={() => {
                                                        setDirectorRating(ratingValue)
                                                    }}

                                                ></input>
                                                <FaStar className={style["star"]}
                                                    size={25}
                                                    color={ratingValue <= (directorRating || directorHover) ? "#ffc107" : "#e4e5e9"}
                                                    onMouseEnter={() => {
                                                        setDirectorHover(ratingValue)
                                                    }}
                                                    onMouseLeave={() => {
                                                        setDirectorHover(null)
                                                    }}
                                                />
                                            </label>
                                        })}
                                        <Typography className={style["label"]}>Director Comment</Typography>
                                        <textarea placeholder='Enter Director Comment'
                                            className={style["area"]}
                                            onChange={(e) => {
                                                setDirectorComment(e.target.value)
                                            }}></textarea>
                                    </div>
                                </div>
                                <Button
                                    style={{ display: "block", margin: "10px auto", background: 'rgb(54, 108, 175)', borderRadius: '12px' }}
                                    variant="contained"
                                    onClick={() => {
                                        handleClose()
                                        axios.post("http://localhost:5000/user/makeReview", {
                                            user: JSON.parse(localStorage.getItem("id")),
                                            book: props.id,
                                            rate: tourRating,
                                            comment: tourComment,
                                            tourGuideRate: tourGuideRating,
                                            tourGuideComment: tourGuideComment,
                                            cameraOperatorRate: cameraOperatorRating,
                                            cameraOperatorComment: cameraOperatorComment,
                                            directorRate: directorRating,
                                            directorComment: directorComment
                                        }).then((res) => {
                                            setTourRating(null)
                                            setTourComment("")
                                            setTourGuideRating(null)
                                            setTourGuideComment("")
                                            setCameraOperatorRating(null)
                                            setCameraOperatorComment("")
                                            setDirectorRating(null)
                                            setDirectorComment("")
                                            window.location.reload();
                                        })
                                    }}
                                >Save</Button>
                            </div>

                        </Box>
                    </Modal>
                </>
            }
        </div>
    )
}

export default TechnicalCard
