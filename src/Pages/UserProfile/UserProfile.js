import React, { useState, useEffect } from "react";
import style from "./userProfile.module.css";
import Vector from "../../assets/Vector.svg";
import Vector1 from "../../assets/Vector (1).svg";
import logo from "../../assets/logo.png";
import United_Kingdom from "../../assets/United Kingdom (GB).png";
import egypt from "../../assets/Egypt (EG).png";
import egypt1 from "../../assets/Egypt (EG) (1).png";
import frame27 from "../../assets/Frame 27.png";
import image1 from "../../assets/01.png";
import rounded from "../../assets/Line Rounded.png";
import group66 from "../../assets/Group 39466.svg";
import logo1 from "../../assets/logo (1).png";
import facebook from "../../assets/Facebook.svg";
import twitter from "../../assets/Twitter.svg";
import youtube from "../../assets/YouTube.svg";
import linked from "../../assets/LinkedIn.svg";
import instagram from "../../assets/Instagram.svg";
import frame97 from "../../assets/Frame 39497.png";
import frame98 from "../../assets/Frame 39498.png";
import axios from "axios";
// import Select from 'react-select';
import Modalstyle from "./EditModal.module.css";
import UserCoverModalStyle from "./UserCoverModal.module.css";
import UserProfileModalStyle from "./UserProfileModal.module.css";
import Card from "../Card/Card";
import SuccessandErrorModals from "../SuccessandErorrModals/SuccessandErrorModals";
import Navbar from "../Navbar/Navbar";

