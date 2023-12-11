import React, { useState, useEffect } from 'react'
import $ from 'jquery';
import style from './Tours.module.css'
import Vector from '../../assets/Vector.svg'
import Vector1 from '../../assets/Vector (1).svg'
import logo from '../../assets/logo.png'
import United_Kingdom from '../../assets/United Kingdom (GB).png'
import egypt from "../../assets/Egypt (EG).png"
// import Map from '../../assets/Map.png'
import SearchMap from '../../assets/Search.png'
import LocationOne from '../../assets/Doc.svg'
import LocationTwo from '../../assets/Doctor.svg'
import BtnOne from '../../assets/btn.svg'
import BtnTwo from '../../assets/btn (1).svg'
import BtnThree from '../../assets/btn (2).svg'
import Chat from '../../assets/chat.svg'
import TourCardImage from '../../assets/image3.png'
import logo1 from "../../assets/logo (1).png"
import facebook from "../../assets/Facebook.svg"
import twitter from "../../assets/Twitter.svg"
import youtube from "../../assets/YouTube.svg"
import linked from "../../assets/LinkedIn.svg"
import instagram from "../../assets/Instagram.svg"
import frame97 from '../../assets/Frame 39497.png'
import frame98 from '../../assets/Frame 39498.png'
import axios from 'axios';
import Card from '../Card/Card';
import Map from '../Home/Map'
import SuccessandErrorModals from '../SuccessandErorrModals/SuccessandErrorModals';
import { NavLink } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Navbar from '../Navbar/Navbar'


