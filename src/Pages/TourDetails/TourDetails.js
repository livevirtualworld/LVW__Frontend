import React, { useEffect, useState } from 'react'
import style from './TourDetails.module.css'
import Vector from '../../assets/Vector.svg'
import Vector1 from '../../assets/Vector (1).svg'
import logo from '../../assets/logo.png'
import United_Kingdom from '../../assets/United Kingdom (GB).png'
import egypt from "../../assets/Egypt (EG).png"
import logo1 from "../../assets/logo (1).png"
import facebook from "../../assets/Facebook.svg"
import twitter from "../../assets/Twitter.svg"
import youtube from "../../assets/YouTube.svg"
import linked from "../../assets/LinkedIn.svg"
import instagram from "../../assets/Instagram.svg"
import frame97 from '../../assets/Frame 39497.png'
import frame98 from '../../assets/Frame 39498.png'
import vecto2 from '../../assets/Vector (2).svg'
import vectorStroke from '../../assets/Vector (Stroke).svg'
import icon from "../../assets/icons.svg"
import UK from '../../assets/United Kingdom (GB).svg'
import LR from '../../assets/Line Rounded.svg'
import icon1 from '../../assets/icons (1).svg'
import { NavLink, Navigate, json, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Card from '../Card/Card';
import { useParams } from 'react-router-dom';
import SuccessandErrorModals from '../SuccessandErorrModals/SuccessandErrorModals';
import Navbar from '../Navbar/Navbar'
import StreamingSection from '../StreamingSection/StreamingSection'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';



function TourDetails() {

  const [lang, setLang] = useState("english")
  const [tap, setTap] = useState("about")
  const [menu, setMenu] = useState(false)
  const [tour, setTour] = useState()
  const [publicTours, setPublicTours] = useState()
  const [vip, setVip] = useState()
  const [hour, setHour] = useState([])
  const [language, setLanguage] = useState([])
  const [bookedNumber, setBookedNumber] = useState()
  const [bookedLang, setBookedLang] = useState()
  const [bookedHours, setBookedHours] = useState()
  const [showSuccessBookModal, setShowSuccessBookModal] = useState(false)
  const [showErrorBookModal, setShowErrorBookModal] = useState(false)
  const [showErrorMsg, setErrorMsg] = useState("")
  const [isLive, setIsLive] = useState(false)
  const [liveTourId, setLiveTourId] = useState([]);
  const [isBookingDisabled, setIsBookingDisabled] = useState(false);
  const [userData, setUserData] = useState("")



  const location = useLocation();
  const navigate = useNavigate();


  const { num } = useParams();


  function hours(number) {
    const updatedHours = [];
    for (let i = number; i > 0; i--) {
      updatedHours.push(i);
    }
    setHour(updatedHours);
  }
  function languages(data) {
    let updatedLanguages = []
    if (data.arabicTourGuide) {
      updatedLanguages.push("Arabic")
    }
    if (data.englishTourGuide) {
      updatedLanguages.push("English")
    }
    if (data.italianTourGuide) {
      updatedLanguages.push("Italian")
    }
    setLanguage(updatedLanguages)
  }
  useEffect(() => {

    if (location.state) {
      axios.get("http://localhost:5000/user/oneTour", { params: { id: location.state } }).then((res) => {
        setTour(res.data)
        hours(res.data.hours)
        languages(res.data)
      })
    } else if (num) {
      axios.get("http://localhost:5000/user/oneTour", { params: { id: num } }).then((res) => {
        setTour(res.data)
        hours(res.data.hours)
        languages(res.data)
      })
    }

    axios.get("http://localhost:5000/user/public").then((res) => {
      setPublicTours(res.data)
    })


    axios.get("http://localhost:5000/user/vip").then((res) => {
      setVip(res.data)
    })

    axios.get("http://localhost:5000/user/liveTours").then((res) => {
      for (let i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i]._id === tour?._id) {
          setIsLive(true)
        }
      }
    })
    axios.get("http://localhost:5000/user/liveTours")
      .then((res) => {
        const liveTourData = res.data.data;
        const liveId = liveTourData.map((tour) => tour?._id);
        setLiveTourId(liveId);
      })
      .catch((error) => {
        console.error("Error fetching live tours:", error);
      });
    axios.post("http://localhost:5000/user/getOneUser", { id: JSON.parse(localStorage.getItem("id")) })
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [location.state])

  useEffect(() => {
    if (liveTourId.includes(tour?._id)) {
      setIsLive(true);
    } else {
      setIsLive(false);
    }
  }, [liveTourId, tour]);



  const fullStars = Math.floor(tour?.avgRate || 0);
  const hasHalfStar = (tour?.avgRate || 0) - fullStars >= 0.5;

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

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement('card')
    if (!stripe || !elements || !cardElement) {
      // Stripe.js has not loaded yet, wait for it to load.
      return;
    }

    try {
      // Fetch the client secret from your server
      const response = await axios.post("http://localhost:5000/getClientSecret", {
        amount: bookedHours * bookedNumber * tour?.price * 100, // Pass the payment amount and convert to cents
        metadata: {
          userId: JSON.parse(localStorage.getItem('id')),
          userName: userData?.name, // Replace with the actual user name
          userEmail: userData?.email, // Replace with the actual user email
        },
      });

      const clientSecret = response.data.clientSecret;

      // Confirm the payment with Stripe using the retrieved client secret
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          type: 'card',
          card: cardElement,
        },
      });

      if (error) {
        // Handle payment error
        console.error('Payment failed:', error.message);
      } else if (paymentIntent) {
        // Payment succeeded, you can now access payment data
        const paymentMethod = paymentIntent.payment_method;
        const cardDetails = paymentMethod.card;
        if (paymentMethod && cardDetails && cardDetails.last4) {
          console.log('Last 4 digits:', cardDetails.last4);
        }
        const bookingData = {
          user: JSON.parse(localStorage.getItem('id')),
          tour: tour._id,
          hours: bookedHours,
          language: bookedLang,
          num: bookedNumber,
          price: bookedHours * bookedNumber * tour?.price,
        };

        const response = await axios.post('http://localhost:5000/user/bookTour', bookingData);

        if (response.data.status === 200) {
          // Handle success logic here, e.g., show a success message and navigate to a confirmation page
          setShowSuccessBookModal(true);
          setIsBookingDisabled(true); // Disable the button
          setTimeout(() => {
            setShowSuccessBookModal(false);
          }, 3000);
        } else if(response.status === 500){
          setShowErrorBookModal(true);
          setErrorMsg(response.data.message);
          setTimeout(() => {
            setShowErrorBookModal(false);
          }, 3000);
        }
      }
    } catch (error) {
      // Handle server error or any other errors
      console.error('Error processing payment:', error);

      // Handle error logic here, e.g., show an error message
      setErrorMsg('An error occurred while processing your payment.');
      setShowErrorBookModal(true);
      setTimeout(()=>{
        setShowErrorBookModal(false);
      },3000)
    }
  };

  return (
    <div>
      {
        showSuccessBookModal && <SuccessandErrorModals success={true} message={"Tour booked successfully"} />
      }
      {
        showErrorBookModal && <SuccessandErrorModals success={false} message={showErrorMsg} />
      }
      <Navbar />

      <div className={style["hero"]}>
        <div className={style["container"]}>
          <div className={style["hero__content"]}>
            <div className={style["overlay"]} />{
              tour?.img?.length > 0 &&
              <img src={`http://localhost:5000/${tour?.img[0]}`} />
            }
            <div className={style["hero__icons"]}>
              <img src={vecto2} />
              <img src={vectorStroke} />
            </div>
            <div className={style["hero__text"]}>
              <h2>{tour?.title}</h2>
              <div className={style["stars"]}>
                {starIcons}
                <h5>({(tour?.avgRate?.toFixed(1))})</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        isLive &&
        <div style={{ marginTop: '50px', marginBottom: '20px' }}>
          <StreamingSection />
        </div>
      }

      <div className={style["details"]}>
        <div className={style["container"]}>
          <div className={style["details__content"]}>
            <div className={style["details__about"]}>
              <div className={style["tabs"]}>
                <a className={` ${tap === "about" ? style.active : ""}`} onClick={() => {
                  setTap("about")
                }}>About</a>
                <a className={` ${tap === "reviews" ? style.active : ""}`} onClick={() => {
                  setTap("reviews")
                }}>Reviews</a>
                <a className={` ${tap === "instructions" ? style.active : ""}`} onClick={() => {
                  setTap("instructions")
                }}>Instructions</a>
                <a className={` ${tap === "media" ? style.active : ""}`} onClick={() => {
                  setTap("media")
                }}>Media</a>
                <a className={` ${tap === "similar" ? style.active : ""}`} onClick={() => {
                  setTap("similar")
                }}>Similar Tours</a>
              </div>

              {
                tap == "about" &&
                <>
                  <div className={style["main-content"]}>
                    <div className={style["btns"]}>
                      <a><img src={icon} /> {tour?.address}</a>
                      <a><img src={icon1} /> {tour?.hours} hours</a>
                      {
                        tour?.arabicCameraOperator &&
                        <a><img src={LR} /> Arabic</a>
                      }
                      {
                        tour?.englishCameraOperator &&
                        <a><img src={UK} /> English</a>
                      }
                      {
                        tour?.italianCameraOperator &&
                        <a><img src={UK} /> Italian</a>
                      }
                    </div>
                    <p>{tour?.description ? tour?.description : "There's no description for this tour"}</p>
                    <div className={style["tags"]}>

                      {tour?.tags && tour?.tags.map((tag, index) => (
                        <a key={index}>{tag}</a>
                      ))}
                    </div>
                    <div className={style["media"]}>{
                      tour?.img?.length > 0 &&
                      <img src={`http://localhost:5000/${tour?.img[1]}`} />
                    }
                    </div>
                  </div>
                </>
              }
              {tap === "reviews" && (
                <div className={style["main-content"]}>
                  {tour?.reviews.length > 0 ? (
                    tour.reviews.slice(0, 6).map((review, index) => (

                      <div className={style["review"]} key={index}>
                        <h3>{review.book.user.name}</h3>
                        <div className={style["stars"]}>
                          {[1, 2, 3, 4, 5].map((starIndex) => (
                            <span
                              key={starIndex}
                              className={starIndex <= review.rate ? "fas fa-star" : "far fa-star"}
                              style={{ color: starIndex <= review.rate ? "gold" : "grey" }}
                            ></span>
                          ))}
                          <h6>({review.rate})</h6>
                        </div>
                        <p>{review.comment}</p>
                      </div>

                    ))
                  ) : (
                    <p>there is no reviews for this tour</p>
                  )}
                  <a href="#">View More Reviews</a>
                </div>
              )}
              {
                tap === "instructions" &&
                (
                  <div className={style["main-content"]}>
                    {
                      tour?.instructions.length > 0 ?
                        tour.instructions.map((instruction, index) => (
                          <h5 key={index}>{instruction}</h5>
                        )) :
                        <h5>No Instructions for this tour</h5>
                    }
                  </div>
                )
              }
              {
                tap === "media" && (
                  <div className={style["main-content"]}>
                    {tour?.img.length > 0 ? (
                      <div className={style["main-image"]}>
                        <img src={`http://localhost:5000/${tour?.img[0]}`} alt="Main Tour Image" />
                      </div>
                    ) : null}
                    {tour?.img.length > 1 && (
                      <div className={style["other-media"]}>
                        {tour?.img.slice(1).map((img, index) => (
                          <img key={index} src={`http://localhost:5000/${img}`} alt={`Tour Image ${index}`} />
                        ))}
                      </div>
                    )}
                    {tour?.img.length <= 1 && (
                      <h5>There's no additional media for this tour</h5>
                    )}
                  </div>
                )
              }
              {
                tap === "similar" &&
                (
                  <>
                    <div className={style["main-conten"]}>
                      {
                        tour?.category === "public" &&
                        publicTours.slice(0, 16).map((item) => {
                          return <Card key={item._id} data={item} />
                        })
                      }
                      {
                        tour?.category === "VIP" &&
                        vip.slice(0, 16).map((item) => {
                          return <Card key={item._id} data={item} />
                        })
                      }
                    </div>
                  </>
                )
              }
            </div>

            {
              tap != "similar" &&
              <>
                <div className={style["details__book"]}>
                  <form className={style['booking__form__style']}>
                    <label>Select Language</label>
                    <div className={style["select"]}>
                      <select onChange={(e) => {
                        setBookedLang(e.target.value)
                      }} defaultValue={0}>
                        <option disabled value={0}>select Language</option>
                        {language.map((l) => {
                          return <option value={l} key={l}>{l}</option>
                        })}
                      </select>
                    </div>
                    <label>hours</label>
                    <div className={style["select"]}>
                      <select onChange={(e) => {
                        setBookedHours(e.target.value)
                      }} defaultValue={0}>
                        <option value={0} disabled>Select hours</option>
                        {[...hour].reverse().map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>

                    </div>
                    <label>Select Gust Number</label>
                    <div className={style["select"]}>
                      <select onChange={(e) => {
                        setBookedNumber(e.target.value)
                      }} defaultValue={0}>
                        <option disabled value={0}>select Number of Geusts</option>
                        <option value={1}>1 Gusts</option>
                        <option value={2}>2 Gusts</option>
                        <option value={4}>4 Gusts</option>
                        <option value={5}>5 Gusts</option>
                        <option value={6}>6 Gusts</option>
                        <option value={7}>7 Gusts</option>
                        <option value={8}>8 Gusts</option>
                        <option value={9}>9 Gusts</option>
                        <option value={10}>10 Gusts</option>
                        <option value={11}>11 Gusts</option>
                        <option value={12}>12 Gusts</option>
                        <option value={13}>13 Gusts</option>
                        <option value={14}>14 Gusts</option>
                        <option value={15}>15 Gusts</option>
                        <option value={16}>16 Gusts</option>
                        <option value={17}>17 Gusts</option>
                        <option value={18}>18 Gusts</option>
                        <option value={19}>19 Gusts</option>
                        <option value={20}>20 Gusts</option>
                      </select>
                    </div>
                    <div style={{marginTop: '40px', marginBottom: '20px'}}>
                    <CardElement
                      options={{
                        hidePostalCode: true,
                        style: {
                          base: {
                            zIndex: '999',
                            fontSize: '20px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                    </div>
                    <div className={style["price"]}>

                      <h4>Total</h4>
                      <h4>{bookedHours && bookedNumber ? bookedHours * bookedNumber * tour?.price :
                        bookedHours && !bookedNumber ? tour?.price * bookedHours : !bookedHours && bookedNumber ?
                          tour?.price * bookedNumber : tour?.price}$</h4>
                    </div>
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      disabled={isBookingDisabled}
                    >
                      Book Now
                    </button>
                  </form>
                  <div className={style["by"]}>
                    {
                      bookedLang === "Arabic" &&
                      <>
                        <h4>This tour by</h4>
                        <NavLink
                          to={`/viewtechnical/${tour?.arabicTourGuide?._id}/tourGuide`}
                        >
                          <div className={style["person"]}>
                            <img src={`http://localhost:5000/${tour?.arabicTourGuide?.img}`} alt="avatar" />
                            <div className={style["text"]}>
                              <h3>{tour?.arabicTourGuide.name}</h3>
                              <h5>Tour Guide</h5>
                            </div>
                          </div>
                        </NavLink>
                        <NavLink
                          to={`/viewtechnical/${tour?.arabicTourGuide?._id}/cameraOperator`}
                        >
                          <div className={style["person"]}>
                            <img src={`http://localhost:5000/${tour?.arabicCameraOperator?.img}`} alt="avatar" />
                            <div className={style["text"]}>
                              <h3>{tour?.arabicCameraOperator.name}</h3>
                              <h5>Camera Operator</h5>
                            </div>
                          </div>
                        </NavLink>
                        <NavLink
                          to={`/viewtechnical/${tour?.arabicDirector?._id}/director`}
                        >
                          <div className={style["person"]}>
                            <img src={`http://localhost:5000/${tour?.arabicDirector?.img}`} alt="avatar" />
                            <div className={style["text"]}>
                              <h3>{tour?.arabicDirector.name}</h3>
                              <h5>Director</h5>
                            </div>
                          </div>
                        </NavLink>
                      </>
                    }
                    {
                      bookedLang === "English" &&
                      <>
                        <h4>This tour by</h4>
                        <NavLink
                          to={`/viewtechnical/${tour?.englishTourGuide?._id}/tourGuide`}
                        >
                          <div className={style["person"]}>
                            <img src={`http://localhost:5000/${tour?.englishTourGuide?.img}`} alt="avatar" />
                            <div className={style["text"]}>
                              <h3>{tour?.englishTourGuide.name}</h3>
                              <h5>Tour Guide</h5>
                            </div>
                          </div>
                        </NavLink>
                        <NavLink
                          to={`/viewtechnical/${tour?.englishCameraOperator?._id}/tourGuide`}
                        >
                          <div className={style["person"]}>
                            <img src={`http://localhost:5000/${tour?.englishCameraOperator?.img}`} alt="avatar" />
                            <div className={style["text"]}>
                              <h3>{tour?.englishCameraOperator.name}</h3>
                              <h5>Camera Operator</h5>
                            </div>
                          </div>
                        </NavLink>
                        <NavLink
                          to={`/viewtechnical/${tour?.englishDirector?._id}/tourGuide`}
                        >
                          <div className={style["person"]}>
                            <img src={`http://localhost:5000/${tour?.englishDirector?.img}`} alt="avatar" />
                            <div className={style["text"]}>
                              <h3>{tour?.englishDirector.name}</h3>
                              <h5>Director</h5>
                            </div>
                          </div>
                        </NavLink>
                      </>
                    }
                    {
                      bookedLang === "Italian" &&
                      <>
                        <h4>This tour by</h4>
                        <NavLink
                          to={`/viewtechnical/${tour?.italianTourGuide?._id}/tourGuide`}
                        >
                          <div className={style["person"]}>
                            <img src={`http://localhost:5000/${tour?.italianTourGuide?.img}`} alt="avatar" />
                            <div className={style["text"]}>
                              <h3>{tour?.italianTourGuide.name}</h3>
                              <h5>Tour Guide</h5>
                            </div>
                          </div>
                        </NavLink>
                        <NavLink
                          to={`/viewtechnical/${tour?.italianCameraOperator?._id}/tourGuide`}
                        >
                          <div className={style["person"]}>
                            <img src={`http://localhost:5000/${tour?.italianCameraOperator?.img}`} alt="avatar" />
                            <div className={style["text"]}>
                              <h3>{tour?.italianCameraOperator.name}</h3>
                              <h5>Camera Operator</h5>
                            </div>
                          </div>
                        </NavLink>
                        <NavLink
                          to={`/viewtechnical/${tour?.italianDirector?._id}/tourGuide`}
                        >
                          <div className={style["person"]}>
                            <img src={`http://localhost:5000/${tour?.italianDirector?.img}`} alt="avatar" />
                            <div className={style["text"]}>
                              <h3>{tour?.italianDirector.name}</h3>
                              <h5>Director</h5>
                            </div>
                          </div>
                        </NavLink>
                      </>
                    }

                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </div>

      <footer>
        <div className={style["container"]}>
          <div className={style["footer__content"]}>
            <ul>
              <li><img src={logo1} alt='' /></li>
              <li>Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam mauris sed ma</li>
              <li className={style["links"]}>
                <a href="#"><img src={facebook} alt='' /></a>
                <a href="#"><img src={twitter} alt='' /></a>
                <a href="#"><img src={instagram} alt='' /></a>
                <a href="#"><img src={linked} alt='' /></a>
                <a href="#"><img src={youtube} alt='' /></a>
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
    </div>
  )
}

export default TourDetails
