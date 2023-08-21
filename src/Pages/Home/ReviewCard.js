import React from 'react'
import style from './Home.module.css'




function ReviewCard(props) {
  const fullStars = Math.floor(props.data.rate || 0);
    const hasHalfStar = (props.data.rate || 0) - fullStars >= 0.5;

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
        <div className={style["review__card"]}>
                    <h3>{props.data.user.name}</h3>
                    <div className={style["review__card__rate"]}>
                      <div className={style["review__rate__icons"]}>
                        {/* <i className="fa-solid fa-star" style={{color: '#fe2629'}} />
                        <i className="fa-solid fa-star" style={{color: '#fe2629'}} />
                        <i className="fa-solid fa-star" style={{color: '#fe2629'}} />
                        <i className="fa-solid fa-star" style={{color: '#fe2629'}} />
                        <i className="fa-solid fa-star" style={{color: '#fe2629'}} /> */}
                        {starIcons}
                      </div>
                      <span>({props.data.rate?.toFixed(1)})</span>
                    </div>
                    <p>“
                      {props.data.comment}
                      ”</p>
                    <span className={style["review__date"]}>23 May 2023</span>
                  </div>
  
    );
  }
  
  export default ReviewCard;