function Tours() {
  const [tours, setTours] = useState([])
  const [filteredTours, setFilteresTours] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [liveTours, setLiveTours] = useState([])
  const itemsPerPage = 8; // You can adjust the number of items per page
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentTours = filteredTours?.slice(firstIndex, lastIndex);
  const [data, setData] = useState([]);
  const [country, setCountry] = useState([]);
  const [address, setAddress] = useState("")


  const totalPages = Math.ceil(filteredTours?.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [menu, setMenu] = useState(false)
  const [lang, setLang] = useState("english")

  useEffect(() => {
    axios.get("http://localhost:5000/admin/allTours").then((res) => {
      axios.get("http://localhost:5000/user/getAllBooks").then((result) => {
        console.log(result.data)
        const groupedBokking = result.data.reduce((bookRes, obj) => {
          console.log(bookRes)
          console.log(obj)
          const filteredGrouped = bookRes.find(tour => tour?.id === obj?.tour)
          if (filteredGrouped) {
            filteredGrouped.numberOfGuests += obj.numberOfGuests
          } else {
            bookRes.push({ id: obj?.tour, numberOfGuests: obj.numberOfGuests })
          }
          return bookRes;
        }, []
        )
        // console.log(groupedBokking)
        const repeatedTours = groupedBokking.filter(obj => obj.numberOfGuests >= 5)
        // console.log(repeatedTours)
        const newFilteredBooked = res.data.data.filter(obj => !repeatedTours.some(objTwo => obj._id === objTwo.id))
        console.log(newFilteredBooked)
        const filteredBooke = newFilteredBooked.filter((book) => new Date(book.endTime) > new Date());

        setTours(filteredBooke)
        setFilteresTours(filteredBooke)
      })
    })
    axios.get("http://localhost:5000/user/liveTours").then((res) => {
      setLiveTours(res.data.data)
    })
  }, []);
  useEffect(() => {
    axios.get("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json")
      .then(res => {
        setData(res.data);
        let countries = [...new Set(res.data.map(item => item.country))];
        countries.sort();
        setCountry(countries);
      })
      .catch(err => console.log(err))
  }, []);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleSwitchChange = () => {
    setIsSwitchOn((prev) => !prev);
    if (!isSwitchOn) {
      setFilteresTours(liveTours)
    }
  };

  function search(text) {
    console.log(text)
    const x = tours.filter((tour) => {
      console.log(tour.address)
      return tour.address.toLowerCase().includes(text.toLowerCase())
    })
    setFilteresTours(x)
  }
  return (
    <>
      <Navbar />


      <div className={style["path"]}>
        <div className={style["container"]}>
          <div className={style["path__content"]}>
            <h3>Home</h3>
            <img src={Vector1} alt='' />
            <h3>Tours</h3>
          </div>
        </div>
      </div>

      <section className={style["search__bar__section"]}>
        <div className={style["container"]}>
          <div className={style["search__bar__bk"]}>
            <div className={style["search__bar__items"]}>
              <div className={style["btn__info"]}>
                <i className="fa-solid fa-location-dot " id={style["myicon"]} style={{
                  color: "rgb(6, 12, 19)",
                  "fontSize": "20px",
                  "right": "30px",
                  "position": "absolute",
                  "top": "50%",
                  "transform": "translateY(-50%)",
                }} />
                <select defaultValue={0} onChange={(e) => {
                  setFilteresTours(tours.filter(tour => tour.address === e.target.value))
                  setAddress(e.target.value)
                }}>
                  <option value={0} disabled>Select country</option>
                  {country?.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className={style["btn__info"]}>

                <i className="fa-solid fa-location-dot " id={style["myicon"]} style={{
                  color: "rgb(6, 12, 19)",
                  "fontSize": "20px",
                  "right": "30px",
                  "position": "absolute",
                  "top": "50%",
                  "transform": "translateY(-50%)",
                }} />
                <select defaultValue={0} onChange={(e) => {
                  setFilteresTours(tours.filter(tour => tour.city === e.target.value))

                }}>
                  <option value={0} disabled>Select city</option>
                  {data?.filter(item => item.country === address)
                    .map((item, index) => (
                      <option key={index} value={item.name}>{item.name}</option>
                    ))}
                </select>
              </div>
              <div className={style["btn__info"]}>

                <i className="fa-solid fa-language " id={style["myicon"]} style={{
                  color: "rgb(6, 12, 19)",
                  "fontSize": "20px",
                  "right": "30px",
                  "position": "absolute",
                  "top": "50%",
                  "transform": "translateY(-50%)",
                }} />
                <select defaultValue={0} onChange={(e) => {
                  if (e.target.value === "english") {
                    setFilteresTours(tours?.filter(tour => tour.englishTourGuide))
                    setCurrentPage(1)
                  }
                  if (e.target.value === "arabic")
                    setFilteresTours(tours?.filter(tour => tour.arabicTourGuide))
                  setCurrentPage(1)
                  if (e.target.value === "italian") {
                    setFilteresTours(tours?.filter(tour => tour.italianTourGuide))
                    setCurrentPage(1)
                  }
                }}>
                  <option value={0}>Select language</option>
                  <option value={"arabic"}>arabic</option>
                  <option value={"english"}>english</option>
                  <option value={"italian"}>italian</option>
                </select>
              </div>
              <div className={style["live__now__search"]}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        defaultChecked={false}
                        onChange={handleSwitchChange} // Handle the switch change event
                      />
                    }
                    label="Live Now Only"
                    style={isSwitchOn ? { color: 'red' } : {}}
                  />
                </FormGroup>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={style["tours__map__section"]}>
        <div className={style["container"]}>
          <h2>Map View</h2>
          <Map tours={filteredTours} />
          <div className={style["tours__map__search__bar"]}>
            <img src={SearchMap} alt="" className={style["tours__map__search__icon"]} />
            <input onChange={(e) => { search(e.target.value) }} className={style["search"]} type="search" placeholder="Location..." />
          </div>
        </div>
      </section>

      <section className={style["list__view__section"]}>
        <div className={style["container"]}>
          <h2>List View</h2>
          <div className={style["list__view__cards"]}>
            {currentTours?.map((item) => {
              return <Card key={item._id} data={item} />
            })}

          </div>
          {/* Pagination */}
          <div className={style["pagination"]}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? style["active"] : ""}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

        </div>
      </section>

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
    </>
  );
}

export default Tours;