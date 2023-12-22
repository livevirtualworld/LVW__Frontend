import React, { useState, useEffect } from "react";
import style from "./vipform.module.css";
import Img from "../../assets/image 5.png";
import { Button, Input } from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import SuccessandErrorModals from "../SuccessandErorrModals/SuccessandErrorModals";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';




function VipForm() {
  const navigate = useNavigate();

  const [modalLanguage, setModalLanguage] = useState("");
  const [emails, setEmails] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().add(48, "hour"));

  const [showSuccessBookModal, setShowSuccessBookModal] = useState(false);
  const [showErrorBookModal, setShowErrorBookModal] = useState(false);
  const [showErrorMsg, setErrorMsg] = useState("");
  const [showSuccessMsg, setSuccessMsg] = useState("");
  const [tour, setTour] = useState();
  const [userData, setUserData] = useState()
  const [language, setLanguage] = useState([]);

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
        languages(res.data);
        setTour(res.data);
      });

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

  return (
    <>
      {showSuccessBookModal && (
        <SuccessandErrorModals
          success={true}
          message={"Tour Booked Successfully"}
        />
      )}
      {showErrorBookModal && (
        <SuccessandErrorModals success={false} message={showErrorMsg} />
      )}
      <div className={style["hero"]}>
        <div className={style["container"]}>
          <div className={style["hero__content"]}>
            <div className={style["overlay"]} />
            {tour?.img?.length > 0 && (
              <img src={`http://localhost:5000/${tour?.img[0]}`} />
            )}
            {/* <img src={Img} /> */}
          </div>
          <div className={style["hero__text"]}>
            <h2>{tour?.title}</h2>
          </div>
        </div>
      </div>
      <div className={style["container"]}>
        <div className={style["main__div"]}>
          <h1>VIP Request Form</h1>
          <form>
            <label style={{ padding: "0px 20px" }}>Select Language</label>
            <div className={style["input__field"]}>
              <select
                onChange={(e) => {
                  setModalLanguage(e.target.value);
                }}
                defaultValue={0}
              >
                <option disabled value={0}>
                  Select Language
                </option>
                <option value={"arabic"}>Arabic</option>
                <option value={"english"}>English</option>
                <option value={"italian"}>Italian</option>
              </select>
            </div>
            <div className={style["input__field"]}>
              <Button
                variant="brand"
                mt="40px"
                display="block"
                onClick={handleAddEmail}
              >
                Add Email +
              </Button>
            </div>
            {emails.map((email, index) => (
              <div key={index} className={style["input__field"]}>
                <label style={{ padding: "0px 20px" }}>email {index + 1}</label>
                <Input
                  type="text"
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                />
              </div>
            ))}
            <div style={{ marginTop: "40px", marginBottom: "20px" }}></div>
            <div className={style["date__time__div"]}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={[
                    "DateTimePicker",
                    "MobileDateTimePicker",
                    "DesktopDateTimePicker",
                    "StaticDateTimePicker",
                  ]}
                >
                  <DemoItem label="Static variant">
                    <StaticDateTimePicker
                      defaultValue={dayjs().add(72, "hour")}
                      onChange={handleDateChange}
                      minDate={dayjs().add(72, "hour")}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    zIndex: "999",
                    fontSize: "20px",
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
            <button onClick={(e) => {
              e.preventDefault()
              submit()
            }}>Send Request</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default VipForm;
