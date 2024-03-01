import React, { useState, useEffect } from "react";
import style from "./vipform.module.css";
import t from '../../assets/01.png'
import { Button, Input } from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import SuccessandErrorModals from "../SuccessandErorrModals/SuccessandErrorModals";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Footer from '../Footer/Footer'
import { NavLink } from "react-router-dom";



function VipForm() {

  const navigate = useNavigate();

  const [modalLanguage, setModalLanguage] = useState("");
  const [emails, setEmails] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().add(72, "hour"));

  const [showSuccessBookModal, setShowSuccessBookModal] = useState(false);
  const [showErrorBookModal, setShowErrorBookModal] = useState(false);
  const [showErrorMsg, setErrorMsg] = useState("");
  const [showSuccessMsg, setSuccessMsg] = useState("");
  const [tour, setTour] = useState();
  const [userData, setUserData] = useState()
  const [language, setLanguage] = useState([]);
  const [fontSize, setFontSize] = useState("20px");


  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  console.log(location.state.id);

  const handleEmailChange = (index, value) => {
    const updatedInstructions = [...emails];
    updatedInstructions[index] = value;
    setEmails(updatedInstructions);
    console.log(emails);
  };
  function languages(data) {
    let updatedLanguages = [];
    if (data.arabicTourGuide) {
      updatedLanguages.push("Arabic");
    }
    if (data.englishTourGuide) {
      updatedLanguages.push("English");
    }
    if (data.italianTourGuide) {
      updatedLanguages.push("Italian");
    }
    setLanguage(updatedLanguages);
  }

  const handleAddEmail = () => {
    setEmails([...emails, ""]);
  };

  useEffect(() => {
    let id = localStorage.getItem("id")
    if (!id) {
      navigate("/login");
    } else {
      axios
        .post("http://localhost:5000/user/getOneUser", {
          id: JSON.parse(localStorage.getItem("id")),
        })
        .then((res) => {
          setUserData(res.data.data);
        })
    }
    axios
      .get("http://localhost:5000/user/oneTour", {
        params: { id: location.state.id },
      })
      .then((res) => {
        console.log(res.data)
        languages(res.data);
        setTour(res.data);
      });

      const handleResize = () => {
        const viewportWidth = window.innerWidth;
        // Define viewport width to font size mapping
        const fontSizeMapping = {
          1200: "20px",
          1100: "16px",
          900: "14px",
          800: "13px",
          750: "17px",
          682: "20px",
          390: "17px",
          340: "16px",
          320: "15px",
          305: "14px",
          286: "13px",
        };
  
        // Find the appropriate font size based on the current viewport width
        let selectedFontSize = "20px"; // Default font size
        for (let width in fontSizeMapping) {
          if (viewportWidth <= parseInt(width)) {
            selectedFontSize = fontSizeMapping[width];
            break;
          }
        }
        setFontSize(selectedFontSize);
      };
  
      // Call handleResize when window is resized
      window.addEventListener('resize', handleResize);
  
      // Call handleResize initially to set the font size on component mount
      handleResize();
  
      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };

  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  async function submit() {
    console.log(new Date(selectedDate))
    console.log(emails)
    console.log(modalLanguage)
    if (localStorage.getItem("role") == "user") {
      const cardElement = elements.getElement("card");
      if (!stripe || !elements || !cardElement) {
        // Stripe.js has not loaded yet, wait for it to load.
        return;
      }

      try {
        // Fetch the client secret from your server
        const response = await axios.post(
          "http://localhost:5000/getClientSecret",
          {
            amount: tour?.hours * 5 * tour?.price * 100, // Pass the payment amount and convert to cents
            metadata: {
              userId: JSON.parse(localStorage.getItem("id")),
              userName: userData?.name, // Replace with the actual user name
              userEmail: userData?.email, // Replace with the actual user email
            },
          }
        );

        const clientSecret = response.data.clientSecret;

        // Confirm the payment with Stripe using the retrieved client secret
        const { paymentIntent, error } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              type: "card",
              card: cardElement,
            },
          }
        );

        if (error) {
          // Handle payment error
          console.error("Payment failed:", error.message);
        } else if (paymentIntent) {
          // Payment succeeded, you can now access payment data
          const paymentMethod = paymentIntent.payment_method;
          const cardDetails = paymentMethod.card;
          if (paymentMethod && cardDetails && cardDetails.last4) {
            console.log("Last 4 digits:", cardDetails.last4);
          }
          axios.post("http://localhost:5000/user/makeRequest", {
            tour: tour._id,
            emails: emails,
            language: modalLanguage,
            user: JSON.parse(localStorage.getItem("id")),
            startTime: new Date(selectedDate)
          })

          if (response.data.status === 200) {
            // Handle success logic here, e.g., show a success message and navigate to a confirmation page
            setShowSuccessBookModal(true);
            // setIsBookingDisabled(true); // Disable the button
            setTimeout(() => {
              setShowSuccessBookModal(false);
              window.location.reload();
            }, 3000);
          } else if (response.status === 500) {
            setShowErrorBookModal(true);
            setErrorMsg(response.data.message);
            setTimeout(() => {
              setShowErrorBookModal(false);
            }, 3000);
          }
        }
      } catch (error) {
        // Handle server error or any other errors
        console.error("Error processing payment:", error);

        // Handle error logic here, e.g., show an error message
        setErrorMsg("An error occurred while processing your payment.");
        setShowErrorBookModal(true);
        setTimeout(() => {
          setShowErrorBookModal(false);
        }, 3000);
      }
    }



  }
  const formattedDate = new Date(tour?.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Navbar />
      <div className={style['bgImage']}></div>
      <div className={style['the__header__title']}>
        <h1>Private Tour Booking</h1>
      </div>
      <div className={style['vip__content']}>
        <div className={style['container']}>
          <div className={style['the__tour__details']}>
            <div className={style['tour__left']}>
              <h2>{tour?.title}</h2>
              <p>{tour?.description}</p>
              <div className={style['tour__icons']}>
                <p><i class="fa-regular fa-clock"></i>Tour Duration: {tour?.hours}</p>
                <p><i class="fa-solid fa-dollar-sign"></i>Tour Price: {tour?.price}</p>
                <p><i class="fa-solid fa-users-line"></i>Number of Guests: 5</p>
                <p><i class="fa-solid fa-calendar-check"></i>Tour Date: {formattedDate}</p>
              </div>
            </div>
            <div className={style['tour__right']}>
              {
                tour?.img.slice(0, 3).map((img) =>
                  <img src={`http://localhost:5000/${img}`} />
                )
              }
            </div>
          </div>
          <div className={style['booking__sec']}>
            <div className={style['booking__form__left']}>
              <h2>Tour Schedule</h2>
              <div className={style['schedule__box']}>
                <div className={style['box__container']}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={[
                        'DateTimePicker',
                        'MobileDateTimePicker',
                        'DesktopDateTimePicker',
                        'StaticDateTimePicker',
                      ]}
                    >
                      <DemoItem label="Select Date and Time">
                        <DateTimePicker
                          defaultValue={dayjs().add(72, "hour")}
                          onChange={handleDateChange}
                          minDate={dayjs().add(72, "hour")}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                  <div className={style['my__custom__label']}>
                    <label className={style['my__custom__label']}>Select Language</label>
                  </div>
                  <FormControl sx={{ m: 1, width: "100%", margin: '0px', marginTop: '10px', border: 'none' }}>
                    <Select
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      onChange={(e) => {
                        setModalLanguage(e.target.value);
                      }}
                      defaultValue={0}
                      style={{ borderRadius: '15px', backgroundColor: 'white' }}
                    >
                      <MenuItem disabled value={0}>
                        Select Language
                      </MenuItem>
                      <MenuItem value={"arabic"}>Arabic</MenuItem>
                      <MenuItem value={"english"}>English</MenuItem>
                      <MenuItem value={"italian"}>Italian</MenuItem>
                    </Select>
                  </FormControl>
                  <p>* If you want to invite anyone click on the button to add emails</p>
                  <button
                    className={style['addemail__but']}
                    onClick={handleAddEmail}
                  >Add Email +</button>
                  {emails.map((email, index) => (
                    <Box
                      sx={{
                        width: '100%',
                        maxWidth: '100%',
                      }}
                    >
                      <TextField
                        value={email}
                        onChange={(e) => handleEmailChange(index, e.target.value)}
                        fullWidth id="fullWidth" placeholder="example@email.com" />
                    </Box>
                  ))}
                  <div className={style['card__element']}>
                    <CardElement
                      options={{
                        hidePostalCode: true,
                        style: {
                          base: {
                            zIndex: "999",
                            fontSize: fontSize,
                            color: "#424770",
                            "::placeholder": {
                              color: "#aab7c4",
                            },
                          },
                          invalid: {
                            color: "#9e2146",
                          },
                        },
                      }}
                    />
                  </div>
                  <div className={style['border__bottom__div']}></div>
                  <div className={style['total']}>
                    <p>Total</p>
                    <p>{tour?.hours * 5 * tour?.price}$</p>
                  </div>
                  <button
                    className={style['submit__btn']}
                    onClick={(e) => {
                      e.preventDefault()
                      submit()
                    }}>Send Request</button>
                </div>
              </div>
            </div>
            <div className={style['tour__technicals']}>
              <h2>This Tour By:</h2>
              {
                tour?.arabicTourGuide &&
                <>
                  <h2>Arabic Language:</h2>
                  <NavLink
                    to={`/viewtechnical/${tour?.arabicTourGuide?._id}/tourGuide`}
                  >
                    <div className={style['tec__box']}>
                      <div className={style['tech__container']}>
                        <img src={`http://localhost:5000/${tour?.arabicTourGuide?.img}`} />
                        <div className={style['tec__info']}>
                          <h3>{tour?.arabicTourGuide?.name}</h3>
                          <p>Tour Guide</p>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                  <NavLink
                    to={`/viewtechnical/${tour?.arabicCameraOperator?._id}/CameraOperator`}
                  >
                    <div className={style['tec__box']}>
                      <div className={style['tech__container']}>
                        <img src={`http://localhost:5000/${tour?.arabicCameraOperator?.img}`} />
                        <div className={style['tec__info']}>
                          <h3>{tour?.arabicCameraOperator?.name}</h3>
                          <p>Camera Operator</p>
                        </div>
                      </div>
                    </div>
                  </NavLink>

                </>
              }
              {
                tour?.englishTourGuide &&
                <>
                  <h2>English Language:</h2>
                  <NavLink
                    to={`/viewtechnical/${tour?.englishTourGuide?._id}/tourGuide`}
                  >
                    <div className={style['tec__box']}>
                      <div className={style['tech__container']}>
                        <img src={`http://localhost:5000/${tour?.englishTourGuide?.img}`} />
                        <div className={style['tec__info']}>
                          <h3>{tour?.englishTourGuide?.name}</h3>
                          <p>Tour Guide</p>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                  <NavLink
                    to={`/viewtechnical/${tour?.englishCameraOperator?._id}/CameraOperator`}
                  >
                    <div className={style['tec__box']}>
                      <div className={style['tech__container']}>
                        <img src={`http://localhost:5000/${tour?.englishCameraOperator?.img}`} />
                        <div className={style['tec__info']}>
                          <h3>{tour?.englishCameraOperator?.name}</h3>
                          <p>Camera Operator</p>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </>
              }
              {
                tour?.italianTourGuide &&
                <>
                  <h2>Italian Language:</h2>
                  <NavLink
                    to={`/viewtechnical/${tour?.italianTourGuide?._id}/tourGuide`}
                  >
                    <div className={style['tec__box']}>
                      <div className={style['tech__container']}>
                        <img src={`http://localhost:5000/${tour?.italianTourGuide?.img}`} />
                        <div className={style['tec__info']}>
                          <h3>{tour?.italianTourGuide?.name}</h3>
                          <p>Tour Guide</p>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                  <NavLink
                    to={`/viewtechnical/${tour?.italianCameraOperator?._id}/CameraOperator`}
                  >
                    <div className={style['tec__box']}>
                      <div className={style['tech__container']}>
                        <img src={`http://localhost:5000/${tour?.italianCameraOperator?.img}`} />
                        <div className={style['tec__info']}>
                          <h3>{tour?.italianCameraOperator?.name}</h3>
                          <p>Camera Operator</p>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </>
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default VipForm;
