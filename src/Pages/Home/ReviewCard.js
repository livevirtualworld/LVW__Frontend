import React from 'react'
import style from './Home.module.css'




function ReviewCard() {
    return (
        <div className={style["review__card"]}>
                    <h3>John Carter</h3>
                    <div className={style["review__card__rate"]}>
                      <div className={style["review__rate__icons"]}>
                        <i className="fa-solid fa-star" style={{color: '#fe2629'}} />
                        <i className="fa-solid fa-star" style={{color: '#fe2629'}} />
                        <i className="fa-solid fa-star" style={{color: '#fe2629'}} />
                        <i className="fa-solid fa-star" style={{color: '#fe2629'}} />
                        <i className="fa-solid fa-star" style={{color: '#fe2629'}} />
                      </div>
                      <span>(5.0)</span>
                    </div>
                    <p>“Lorem ipsum dolor sit amet conse ctetur adipiscing lectus a nunc mauris scelerisque
                      sed egestas pharetraol quis pharetra arcu pharetra blandit.”</p>
                    <span className={style["review__date"]}>23 May 2023</span>
                  </div>
  
    );
  }
  
  export default ReviewCard;