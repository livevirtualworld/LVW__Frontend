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
import { json, useLocation } from 'react-router-dom';
import axios from 'axios'
import Card from '../Card/Card';
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
  const location = useLocation();

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
    console.log(location.state)
    axios.get("http://localhost:5000/user/oneTour", { params: { id: location.state } }).then((res) => {
      console.log(res.data)
      setTour(res.data)
      hours(res.data.hours)
      languages(res.data)
    })

    axios.get("http://localhost:5000/user/public").then((res) => {
      console.log(res.data)
      setPublicTours(res.data)
    })

    axios.get("http://localhost:5000/user/vip").then((res) => {
      console.log(res.data)
      setVip(res.data)
    })

  }, [location.state])

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
  return (
    <div>
      <nav>
        <div className={style["container"]}>
          <div className={style["nav__content"]}>
            <div className={style["nav__right"]}>
              <div className={style["nav__logo"]}>
                <img src={logo} alt="logo" />
              </div>
              <div className={style["nav__search"]}>
                <input type="text" placeholder="Tour name or location..." />
              </div>
              <ul className={style["nav__links"]}>
                <li><a>Home</a></li>
                <li className={style["active"]}><a>Tours <img src={Vector} alt='' /></a>
                </li>
                <li><a href="#">Our Mission</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div className={style["menu"]}>
              <i onClick={() => {
                if (menu == false) {
                  setMenu(true)
                  console.log(true)
                }
                else {
                  setMenu(false)
                  console.log(false)
                }

              }} className="fas fa-bars" />
              {
                menu == true &&
                <div className={style["drobdown"]}>
                  <ul className={style["nav__link"]} id="drobDown">
                    <li><a href="#">Home</a></li>
                    <li className={style["active"]}><a>Tours <img src={Vector} alt='' /></a>
                    </li>
                    <li><a href="#">Our Mission</a></li>
                    <li><a href="#">Contact Us</a></li>
                  </ul>
                </div>
              }
            </div>
            <div className={style["nav__left"]}>
              <div className={style["nav__langs"]}>
                {
                  lang == "english" &&
                  <a><img src={United_Kingdom} alt='' /> English</a>
                }
                {
                  lang == "arabic" &&
                  <a href="#"><img src={egypt} alt='' /> العربية</a>
                }
                {
                  lang == "italiano" &&
                  <a href="#"><img src={United_Kingdom} alt='' /> Italiano</a>
                }
                <ul>
                  <li onClick={() => {
                    setLang("english")
                  }}><a href="#"><img src={United_Kingdom} alt='' /> English</a></li>
                  <li onClick={() => {
                    setLang("arabic")
                  }}><a href="#"><img src={egypt} alt='' /> العربية</a></li>
                  <li onClick={() => {
                    setLang("italiano")
                  }}><a href="#"><img src={United_Kingdom} alt='' /> Italiano</a></li>
                </ul>
              </div>
              <div className={style["nav__join"]}>
                <a href="#">Join Us Now</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className={style["path"]}>
        <div className={style["container"]}>
          <div className={style["path__content"]}>
            <h3>Home</h3>
            <img src={Vector1} />
            <h3>Tours</h3>
            <img src={Vector1} />
            <h3>{tour?.title}</h3>
          </div>
        </div>
      </div>
      <div className={style["hero"]}>
        <div className={style["container"]}>
          <div className={style["hero__content"]}>
            <div className={style["overlay"]} />
            {
              tour?.img && <img src={`http://localhost:5000/${tour?.img[0]}`} />
            }
            <div className={style["hero__icons"]}>
              <img src={vecto2} />
              <img src={vectorStroke} />
            </div>
            <div className={style["hero__text"]}>
              <h2>{tour?.title}</h2>
              <div className={style["stars"]}>
                {starIcons}
                {/* <img src={star} />

                  <img src={star} />
                  <img src={star} />
                  <img src={star} />
                  <img src={star} /> */}
                <h5>({(tour?.avgRate?.toFixed(1))})</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                        tour?.arabicTourGuide &&
                        <a><img src={LR} /> Arabic</a>
                      }
                      {
                        tour?.englishTourGuide &&
                        <a><img src={UK} /> English</a>
                      }
                      {
                        tour?.italianTourGuide &&
                        <a><img src={UK} /> Italian</a>
                      }
                    </div>
                    <p>{tour?.description ? tour?.description : "there's no description for this tour"}</p>
                    {/* <p>Come join us as we take a ride through the desert around the Giza platue, taking in the last of the seven wonders of the world.</p>
                  <p>We will get up close to the great pyramids as I take you back to the time of the builder and the pharaohs who commissioned them.</p>
                  <p>We will start off by taking a look the great sphinx before mounting our camel and riding up the giant causeway making our way round the great pyramids out to one of the most iconic views on earth!</p> */}
                    <div className={style["tags"]}>
                      {/* <a>Egypt</a>
                    <a>Pyramids</a>
                    <a>Giza</a>
                    <a>History</a>
                    <a>Educational</a>
                    <a>Tourism</a> */}
                      {tour?.tags && tour?.tags.map((tag, index) => (
                        <a key={index}>{tag}</a>
                      ))}
                    </div>
                    <div className={style["media"]}>
                      {
                        tour?.img && <img src={`http://localhost:5000/${tour?.img[1]}`} />
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
                        publicTours
                          .filter((item) => item._id !== tour?._id) // Assuming currentTourId holds the ID of the tour you want to remove
                          .slice(0, 16)
                          .map((item) => {
                            return <Card key={item._id} data={item} />;
                          })
                      }
                      {
                        tour?.category === "vip" &&
                        publicTours
                          .filter((item) => item._id !== tour?._id) // Assuming currentTourId holds the ID of the tour you want to remove
                          .slice(0, 16)
                          .map((item) => {
                            return <Card key={item._id} data={item} />;
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
                  <form>
                    {/* <label>Select Date</label> */}
                    {/* <input type="date" /> */}
                    {/* <label>Select Time</label> */}
                    {/* <input step={1800} type="time" ng-model="endTime" pattern="[0-9]*" defaultValue="04:00" /> */}
                    <label>Select Language</label>
                    <div className={style["select"]}>
                      <select onChange={(e) => {
                        setBookedLang(e.target.value)
                        console.log(e.target.value)
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
                        console.log(e.target.value)
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
                        console.log(e.target.value)
                      }} defaultValue={0}>
                        <option disabled value={0}>select Number of Guists</option>
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
                    <div className={style["price"]}>

                      <h4>Total</h4>
                      <h4>{bookedHours && bookedNumber ? bookedHours * bookedNumber * tour?.price :
                        bookedHours && !bookedNumber ? tour?.price * bookedHours : !bookedHours && bookedNumber ?
                          tour?.price * bookedNumber : tour?.price}$</h4>
                    </div>
                    <button onClick={(e) => {
                      e.preventDefault()
                      axios.post("http://localhost:5000/user/bookTour", {
                        user: JSON.parse(localStorage.getItem("id")),
                        tour: tour._id,
                        hours: bookedHours,
                        language: bookedLang,
                        num: bookedNumber,
                        price: bookedHours * bookedNumber * tour?.price
                      })
                    }} type="submit">Book Now</button>
                  </form>
                  <div className={style["by"]}>
                    {
                      bookedLang === "Arabic" &&
                      <>
                        <h4>This tour by</h4>
                        <div className={style["person"]}>
                          <img src={`http://localhost:5000/${tour?.arabicTourGuide.img}`} alt="avatar" />
                          <div className={style["text"]}>
                            <h3>{tour?.arabicTourGuide.name}</h3>
                            <h5>Tour Guide</h5>
                          </div>
                        </div>
                        <div className={style["person"]}>
                          <img src={`http://localhost:5000/${tour?.arabicCameraOperator.img}`} alt="avatar" />
                          <div className={style["text"]}>
                            <h3>{tour?.arabicCameraOperator.name}</h3>
                            <h5>Camera Operator</h5>
                          </div>
                        </div>
                        <div className={style["person"]}>
                          <img src={`http://localhost:5000/${tour?.arabicDirector.img}`} alt="avatar" />
                          <div className={style["text"]}>
                            <h3>{tour?.arabicDirector.name}</h3>
                            <h5>Director</h5>
                          </div>
                        </div>
                      </>
                    }
                    {
                      bookedLang === "English" &&
                      <>
                        <h4>This tour by</h4>
                        <div className={style["person"]}>
                          <img src={`http://localhost:5000/${tour?.englishTourGuide.img}`} alt="avatar" />
                          <div className={style["text"]}>
                            <h3>{tour?.englishTourGuide.name}</h3>
                            <h5>Tour Guide</h5>
                          </div>
                        </div>
                        <div className={style["person"]}>
                          <img src={`http://localhost:5000/${tour?.englishCameraOperator.img}`} alt="avatar" />
                          <div className={style["text"]}>
                            <h3>{tour?.englishCameraOperator.name}</h3>
                            <h5>Camera Operator</h5>
                          </div>
                        </div>
                        <div className={style["person"]}>
                          <img src={`http://localhost:5000/${tour?.englishDirector.img}`} alt="avatar" />
                          <div className={style["text"]}>
                            <h3>{tour?.englishDirector.name}</h3>
                            <h5>Director</h5>
                          </div>
                        </div>
                      </>
                    }
                    {
                      bookedLang === "Italian" &&
                      <>
                        <h4>This tour by</h4>
                        <div className={style["person"]}>
                          <img src={`http://localhost:5000/${tour?.italianTourGuide.img}`} alt="avatar" />
                          <div className={style["text"]}>
                            <h3>{tour?.italianTourGuide.name}</h3>
                            <h5>Tour Guide</h5>
                          </div>
                        </div>
                        <div className={style["person"]}>
                          <img src={`http://localhost:5000/${tour?.italianCameraOperator.img}`} alt="avatar" />
                          <div className={style["text"]}>
                            <h3>{tour?.italianCameraOperator.name}</h3>
                            <h5>Camera Operator</h5>
                          </div>
                        </div>
                        <div className={style["person"]}>
                          <img src={`http://localhost:5000/${tour?.italianDirector.img}`} alt="avatar" />
                          <div className={style["text"]}>
                            <h3>{tour?.italianDirector.name}</h3>
                            <h5>Director</h5>
                          </div>
                        </div>
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