function UserProfile() {
  //UserData
  const [userData, setUserData] = useState("");
  const userRole = localStorage.getItem("role");
  const userId = JSON.parse(localStorage.getItem("id"));

  const [lang, setLang] = useState("english");
  const [tap, setTap] = useState("about");
  const [menu, setMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [data, setData] = useState([]);
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  //to show updated data immediately
  const [updateUserData, setUpdateUserData] = useState(userData);
  const [booked, setBooked] = useState([]);
  const [unFinished, setUnFinished] = useState([]);

  //successModal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSuccessProfileModal, setShowSuccessProfileModal] = useState(false);
  const [showSuccessCoverModal, setShowSuccessCoverModal] = useState(false);

  //Error
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorCoverModal, setShowErrorCoverModal] = useState(false);
  const [showErrorProfileModal, setShowErrorProfileModal] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = date
      .toLocaleDateString("en-US", options)
      .replace(/,/g, "");
    const parts = formattedDate.split(" ");
    return `${parts[1]} ${parts[0]}, ${parts[2]}`;
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/user/getOneUser", { id: userId })
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    axios
      .get("http://localhost:5000/user/getBooks", {
        params: { id: localStorage.getItem("id") },
      })
      .then((res) => {
        console.log(res);
        // setBooked(res.data)
        const newBooked = [];
        const others = [] 

        for (let i = 0; i < res.data.length; i++) {
          console.log(res.data[i])
          const endTime = new Date(res.data[i].tour.endTime);
          
          if (endTime < new Date()) {
            console.log(endTime)
            newBooked.push(res.data[i]);
          }
          else{
            others.push(res.data[i]);
            console.log(others)
          }
        }

        // Add the newBooked items to the existing booked array
        setBooked((prevBooked) => [...newBooked]);
        setUnFinished((prevBooked) => [...others]);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => {
        setData(res.data);
        let countries = [...new Set(res.data.map((item) => item.country))];
        countries.sort();
        setCountry(countries);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCountryChange = (e) => {
    setEditCity(""); // Reset editCity when the country changes
    setEditAddress(""); // Reset editAddress when the country changes
  };

  const updateUserProfile = () => {
    if (
      !editName ||
      !editPhone ||
      !editDescription ||
      !editAddress ||
      !editCity
    ) {
      setShowErrorModal(true); // Show the error modal
      setTimeout(() => {
        setShowErrorModal(false); // Hide the error modal after 3 seconds
      }, 3000);
    } else {
      axios
        .put(`http://localhost:5000/user/editInfo`, {
          name: editName,
          id: userId,
          description: editDescription,
          phone: editPhone,
          address: editAddress,
          city: editCity,
        })
        .then((res) => {
          setShowEditModal(false);
          axios
            .post("http://localhost:5000/user/getOneUser", { id: userId })
            .then((res) => {
              setUserData(res.data.data);
              setShowSuccessModal(true);
              setTimeout(() => {
                setShowSuccessModal(false);
              }, 3000);
            });
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        });
    }
  };

  //edit cover Image

  const [showCoverModal, setShowCoverModal] = useState(false);

  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState("");

  const handleCoverImageSelection = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setSelectedCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCoverImageSaveChanges = () => {
    if (!selectedCoverImage) {
      setShowErrorCoverModal(true);
      setTimeout(() => {
        setShowErrorCoverModal(false);
      }, 3000);
      return;
    }

    const formData = new FormData();
    formData.append("coverImg", selectedCoverImage);
    formData.append("id", userId);

    axios
      .put("http://localhost:5000/user/editCoverImage", formData)
      .then((response) => {
        setShowCoverModal(false);
        axios
          .post("http://localhost:5000/user/getOneUser", { id: userId })
          .then((res) => {
            setUserData(res.data.data);
            setShowSuccessCoverModal(true);
            setTimeout(() => {
              setShowSuccessCoverModal(false);
            }, 3000);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating cover image:", error);
      });
  };

  //edit Profile Image

  const [showProfileModal, setShowProfileModal] = useState(false);

  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const handleProfileImageSelection = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setSelectedProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleProfileImageSaveChanges = () => {
    if (!selectedProfileImage) {
      setShowErrorProfileModal(true);
      setTimeout(() => {
        setShowErrorProfileModal(false);
      }, 3000);
      return;
    }

    const formData = new FormData();
    formData.append("img", selectedProfileImage);
    formData.append("id", userId);

    axios
      .put("http://localhost:5000/user/editImage", formData)
      .then((response) => {
        setShowProfileModal(false);

        axios
          .post("http://localhost:5000/user/getOneUser", { id: userId })
          .then((res) => {
            setUserData(res.data.data);
            setShowSuccessProfileModal(true);
            setTimeout(() => {
              setShowSuccessProfileModal(false);
            }, 3000);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating cover image:", error);
      });
  };

  return (
    <div>
      <Navbar />

      <div className={style["path"]}>
        <div className={style["container"]}>
          <div className={style["path__content"]}>
            <h3>Home</h3>
            <img src={Vector1} alt="" />
            <h3>Users</h3>
            <img src={Vector1} alt="" />
            <h3>{userData?.name}</h3>
          </div>
        </div>
      </div>
      <div className={style["profile"]}>
        <div className={style["container"]}>
          <div className={style["profile__content"]}>
            <i
              className="fa-solid fa-plus"
              style={{ color: "#000000", cursor: "pointer" }}
              onClick={() => setShowCoverModal(true)}
            ></i>
            {/* Success Modal */}
            {showSuccessCoverModal && (
              <SuccessandErrorModals
                message={"Your Cover Edited Successfully"}
                success={true}
              />
            )}
            {/* Error Modal */}
            {showErrorCoverModal && (
              <SuccessandErrorModals
                message={"No Cover image selected"}
                success={false}
              />
            )}

            {showCoverModal && (
              <div className={UserCoverModalStyle["usercover-modal__overlay"]}>
                <div
                  className={UserCoverModalStyle["usercover-modal__content"]}
                >
                  <div
                    className={UserCoverModalStyle["usercovermodal__header"]}
                  >
                    <h2>Edit Cover Image</h2>
                  </div>
                  <div className={UserCoverModalStyle["usercovermodal__input"]}>
                    <input
                      type="file"
                      id="img"
                      name="img"
                      onChange={handleCoverImageSelection}
                    />
                    {coverImagePreview && (
                      <img
                        src={coverImagePreview}
                        alt="Selected Cover"
                        className={UserCoverModalStyle["usercover-preview"]}
                      />
                    )}
                    <div
                      className={UserCoverModalStyle["usercovermodal__actions"]}
                    >
                      <button onClick={() => setShowCoverModal(false)}>
                        Cancel
                      </button>
                      <button onClick={() => handleCoverImageSaveChanges()}>
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <img src={`http://localhost:5000/${userData.coverImg}`} alt="" />
          </div>
          <div className={style["profile__info"]}>
            <img
              className={style["profile__info__image"]}
              src={`http://localhost:5000/${userData.img}`}
              alt=""
            />
            <i
              className="fa-solid fa-plus"
              style={{ color: "#000000", cursor: "pointer" }}
              onClick={() => setShowProfileModal(true)}
            ></i>
            {/* Success Modal */}
            {showSuccessProfileModal && (
              <SuccessandErrorModals
                message={"Your Picture Edited Successfully"}
                success={true}
              />
            )}
            {/* Error Modal */}
            {showErrorProfileModal && (
              <SuccessandErrorModals
                message={"No Profile image selected"}
                success={false}
              />
            )}

            {showProfileModal && (
              <div
                className={UserProfileModalStyle["userprofile-modal__overlay"]}
              >
                <div
                  className={
                    UserProfileModalStyle["userprofile-modal__content"]
                  }
                >
                  <div
                    className={
                      UserProfileModalStyle["userprofilemodal__header"]
                    }
                  >
                    <h2>Edit Profile Image</h2>
                  </div>
                  <div
                    className={UserProfileModalStyle["userprofilemodal__input"]}
                  >
                    <input
                      type="file"
                      id="img"
                      name="img"
                      onChange={handleProfileImageSelection}
                    />
                    {profileImagePreview && (
                      <img
                        src={profileImagePreview}
                        alt="Selected Image"
                        className={
                          UserProfileModalStyle["userprofile-preview-modal"]
                        }
                        // style={{marginTop: '10px',
                        //   width: '100%',
                        //   maxHeight: '350px'}}
                      />
                    )}
                    <div
                      className={
                        UserProfileModalStyle["userprofilemodal__actions"]
                      }
                    >
                      <button onClick={() => setShowProfileModal(false)}>
                        Cancel
                      </button>
                      <button onClick={() => handleProfileImageSaveChanges()}>
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className={style["profile__text"]}>
              <div>
                <h3>{userData?.name}</h3>
                {userRole === "user" && <h4>User</h4>}
              </div>
              <div className={style["edit__button"]}>
                <a href="#" onClick={() => setShowEditModal(true)}>
                  Edit Profile
                </a>
                {/* Success Modal */}
                {showSuccessModal && (
                  <SuccessandErrorModals
                    message={"Your Information Edited Successfully"}
                    success={true}
                  />
                )}
                {/* Error Modal */}
                {showErrorModal && (
                  <SuccessandErrorModals
                    message={"Please Fill All Fields."}
                    success={false}
                  />
                )}

                {/* Modal */}
                {showEditModal && (
                  <div className={Modalstyle["modal__overlay"]}>
                    <div className={Modalstyle["modal__content"]}>
                      <div className={Modalstyle["modal__header"]}>
                        <h2>Edit Profile</h2>
                        <i
                          className="fa-regular fa-circle-xmark"
                          style={{
                            color: "#000000",
                            fontSize: "25px",
                            fontWeight: "600",
                            cursor: "pointer",
                          }}
                          onClick={() => setShowEditModal(false)}
                        ></i>
                      </div>
                      <div className={Modalstyle["input__field"]}>
                        <label>Name:</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                      </div>
                      <div className={Modalstyle["input__field"]}>
                        <label>Description:</label>
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                        />
                      </div>
                      <div className={Modalstyle["input__field"]}>
                        <label>Phone:</label>
                        <input
                          type="text"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                        />
                      </div>
                      <div className={Modalstyle["input__field"]}>
                        <label>Address:</label>
                        <select
                          value={editAddress}
                          onChange={(e) => setEditAddress(e.target.value)}
                        >
                          <option>Select Country</option>
                          {country?.map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className={Modalstyle["input__field"]}>
                        <label>City:</label>
                        <select
                          value={editCity}
                          onChange={(e) => setEditCity(e.target.value)}
                        >
                          <option>Select City</option>
                          {editAddress !== "Select Country" &&
                            data
                              .filter((item) => item.country === editAddress)
                              .map((item, index) => (
                                <option key={index} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                        </select>
                      </div>

                      <div className={Modalstyle["modal__actions"]}>
                        <button onClick={() => setShowEditModal(false)}>
                          Cancel
                        </button>
                        <button onClick={updateUserProfile}>
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style["profile-main-content"]}>
        <div className={style["container"]}>
          <div className={style["profile-main-content__content"]}>
            <div className={style["profile-main-content__info"]}>
              <div className={style["tabs"]}>
                <a
                  className={` ${tap === "about" ? style.active : ""}`}
                  onClick={() => {
                    setTap("about");
                  }}
                >
                  About
                </a>
                <a
                  className={` ${tap === "tours" ? style.active : ""}`}
                  onClick={() => {
                    setTap("tours");
                  }}
                >
                  {userData?.name}’s Finished Tours
                </a>
                <a
                  className={` ${tap === "pending" ? style.active : ""}`}
                  onClick={() => {
                    setTap("pending");
                  }}
                >
                  {userData?.name}’s Pending Tours
                </a>
              </div>
              <div
                style={{
                  display: tap === "tours" ? "flex" : "",
                  flexWrap: tap === "tours" ? "wrap" : "",
                  justifyContent: tap === "tours" ? "space-between" : "",
                }}
                className={style["text"]}
                id="text"
              >
                {tap === "about" && (
                  <>
                    <h4>Description</h4>
                    {userData?.description ? (
                      <p>{userData.description}</p>
                    ) : (
                      <p style={{ margin: "10px 0" }}>
                        You don't have description yet!
                      </p>
                    )}
                    <h4>Phone</h4>
                    {userData?.phone ? (
                      <p>{userData.phone}</p>
                    ) : (
                      <p style={{ margin: "10px 0" }}>
                        You don't have a phone number yet!
                      </p>
                    )}

                    <h4>Address</h4>
                    {userData?.address ? (
                      <p>
                        {userData?.city},{userData?.address}
                      </p>
                    ) : (
                      <p style={{ margin: "10px 0" }}>
                        You don't have address yet!
                      </p>
                    )}
                    <p>Joined since {formatDate(userData?.joinedAt)}</p>
                  </>
                )}
                {tap == "tours" && (
                  <>
                    {booked?.length > 0 ? (
                      booked.map((book) => {
                        return (
                          <Card
                            key={book._id}
                            data={book.tour}
                            review={true}
                            id={book._id}
                            isReview={book.isReviewed}
                          />
                        ); // Assuming the tour object has a title field
                      })
                    ) : (
                      <p style={{ margin: "10px 0" }}>
                        You don't have any tour yet!
                      </p>
                    )}
                  </>
                )}
                {tap == "pending" && (
                  <>
                    {unFinished?.length > 0 ? (
                      unFinished.map((book) => {
                        return (
                          <Card
                            key={book._id}
                            data={book.tour}
                            review={false}
                            id={book._id}
                            isReview={book.isReviewed}
                          />
                        ); // Assuming the tour object has a title field
                      })
                    ) : (
                      <p style={{ margin: "10px 0" }}>
                        You don't have any tour yet!
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className={style["container"]}>
          <div className={style["footer__content"]}>
            <ul>
              <li>
                <img src={logo1} alt="" />
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
                mauris sed ma
              </li>
              <li className={style["links"]}>
                <a href="#">
                  <img src={facebook} alt="" />
                </a>
                <a href="#">
                  <img src={twitter} alt="" />
                </a>
                <a href="#">
                  <img src={instagram} alt="" />
                </a>
                <a href="#">
                  <img src={linked} alt="" />
                </a>
                <a href="#">
                  <img src={youtube} alt="" />
                </a>
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
              <li>
                <img src={frame97} alt="" />
              </li>
              <li>
                <img src={frame98} alt="" />
              </li>
            </ul>
          </div>
          <div className={style["footer__footer"]}>
            <h4>Copyright © 2023 LVW.</h4>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default UserProfile;
