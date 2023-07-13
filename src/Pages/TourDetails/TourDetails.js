import React, { useState } from 'react'
import style from './TourDetails.module.css'
import Vector from '../../assets/Vector.svg'
import Vector1 from '../../assets/Vector (1).svg'
import logo from '../../assets/logo.png'
import United_Kingdom from '../../assets/United Kingdom (GB).png'
import egypt from "../../assets/Egypt (EG).png"
import frame27 from '../../assets/Frame 27.png'
import logo1 from "../../assets/logo (1).png"
import facebook from "../../assets/Facebook.svg"
import twitter from "../../assets/Twitter.svg"
import youtube from "../../assets/YouTube.svg"
import linked from "../../assets/LinkedIn.svg"
import instagram from "../../assets/Instagram.svg"
import frame97 from '../../assets/Frame 39497.png'
import frame98 from '../../assets/Frame 39498.png'
import vecto2 from '../../assets/Vector (2).svg'
import star from '../../assets/Star Icon.svg'
import vectorStroke from '../../assets/Vector (Stroke).svg'
import icon from "../../assets/icons.svg"
import UK from '../../assets/United Kingdom (GB).svg'
import LR from '../../assets/Line Rounded.svg'
import icon1 from '../../assets/icons (1).svg'
import frame111 from "../../assets/Frame 111.png"
import avatar from '../../assets/avatar.png'
import image2 from '../../assets/02.png'
import image21 from '../../assets/02 (1).png'
import frame142 from "../../assets/Frame 142.png"
import frame113 from "../../assets/Frame 113.png"
import frame115 from "../../assets/Frame 115.png"
import image13 from "../../assets/image 13.png"
import image14 from "../../assets/image 14.png"
import image31 from '../../assets/image 3 (1).png'
function TourDetails() {
    const [lang , setLang] = useState("english")
    const [tap,setTap] = useState("about")
    const [menu,setMenu] = useState(false)
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
              <i onClick={()=>{
                if(menu ==false){
                setMenu(true)
                console.log(true)
                }
                else{
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
                    lang =="english" &&
                  <a><img src={United_Kingdom} alt=''/> English</a>
                  }
                  {
                    lang =="arabic" &&
                    <a href="#"><img src={egypt} alt=''/> العربية</a>
                  }
                  {
                    lang =="italiano" &&
                    <a href="#"><img src={United_Kingdom} alt=''/> Italiano</a>
                  }
                  <ul>
                    <li onClick={()=>{
                      setLang("english")
                    }}><a href="#"><img src={United_Kingdom} alt=''/> English</a></li>
                    <li onClick={()=>{
                      setLang("arabic")
                    }}><a href="#"><img src={egypt} alt=''/> العربية</a></li>
                    <li onClick={()=>{
                      setLang("italiano")
                    }}><a href="#"><img src={United_Kingdom} alt=''/> Italiano</a></li>
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
              <h3>Discovering the Mysteries of the Pyramid of Giza Tour</h3>
            </div>
          </div>
        </div>
        <div className={style["hero"]}>
          <div className={style["container"]}>
            <div className={style["hero__content"]}>
              <div className={style["overlay"]}/>
              <img src={frame27} />
              <div className={style["hero__icons"]}>
                <img src={vecto2} />
                <img src={vectorStroke} />
              </div>
              <div className={style["hero__text"]}>
                <h2>Discovering the Mysteries of the Pyramid of Giza Tour</h2>
                <div className={style["stars"]}>
                  <img src={star} />
                  <img src={star} />
                  <img src={star} />
                  <img src={star} />
                  <img src={star} />
                  <h5>(5.0)</h5>
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
                  <a className={` ${tap === "about" ? style.active : ""}`} onClick={()=>{
                    setTap("about")
                  }}>About</a>
                  <a className={` ${tap === "reviews" ? style.active : ""}`} onClick={()=>{
                    setTap("reviews")
                  }}>Reviews</a>
                  <a className={` ${tap === "instructions" ? style.active : ""}`} onClick={()=>{
                    setTap("instructions")
                  }}>Instructions</a>
                  <a className={` ${tap === "media" ? style.active : ""}`} onClick={()=>{
                    setTap("media")
                  }}>Media</a>
                  <a className={` ${tap === "similar" ? style.active : ""}`} onClick={()=>{
                    setTap("similar")
                  }}>Similar Tours</a>
                </div>
            
                  {
                    tap == "about" &&
                    <>
                    <div className={style["main-content"]}>
                  <div className={style["btns"]}>
                    <a><img src={icon} /> Cairo, Egypt</a>
                    <a><img src={icon1} /> 2 Hours</a>
                    <a><img src={UK} /> English</a>
                    <a><img src={LR} /> Arabic</a>
                  </div>
                  <p>Come join us as we take a ride through the desert around the Giza platue, taking in the last of the seven wonders of the world.</p>
                  <p>We will get up close to the great pyramids as I take you back to the time of the builder and the pharaohs who commissioned them.</p>
                  <p>We will start off by taking a look the great sphinx before mounting our camel and riding up the giant causeway making our way round the great pyramids out to one of the most iconic views on earth!</p>
                  <div className={style["tags"]}>
                    <a>Egypt</a>
                    <a>Pyramids</a>
                    <a>Giza</a>
                    <a>History</a>
                    <a>Educational</a>
                    <a>Tourism</a>
                  </div>
                  <div className={style["media"]}>
                    <img src={frame111} />
                  </div>
                  </div>
                  </>
                  }
                  {
                    tap == "reviews" &&
                    <>
                    <div className={style["main-content"]}>
                    <div className={style["review"]}>
          <h3>John Carter</h3>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h6>(5.0)</h6>
          </div>
          <p>“Lorem ipsum dolor sit amet conse ctetur adipiscing lectus a nunc mauris scelerisque sed egestas pharetraol quis pharetra arcu pharetra blandit.”</p>
          <h5>23 May 2023</h5>
        </div>
        <div className={style["review"]}>
          <h3>John Carter</h3>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h6>(5.0)</h6>
          </div>
          <p>“Lorem ipsum dolor sit amet conse ctetur adipiscing lectus a nunc mauris scelerisque sed egestas pharetraol quis pharetra arcu pharetra blandit.”</p>
          <h5>23 May 2023</h5>
        </div>
        <div className={style["review"]}>
          <h3>John Carter</h3>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h6>(5.0)</h6>
          </div>
          <p>“Lorem ipsum dolor sit amet conse ctetur adipiscing lectus a nunc mauris scelerisque sed egestas pharetraol quis pharetra arcu pharetra blandit.”</p>
          <h5>23 May 2023</h5>
        </div>
        <a href="#">View More Reviews</a>
        </div>
                    </>
                  }
                  {
                    tap == "instructions" &&
                    <div className={style["main-content"]}>
                    <h5>No Instructions for this tour</h5>
                    </div>
                  }
                  {
                    tap == "media" &&
                    <>
                    <div className={style["main-content"]}>
                     <div className={style["main-image"]} >
                      <img src={frame142} />
        </div>
        <div className={style["other-media"]}>
          <img src={image13} />
          <img src={image14}/>
          <img src={frame115} />
          <img src={frame113} />
        </div>
        </div>
                    </>
                  }
                  {
                    tap === "similar" &&
                    <>
                  <div className={style["main-conten"]}>
                    <div className={style["card"]}>
          <div className={style["image"]}>
            <img src={image31} />
            <div className={style["btns"]}>
              <a>Public</a>
              <a>Live Now</a>
            </div>
          </div>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h5>(5.0)</h5>
          </div>
          <h3>Discovering the Mysteries of the Pyramid of Giza Tour</h3>
          <h5>Cairo, Egypt</h5>
        </div>
        <div className={style["card"]}>
          <div className={style["image"]}>
            <img src={image31} />
            <div className={style["btns"]}>
              <a>Public</a>
              <a>Live Now</a>
            </div>
          </div>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h5>(5.0)</h5>
          </div>
          <h3>Discovering the Mysteries of the Pyramid of Giza Tour</h3>
          <h5>Cairo, Egypt</h5>
        </div>
        <div className={style["card"]}>
          <div className={style["image"]}>
            <img src={image31} />
            <div className={style["btns"]}>
              <a>Public</a>
              <a>Live Now</a>
            </div>
          </div>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h5>(5.0)</h5>
          </div>
          <h3>Discovering the Mysteries of the Pyramid of Giza Tour</h3>
          <h5>Cairo, Egypt</h5>
        </div>
        <div className={style["card"]}>
          <div className={style["image"]}>
            <img src={image31} />
            <div className={style["btns"]}>
              <a>Public</a>
              <a>Live Now</a>
            </div>
          </div>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h5>(5.0)</h5>
          </div>
          <h3>Discovering the Mysteries of the Pyramid of Giza Tour</h3>
          <h5>Cairo, Egypt</h5>
        </div>
        <div className={style["card"]}>
          <div className={style["image"]}>
            <img src={image31} />
            <div className={style["btns"]}>
              <a>Public</a>
              <a>Live Now</a>
            </div>
          </div>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h5>(5.0)</h5>
          </div>
          <h3>Discovering the Mysteries of the Pyramid of Giza Tour</h3>
          <h5>Cairo, Egypt</h5>
        </div>
        <div className={style["card"]}>
          <div className={style["image"]}>
            <img src={image31} />
            <div className={style["btns"]}>
              <a>Public</a>
              <a>Live Now</a>
            </div>
          </div>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h5>(5.0)</h5>
          </div>
          <h3>Discovering the Mysteries of the Pyramid of Giza Tour</h3>
          <h5>Cairo, Egypt</h5>
        </div>
        <div className={style["card"]}>
          <div className={style["image"]}>
            <img src={image31} />
            <div className={style["btns"]}>
              <a>Public</a>
              <a>Live Now</a>
            </div>
          </div>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h5>(5.0)</h5>
          </div>
          <h3>Discovering the Mysteries of the Pyramid of Giza Tour</h3>
          <h5>Cairo, Egypt</h5>
        </div>
        <div className={style["card"]}>
          <div className={style["image"]}>
            <img src={image31} />
            <div className={style["btns"]}>
              <a>Public</a>
              <a>Live Now</a>
            </div>
          </div>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h5>(5.0)</h5>
          </div>
          <h3>Discovering the Mysteries of the Pyramid of Giza Tour</h3>
          <h5>Cairo, Egypt</h5>
        </div>
        <div className={style["card"]}>
          <div className={style["image"]}>
            <img src={image31} />
            <div className={style["btns"]}>
              <a>Public</a>
              <a>Live Now</a>
            </div>
          </div>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h5>(5.0)</h5>
          </div>
          <h3>Discovering the Mysteries of the Pyramid of Giza Tour</h3>
          <h5>Cairo, Egypt</h5>
        </div>
        <div className={style["card"]}>
          <div className={style["image"]}>
            <img src={image31} />
            <div className={style["btns"]}>
              <a>Public</a>
              <a>Live Now</a>
            </div>
          </div>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h5>(5.0)</h5>
          </div>
          <h3>Discovering the Mysteries of the Pyramid of Giza Tour</h3>
          <h5>Cairo, Egypt</h5>
        </div>
        <div className={style["card"]}>
          <div className={style["image"]}>
            <img src={image31} />
            <div className={style["btns"]}>
              <a>Public</a>
              <a>Live Now</a>
            </div>
          </div>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h5>(5.0)</h5>
          </div>
          <h3>Discovering the Mysteries of the Pyramid of Giza Tour</h3>
          <h5>Cairo, Egypt</h5>
        </div>
        <div className={style["card"]}>
          <div className={style["image"]}>
            <img src={image31} />
            <div className={style["btns"]}>
              <a>Public</a>
              <a>Live Now</a>
            </div>
          </div>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h5>(5.0)</h5>
          </div>
          <h3>Discovering the Mysteries of the Pyramid of Giza Tour</h3>
          <h5>Cairo, Egypt</h5>
        </div>
        <div className={style["card"]}>
          <div className={style["image"]}>
            <img src={image31} />
            <div className={style["btns"]}>
              <a>Public</a>
              <a>Live Now</a>
            </div>
          </div>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h5>(5.0)</h5>
          </div>
          <h3>Discovering the Mysteries of the Pyramid of Giza Tour</h3>
          <h5>Cairo, Egypt</h5>
        </div>
        <div className={style["card"]}>
          <div className={style["image"]}>
            <img src={image31} />
            <div className={style["btns"]}>
              <a>Public</a>
              <a>Live Now</a>
            </div>
          </div>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h5>(5.0)</h5>
          </div>
          <h3>Discovering the Mysteries of the Pyramid of Giza Tour</h3>
          <h5>Cairo, Egypt</h5>
        </div>
        <div className={style["card"]}>
          <div className={style["image"]}>
            <img src={image31} />
            <div className={style["btns"]}>
              <a>Public</a>
              <a>Live Now</a>
            </div>
          </div>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h5>(5.0)</h5>
          </div>
          <h3>Discovering the Mysteries of the Pyramid of Giza Tour</h3>
          <h5>Cairo, Egypt</h5>
        </div>
        <div className={style["card"]}>
          <div className={style["image"]}>
            <img src={image31} />
            <div className={style["btns"]}>
              <a>Public</a>
              <a>Live Now</a>
            </div>
          </div>
          <div className={style["stars"]}>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <h5>(5.0)</h5>
          </div>
          <h3>Discovering the Mysteries of the Pyramid of Giza Tour</h3>
          <h5>Cairo, Egypt</h5>
        </div>
        </div>
                    </>

                  }
                  </div>

              {
                tap !="similar" &&
                <>
              <div className={style["details__book"]}>
                <form>
                  <label>Select Date</label>
                  <input type="date" />
                  <label>Select Time</label>
                  <input step={1800} type="time" ng-model="endTime" pattern="[0-9]*" defaultValue="04:00" />
                  <label>Select Gust Number</label>
                  <div className={style["select"]}>
                    <select>
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
                    <h4>200$</h4>
                  </div>
                  <button type="submit">Book Now</button>
                </form>
                <div className={style["by"]}>
                  <h4>This tour by</h4>
                  <div className={style["person"]}>
                    <img src={avatar} alt="avatar" />
                    <div className={style["text"]}>
                      <h3>Sophie Smith</h3>
                      <h5>Tour Guide</h5>
                    </div>
                  </div>
                  <div className={style["person"]}>
                    <img src={image2} alt="avatar" />
                    <div className={style["text"]}>
                      <h3>Mia Sabchez</h3>
                      <h5>Camera Operator</h5>
                    </div>
                  </div>
                  <div className={style["person"]}>
                    <img src={image21} alt="avatar" />
                    <div className={style["text"]}>
                      <h3>Afraz Explores</h3>
                      <h5>Director</h5>
                    </div>
                  </div>
                </div>
              </div>
                </>
              }
            </div>
          </div>
        </div>
        <footer>
          <div className={style["container"]}>
            <div  className={style["footer__content"]}>
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
                <li><img src={frame97} alt=''/></li>
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
