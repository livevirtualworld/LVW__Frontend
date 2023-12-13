import React, { useState, useEffect } from "react";
import style from './vipform.module.css'
import Img from '../../assets/image 5.png'
import { Button, Input } from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import SuccessandErrorModals from "../SuccessandErorrModals/SuccessandErrorModals";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';



function VipForm() {
  const [modalLanguage, setModalLanguage] = useState("")
  const [emails, setEmails] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().add(48, 'hour'));

  const [showSuccessBookModal, setShowSuccessBookModal] = useState(false);
  const [showErrorBookModal, setShowErrorBookModal] = useState(false);
  const [showErrorMsg, setErrorMsg] = useState("");
  const [showSuccessMsg, setSuccessMsg] = useState("");

  const stripe = useStripe();
  const elements = useElements();


  const handleEmailChange = (index, value) => {
    const updatedInstructions = [...emails];
    updatedInstructions[index] = value;
    setEmails(updatedInstructions);
    console.log(emails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, ""]);
  };

  useEffect(() => {
    // Set the initial available date to 48 hours from the current date
    const currentDate = dayjs();
    const minDate = dayjs().add(48, 'hour');
    setSelectedDate(dayjs(minDate)); // Convert to dayjs object
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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
            {/* {tour?.img?.length > 0 && (
              <img src={`http://localhost:5000/${tour?.img[0]}`} />
            )} */}
            <img src={Img} />
          </div>
          <div className={style["hero__text"]}>
            {/* <h2>{tour?.title}</h2> */}
          </div>

        </div>
      </div>
      <div className={style["container"]}>
        <div className={style["main__div"]}>
          <h1>VIP Request Form</h1>
          <form>
            <label style={{ padding: "0px 20px" }}>
              Select Language
            </label>
            <div className={style["input__field"]}>
              <select
                onChange={(e) => {
                  setModalLanguage(e.target.value);
                }}
                defaultValue={0}
              >
                <option disabled value={0}>
                  select Language
                </option>
                {/* {language.map((l) => {
                              return (
                                <option value={l} key={l}>
                                  {l}
                                </option>
                              );
                            })} */}
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
              <div
                key={index}
                className={style["input__field"]}
              >
                <label style={{ padding: "0px 20px" }}>email {index + 1}</label>
                <Input
                  type="text"
                  value={email}
                  onChange={(e) =>

                    handleEmailChange(index, e.target.value)
                  }
                />
              </div>
            ))}
            <div style={{ marginTop: "40px", marginBottom: "20px" }}>

            </div>
            <div className={style["date__time__div"]}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={[
                    'DateTimePicker',
                    'MobileDateTimePicker',
                    'DesktopDateTimePicker',
                    'StaticDateTimePicker',
                  ]}
                >
                  <DemoItem label="Static variant">
                    <StaticDateTimePicker
                      defaultValue={selectedDate}
                      onChange={handleDateChange}
                      minDate={dayjs().add(48, 'hour')}
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
            <button>Send Request</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default VipForm;