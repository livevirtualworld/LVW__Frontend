import React, { useState, useEffect } from 'react'
import style from './technical.module.css'
import Vector from '../../assets/Vector.svg'
import Vector1 from '../../assets/Vector (1).svg'
import logo from '../../assets/logo.png'
import United_Kingdom from '../../assets/United Kingdom (GB).png'
import egypt from "../../assets/Egypt (EG).png"
import egypt1 from "../../assets/Egypt (EG) (1).png"
import Italy from '../../assets/italy.png'
import frame27 from "../../assets/Frame 27.png"
import image1 from "../../assets/01.png"
import rounded from "../../assets/Line Rounded.png"
import group66 from "../../assets/Group 39466.svg"
import logo1 from "../../assets/logo (1).png"
import facebook from "../../assets/Facebook.svg"
import twitter from "../../assets/Twitter.svg"
import youtube from "../../assets/YouTube.svg"
import linked from "../../assets/LinkedIn.svg"
import instagram from "../../assets/Instagram.svg"
import frame97 from '../../assets/Frame 39497.png'
import frame98 from '../../assets/Frame 39498.png'
import axios from 'axios';
import Modalstyle from './EditModal.module.css';
import Card from '../Card/Card';
import CoverModalStyle from './CoverModal.module.css';
import ProfileModalStyle from './ProfileModal.module.css'
import SuccessandErrorModals from '../SuccessandErorrModals/SuccessandErrorModals'
import Navbar from '../Navbar/Navbar'
import TechnicalCard from '../Card/TechnicalCard'

function TechnicalProfile() {
  //TechnicalData
  const [technicalData, setTechnicalData] = useState("")
  const technicalRole = localStorage.getItem("role")
  console.log("Technical Role from localStorage:", technicalRole);
  const technicalId = JSON.parse(localStorage.getItem("id"));
  console.log("Technical ID from localStorage:", technicalId);

  const [lang, setLang] = useState("english")
  const [tap, setTap] = useState("about")
  const [menu, setMenu] = useState(false)

  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editPhone, setEditPhone] = useState("")
  const [editCity, setEditCity] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [data, setData] = useState([]);
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);

  const [faculty, setFaculty] = useState("");
  const [university, setUniversity] = useState("");
  const [startYear, setStartYear] = useState("");
  const [graduateYear, setGraduateYear] = useState("");

  //successModal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSuccessProfileModal, setShowSuccessProfileModal] = useState(false);
  const [showSuccessCoverModal, setShowSuccessCoverModal] = useState(false);
  const [showSuccessLanguageModal, setShowSuccessLanguageModal] = useState(false)
  const [showSuccessEducationModal, setShowSuccessEducationModal] = useState(false)
  const [showSuccessExperienceModal, setShowSuccessExperienceModal] = useState(false)


  //Error
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorCoverModal, setShowErrorCoverModal] = useState(false);
  const [showErrorProfileModal, setShowErrorProfileModal] = useState(false)
  const [showErrorLanguageModal, setShowErrorLanguageModal] = useState(false)
  const [showErrorEducationModal, setShowErrorEducationModal] = useState(false)
  const [showErrorExperienceModal, setShowErrorExperienceModal] = useState(false)

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options).replace(/,/g, '');
    const parts = formattedDate.split(' ');
    return `${parts[1]} ${parts[0]}, ${parts[2]}`;
  };

  useEffect(() => {
    console.log("tesssst")
    if (JSON.parse(technicalRole) === "tourGuide") {
      console.log(typeof technicalRole)
      console.log("this is tech role", technicalRole)
      axios.post("http://localhost:5000/technical/getOneTourGuide", { id: technicalId })
        .then((res) => {
          console.log(res.data);
          setTechnicalData(res.data.data);
        })
        .catch((error) => {
          console.error("Error fetching Tour Guide data:", error);
        });
    }
    if (JSON.parse(technicalRole) === "cameraOperator") {
      axios.post("http://localhost:5000/technical/getOneCameraOperator", { id: technicalId })
        .then((res) => {
          console.log(res.data);
          setTechnicalData(res.data.data);
        })
        .catch((error) => {
          console.error("Error fetching Camera Operator data:", error);
        });
    }
    if (JSON.parse(technicalRole) === "director") {
      console.log(typeof technicalRole)
      axios.post("http://localhost:5000/technical/getOneDirector", { id: technicalId })
        .then((res) => {
          console.log(res.data);
          setTechnicalData(res.data.data);
        })
        .catch((error) => {
          console.error("Error fetching Director data:", error);
        });
    }
  }, []);

  useEffect(() => {
    axios.get("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json")
      .then(res => {
        setData(res.data);
        console.log(res.data)
        let countries = [...new Set(res.data.map(item => item.country))];
        countries.sort();
        setCountry(countries);
        console.log(countries)
      })
      .catch(err => console.log(err))
  }, []);

  const handleCountryChange = (e) => {
    setEditCity(""); // Reset editCity when the country changes
    setEditAddress(""); // Reset editAddress when the country changes
  };

  console.log("Technical Data:", technicalData);

  const hasAllInformation = technicalData?.faculty && technicalData?.university && technicalData?.startYear && technicalData?.graduateYear;

  // Add state for selected languages and whether to display the select menu
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [displayLanguageSelect, setDisplayLanguageSelect] = useState(true);

  // Function to handle selecting a language
  const handleLanguageSelect = (language) => {
    axios.put("http://localhost:5000/technical/addLang", {
      lang: language,
      id: JSON.parse(localStorage.getItem("id"))
    }).then((res) => {
      if (JSON.parse(technicalRole) === "tourGuide") {
        console.log(typeof technicalRole)
        console.log("this is tech role", technicalRole)
        axios.post("http://localhost:5000/technical/getOneTourGuide", { id: technicalId })
          .then((res) => {
            console.log(res.data);
            setTechnicalData(res.data.data);
          })
          .catch((error) => {
            console.error("Error fetching Tour Guide data:", error);
          });
      }
      if (JSON.parse(technicalRole) === "cameraOperator") {
        axios.post("http://localhost:5000/technical/getOneCameraOperator", { id: technicalId })
          .then((res) => {
            console.log(res.data);
            setTechnicalData(res.data.data);
          })
          .catch((error) => {
            console.error("Error fetching Camera Operator data:", error);
          });
      }
      if (JSON.parse(technicalRole) === "director") {
        console.log(typeof technicalRole)
        axios.post("http://localhost:5000/technical/getOneDirector", { id: technicalId })
          .then((res) => {
            console.log(res.data);
            setTechnicalData(res.data.data);
          })
          .catch((error) => {
            console.error("Error fetching Director data:", error);
          });
      }
    })
    setSelectedLanguages([...selectedLanguages, language]);
    console.log(selectedLanguages)

    // Check if all languages have been selected
    if (selectedLanguages.length === 2) {
      setDisplayLanguageSelect(false);
      setShowSuccessLanguageModal(true);
      setTimeout(() => {
        setShowSuccessLanguageModal(false);
      }, 3000);
    }
  };

  //edit cover Image

  const [showCoverModal, setShowCoverModal] = useState(false);

  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');

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
    formData.append("role", JSON.parse(technicalRole))
    formData.append("id", JSON.parse(technicalId))

    console.log("Selected cover image:", selectedCoverImage);
    console.log("FormData object:", formData);

    axios.put("http://localhost:5000/technical/editCoverImage", formData).then((response) => {
      console.log("Cover image updated successfully:", response.data);
      setShowCoverModal(false)
      if (JSON.parse(technicalRole) === "tourGuide") {
        console.log("this is tech role", technicalRole)
        axios.post("http://localhost:5000/technical/getOneTourGuide", { id: technicalId })
          .then((res) => {
            console.log(res.data);
            setTechnicalData(res.data.data);
            setShowSuccessCoverModal(true);
            setTimeout(() => {
              setShowSuccessCoverModal(false);
            }, 3000);
          })
          .catch((error) => {
            console.error("Error fetching Tour Guide data:", error);
          });
      }
      if (JSON.parse(technicalRole) === "cameraOperator") {
        axios.post("http://localhost:5000/technical/getOneCameraOperator", { id: technicalId })
          .then((res) => {
            console.log(res.data);
            setTechnicalData(res.data.data);
            setShowSuccessCoverModal(true);
            setTimeout(() => {
              setShowSuccessCoverModal(false);
            }, 3000);
          })
          .catch((error) => {
            console.error("Error fetching Camera Operator data:", error);
          });
      }
      if (JSON.parse(technicalRole) === "director") {
        axios.post("http://localhost:5000/technical/getOneDirector", { id: technicalId })
          .then((res) => {
            console.log(res.data);
            setTechnicalData(res.data.data);
            setShowSuccessCoverModal(true);
            setTimeout(() => {
              setShowSuccessCoverModal(false);
            }, 3000);
          })
          .catch((error) => {
            console.error("Error fetching Director data:", error);
          });
      }
    }).catch((error) => {
      console.error("Error updating cover image:", error);
    });
  };

  //edit Profile Image

  const [showProfileModal, setShowProfileModal] = useState(false);

  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('');

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
    formData.append("role", JSON.parse(technicalRole))
    formData.append("id", JSON.parse(technicalId))

    console.log("Selected cover image:", selectedProfileImage);
    console.log("FormData object:", formData);

    axios.put("http://localhost:5000/technical/editImage", formData).then((response) => {
      console.log("Cover image updated successfully:", response.data);
      setShowProfileModal(false)
      if (JSON.parse(technicalRole) === "tourGuide") {
        console.log("this is tech role", technicalRole)
        axios.post("http://localhost:5000/technical/getOneTourGuide", { id: technicalId })
          .then((res) => {
            console.log(res.data);
            setTechnicalData(res.data.data);
            setShowSuccessProfileModal(true);
            setTimeout(() => {
              setShowSuccessProfileModal(false);
            }, 3000);
          })
          .catch((error) => {
            console.error("Error fetching Tour Guide data:", error);
          });
      }
      if (JSON.parse(technicalRole) === "cameraOperator") {
        axios.post("http://localhost:5000/technical/getOneCameraOperator", { id: technicalId })
          .then((res) => {
            console.log(res.data);
            setTechnicalData(res.data.data);
            setShowSuccessProfileModal(true);
            setTimeout(() => {
              setShowSuccessProfileModal(false);
            }, 3000);
          })
          .catch((error) => {
            console.error("Error fetching Camera Operator data:", error);
          });
      }
      if (JSON.parse(technicalRole) === "director") {
        axios.post("http://localhost:5000/technical/getOneDirector", { id: technicalId })
          .then((res) => {
            console.log(res.data);
            setTechnicalData(res.data.data);
            setShowSuccessProfileModal(true);
            setTimeout(() => {
              setShowSuccessProfileModal(false);
            }, 3000);
          })
          .catch((error) => {
            console.error("Error fetching Director data:", error);
          });
      }
    }).catch((error) => {
      console.error("Error updating cover image:", error);
    });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState(true);

  const handleEditClick = () => {
    if (isEditing) {
      setIsEditing(false)
    } else {
      setIsEditing(true);
    }
  };

  const [positions, setPositions] = useState("");
  const [companies, setCompanies] = useState("");
  const [startDates, setStartDates] = useState("");
  const [endDates, setEndDates] = useState("");
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  let x = [];
  const handleExperienceEditClick = () => {
    if (isEditingExperience) {
      setIsEditingExperience(false);
    } else {
      setIsEditingExperience(true);
    }
  };

  for (let i = 0; i < technicalData?.company?.length; i++) {
    x.push([technicalData?.position[i], technicalData?.company[i], technicalData?.startDate[i], technicalData?.endDate[i]])
    console.log(x)
  }

  return (
    <div>
     <Navbar />
      <div className={style["path"]}>
        <div className={style["container"]}>
          <div className={style["path__content"]}>
            <h3>Home</h3>
            <img src={Vector1} alt='' />
            <h3>Users</h3>
            <img src={Vector1} alt='' />
            <h3>{technicalData?.name}</h3>
          </div>
        </div>
      </div>
      <div className={style["profile"]}>
        <div className={style["container"]}>
          <div className={style["profile__content"]}>
            <i
              className="fa-solid fa-plus"
              style={{ color: '#000000', cursor: 'pointer' }}
              onClick={() => setShowCoverModal(true)}
            ></i>
            {/* Success Modal */}
            {showSuccessCoverModal && <SuccessandErrorModals message={"Your Cover Edited Successfully"} success={true} />}
            {/* Error Modal */}
            {showErrorCoverModal && <SuccessandErrorModals message={"No Cover image selected"} success={false} />}

            {showCoverModal && (
              <div className={CoverModalStyle['cover-modal__overlay']}>
                <div className={CoverModalStyle['cover-modal__content']}>
                  <div className={CoverModalStyle['covermodal__header']}>
                    <h2>Edit Cover Image</h2>
                  </div>
                  <div className={CoverModalStyle['covermodal__input']}>
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
                        className={CoverModalStyle['cover-preview']}
                      />
                    )}
                    <div className={CoverModalStyle['covermodal__actions']}>
                      <button onClick={() => setShowCoverModal(false)}>Cancel</button>
                      <button onClick={() => handleCoverImageSaveChanges()}>Save Changes</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <img src={`http://localhost:5000/${technicalData?.coverImg}`} alt='' />
          </div>
          <div className={style["profile__info"]}>
            <img className={style['profile__info__image']} src={`http://localhost:5000/${technicalData?.img}`} alt='' />
            <i
              className="fa-solid fa-plus"
              style={{ color: '#000000', cursor: 'pointer' }}
              onClick={() => setShowProfileModal(true)}
            ></i>
            {/* Success Modal */}
            {showSuccessProfileModal && <SuccessandErrorModals message={"Your Picture Edited Successfully"} success={true} />}
            {/* Error Modal */}
            {showErrorProfileModal && <SuccessandErrorModals message={"No Profile image selected"} success={false} />}

            {showProfileModal && (
              <div className={ProfileModalStyle['profile-modal__overlay']}>
                <div className={ProfileModalStyle['profile-modal__content']}>
                  <div className={ProfileModalStyle['profilemodal__header']}>
                    <h2>Edit Profile Image</h2>
                  </div>
                  <div className={ProfileModalStyle['profilemodal__input']}>
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
                        className={ProfileModalStyle['profile-preview-modal']}
                      // style={{marginTop: '10px',
                      //   width: '100%',
                      //   maxHeight: '350px'}}
                      />
                    )}
                    <div className={ProfileModalStyle['profilemodal__actions']}>
                      <button onClick={() => setShowProfileModal(false)}>Cancel</button>
                      <button onClick={() => handleProfileImageSaveChanges()}>Save Changes</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className={style["profile__text"]}>
              <div>
                <h3>{technicalData?.name}</h3>
                {JSON.parse(technicalRole) === 'tourGuide' && <h4>Tour Guide</h4>}
                {JSON.parse(technicalRole) === 'cameraOperator' && <h4>Camera Operator</h4>}
                {JSON.parse(technicalRole) === 'director' && <h4>Director</h4>}
              </div>
              <div className={style['edit__button']}>
                <a href="#" onClick={() => setShowEditModal(true)}>Edit Profile</a>
                {/* Success Modal */}
                {showSuccessModal && <SuccessandErrorModals message={"Your Information Edited Successfully"} success={true} />}
                {/* Error Modal */}
                {showErrorModal && <SuccessandErrorModals message={"Please Fill All Fields."} success={false} />}

                {/* Modal */}
                {showEditModal && (
                  <div className={Modalstyle['modal__overlay']}>
                    <div className={Modalstyle['modal__content']}>
                      <div className={Modalstyle['modal__header']}>
                        <h2>Edit Profile</h2>
                        <i
                          className="fa-regular fa-circle-xmark"
                          style={{ color: '#000000', fontSize: '25px', fontWeight: '600', cursor: 'pointer' }}
                          onClick={() => setShowEditModal(false)}
                        ></i>
                      </div>
                      <div className={Modalstyle['input__field']}>
                        <label>Name:</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                      </div>
                      <div className={Modalstyle['input__field']}>
                        <label>Description:</label>
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                        />
                      </div>
                      <div className={Modalstyle['input__field']}>
                        <label>Phone:</label>
                        <input
                          type="text"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                        />
                      </div>
                      <div className={Modalstyle['input__field']}>
                        <label>Address:</label>
                        <select value={editAddress} onChange={(e) => setEditAddress(e.target.value)}>
                          <option>Select Country</option>
                          {country?.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                          ))}
                        </select>
                      </div>

                      <div className={Modalstyle['input__field']}>
                        <label>City:</label>
                        <select value={editCity} onChange={(e) => setEditCity(e.target.value)}>
                          <option>Select City</option>
                          {editAddress !== 'Select Country' && data
                            .filter(item => item.country === editAddress)
                            .map((item, index) => (
                              <option key={index} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                      </div>

                      <div className={Modalstyle['modal__actions']}>
                        <button onClick={() => setShowEditModal(false)}>Cancel</button>
                        <button onClick={() => {
                          if (!editName || !editPhone || !editDescription || !editAddress || !editCity) {
                            setShowErrorModal(true); // Show the error modal
                            setTimeout(() => {
                              setShowErrorModal(false); // Hide the error modal after 3 seconds
                            }, 3000);
                          }else{
                          axios.put("http://localhost:5000/technical/editnfo", {
                            role: JSON.parse(localStorage.getItem("role")),
                            id: JSON.parse(localStorage.getItem("id")),
                            name: editName,
                            phone: editPhone,
                            description: editDescription,
                            address: editAddress,
                            city: editCity
                          }).then((res) => {
                            setShowEditModal(false)
                            if (JSON.parse(technicalRole) === "tourGuide") {
                              console.log(typeof technicalRole)
                              console.log("this is tech role", technicalRole)
                              axios.post("http://localhost:5000/technical/getOneTourGuide", { id: technicalId })
                                .then((res) => {
                                  console.log(res.data);
                                  setTechnicalData(res.data.data);
                                  setShowSuccessModal(true);
                                  setTimeout(() => {
                                    setShowSuccessModal(false);
                                  }, 3000);
                                })
                                .catch((error) => {
                                  console.error("Error fetching Tour Guide data:", error);
                                });
                            }
                            if (JSON.parse(technicalRole) === "cameraOperator") {
                              axios.post("http://localhost:5000/technical/getOneCameraOperator", { id: technicalId })
                                .then((res) => {
                                  console.log(res.data);
                                  setTechnicalData(res.data.data);
                                })
                                .catch((error) => {
                                  console.error("Error fetching Camera Operator data:", error);
                                });
                            }
                            if (JSON.parse(technicalRole) === "director") {
                              console.log(typeof technicalRole)
                              axios.post("http://localhost:5000/technical/getOneDirector", { id: technicalId })
                                .then((res) => {
                                  console.log(res.data);
                                  setTechnicalData(res.data.data);
                                })
                                .catch((error) => {
                                  console.error("Error fetching Director data:", error);
                                });
                            }
                          })
                        }}}>Save Changes</button>
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
                <a className={` ${tap === "about" ? style.active : ""}`} onClick={() => {
                  setTap("about")
                }}>About</a>
                <a className={` ${tap === "tours" ? style.active : ""}`} onClick={() => {
                  setTap("tours")
                }}>{technicalData?.name}’s Tours
                </a>
              </div>
              <div className={style["text"]} id="text" style={{display: tap == "tours" && 'flex', flexWrap: 'wrap'}}>
                {
                  tap === "about" &&
                  <>
                    <h4>Description</h4>
                    {technicalData?.description ? (
                      <p>{technicalData.description}</p>
                    ) :
                      <p style={{ margin: "10px 0" }}>You don't have description yet!</p>
                    }
                    {/* Success Modal */}
                    {showSuccessEducationModal && <SuccessandErrorModals message={"Your Education Edited Successfully"} success={true} />}
                    {/* Error Modal */}
                    {showErrorEducationModal && <SuccessandErrorModals message={"Please Fill All Feilds"} success={false} />}

                    <h4>Education</h4>
                    {
                      !hasAllInformation ?
                        <div className={style['edit__icon']}>
                          {
                            !isEditing &&
                            <p style={{ margin: "10px 0" }}>You don't have Education Data yet!</p>
                          }
                        </div>
                        :
                        <div>
                          <h5>{technicalData?.university}</h5>
                          <p>{technicalData?.faculty}</p>
                          <p>({technicalData?.startYear} - {technicalData?.graduateYear})</p>
                        </div>
                    }
                    {
                      isEditing &&
                      <>
                        <div className={style['education__edit__inputs']}>
                          <input type="text"
                            placeholder={technicalData?.university || university}
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                          />
                          <input type="text"
                            placeholder={technicalData?.faculty || faculty}
                            value={faculty}
                            onChange={(e) => setFaculty(e.target.value)}
                          />
                        </div>
                        <div className={style['education__edit__inputs']}>
                          <input type="text"
                            placeholder={technicalData?.startYear || startYear}
                            value={startYear}
                            onChange={(e) => setStartYear(e.target.value)}
                          />
                          <input type="text"
                            placeholder={technicalData?.graduateYear || graduateYear}
                            value={graduateYear}
                            onChange={(e) => setGraduateYear(e.target.value)}
                          />
                        </div>
                        <button className={style['button']} onClick={() => {
                          if (!university || !faculty || !startYear || !graduateYear) {
                            setShowErrorEducationModal(true); // Show the error modal
                            setTimeout(() => {
                              setShowErrorEducationModal(false); // Hide the error modal after 3 seconds
                            }, 3000);
                          } else {
                            axios.put("http://localhost:5000/technical/addEducation", {
                              role: JSON.parse(localStorage.getItem("role")),
                              id: JSON.parse(localStorage.getItem("id")),
                              university: university,
                              faculty: faculty,
                              startYear: startYear,
                              graduateYear: graduateYear
                            }).then((res) => {
                              setIsEditing(false)
                              console.log(res)
                              setShowEditIcon(true);
                              setShowSuccessEducationModal(true);
                              setTimeout(() => {
                                setShowSuccessEducationModal(false);
                              }, 3000);
                              if (JSON.parse(technicalRole) === "tourGuide") {
                                console.log(typeof technicalRole)
                                console.log("this is tech role", technicalRole)
                                axios.post("http://localhost:5000/technical/getOneTourGuide", { id: technicalId })
                                  .then((res) => {
                                    console.log(res.data);
                                    setTechnicalData(res.data.data);
                                  })
                                  .catch((error) => {
                                    console.error("Error fetching Tour Guide data:", error);
                                  });
                              }
                              if (JSON.parse(technicalRole) === "cameraOperator") {
                                axios.post("http://localhost:5000/technical/getOneCameraOperator", { id: technicalId })
                                  .then((res) => {
                                    console.log(res.data);
                                    setTechnicalData(res.data.data);
                                  })
                                  .catch((error) => {
                                    console.error("Error fetching Camera Operator data:", error);
                                  });
                              }
                              if (JSON.parse(technicalRole) === "director") {
                                console.log(typeof technicalRole)
                                axios.post("http://localhost:5000/technical/getOneDirector", { id: technicalId })
                                  .then((res) => {
                                    console.log(res.data);
                                    setTechnicalData(res.data.data);
                                  })
                                  .catch((error) => {
                                    console.error("Error fetching Director data:", error);
                                  });
                              }
                            })
                          }
                        }
                        }>Save</button>

                      </>
                    }
                    {
                      showEditIcon && <i className="fa-solid fa-pen-to-square" style={{
                        color: "#a9aaad", cursor: "pointer",
                        position: 'absolute', top: '106px', right: '3%'
                      }}
                        onClick={handleEditClick}></i>
                    }
                    {/* Success Modal */}
                    {showSuccessExperienceModal && <SuccessandErrorModals message={"Your Experience Edited Successfully"} success={true} />}
                    {/* Error Modal */}
                    {showErrorExperienceModal && <SuccessandErrorModals message={"Please Fill All Feilds"} success={false} />}

                    <h4>Experiences</h4>
                    <div style={{ position: 'relative' }}>
                      {
                        x.length > 0 ?

                          x.map((item, index) => (
                            <div key={index} style={{ marginBottom: '20px' }}>
                              <h5>{item[0]}</h5>
                              <p>{item[1]}</p>
                              <p>({item[2]} - {item[3]})</p>
                            </div>
                          )) :
                          (
                            <p style={{ margin: "10px 0" }}>You don't have Experience Data yet!</p>
                          )
                      }
                    </div>

                    {isEditingExperience && (
                      <>
                        <div className={style["education__edit__inputs"]}>
                          <input
                            type="text"
                            placeholder={"Position"}
                            value={positions}
                            onChange={(e) => setPositions(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder={"Company"}
                            value={companies}
                            onChange={(e) => setCompanies(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder={"Start Date"}
                            value={startDates}
                            onChange={(e) => setStartDates(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder={"End Date"}
                            value={endDates}
                            onChange={(e) => setEndDates(e.target.value)}
                          />
                        </div>
                        <button className={style['button']} onClick={() => {
                          if (!positions || !companies || !startDates || !endDates) {
                            setShowErrorExperienceModal(true); // Show the error modal
                            setTimeout(() => {
                              setShowErrorExperienceModal(false); // Hide the error modal after 3 seconds
                            }, 3000);
                          } else {
                            axios.put("http://localhost:5000/technical/addExperience", {
                              role: JSON.parse(localStorage.getItem("role")),
                              id: JSON.parse(localStorage.getItem("id")),
                              position: positions,
                              company: companies,
                              startDate: startDates,
                              endDate: endDates
                            }).then((res) => {
                              setIsEditingExperience(false)
                              console.log(res)
                              setShowEditIcon(true);
                              setShowSuccessExperienceModal(true);
                              setTimeout(() => {
                                setShowSuccessExperienceModal(false);
                              }, 3000);
                              if (JSON.parse(technicalRole) === "tourGuide") {
                                console.log(typeof technicalRole)
                                console.log("this is tech role", technicalRole)
                                axios.post("http://localhost:5000/technical/getOneTourGuide", { id: technicalId })
                                  .then((res) => {
                                    console.log(res.data);
                                    setTechnicalData(res.data.data);
                                  })
                                  .catch((error) => {
                                    console.error("Error fetching Tour Guide data:", error);
                                  });
                              }
                              if (JSON.parse(technicalRole) === "cameraOperator") {
                                axios.post("http://localhost:5000/technical/getOneCameraOperator", { id: technicalId })
                                  .then((res) => {
                                    console.log(res.data);
                                    setTechnicalData(res.data.data);
                                  })
                                  .catch((error) => {
                                    console.error("Error fetching Camera Operator data:", error);
                                  });
                              }
                              if (JSON.parse(technicalRole) === "director") {
                                console.log(typeof technicalRole)
                                axios.post("http://localhost:5000/technical/getOneDirector", { id: technicalId })
                                  .then((res) => {
                                    console.log(res.data);
                                    setTechnicalData(res.data.data);
                                  })
                                  .catch((error) => {
                                    console.error("Error fetching Director data:", error);
                                  });
                              }
                            })
                          }
                        }}>Save</button>
                      </>
                    )}

                    {showEditIcon && (
                      <i
                        className="fa-solid fa-pen-to-square"
                        style={{
                          color: "#a9aaad",
                          cursor: "pointer",
                          position: "absolute",
                          top: "200px",
                          right: "3%",
                        }}
                        onClick={handleExperienceEditClick}
                      >
                      </i>
                    )}
                  </>
                }
                {
                  tap == "tours" &&
                  <>
                    {technicalData && technicalData?.tours.length > 0 ? (
                      technicalData?.tours.map((item) => {
                        return <TechnicalCard key={item._id} data={item} />
                      })
                    ) : (
                      <p style={{ margin: "10px 0" }}>You don't have any tour yet!</p>
                    )}
                  </>
                }
              </div>
            </div>
            {/* Success Modal */}
            {showSuccessLanguageModal && <SuccessandErrorModals message={"Your Languages Added Successfully"} success={true} />}

            <div className={style["languages"]}>
              <h3>Languages</h3>
              {technicalData && technicalData?.languages?.length === 0 && (
                <select
                  value=""
                  onChange={(e) => handleLanguageSelect(e.target.value)}
                >
                  <option value="" disabled>Select a language</option>
                  <option value="english">English</option>
                  <option value="arabic">Arabic</option>
                  <option value="italian">Italian</option>
                </select>
              )}
              {technicalData && technicalData?.languages?.length > 0 && technicalData?.languages?.length < 3 && (
                <>
                  <div className={style["langs"]}>
                    {technicalData?.languages.map((language) => (
                      <a href="#" key={language}>
                        {language === 'english' && <img src={rounded} alt='' />}
                        {language === 'arabic' && <img src={egypt1} alt='' />}
                        {language === 'italian' && <img src={Italy} alt='' />}
                        {language.charAt(0).toUpperCase() + language.slice(1)}
                      </a>
                    ))}
                  </div>
                  <select
                    value=""
                    onChange={(e) => handleLanguageSelect(e.target.value)}
                  >
                    <option value="" disabled>Select a language</option>
                    <option value="english">English</option>
                    <option value="arabic">Arabic</option>
                    <option value="italian">Italian</option>
                  </select>
                </>
              )}
              {technicalData?.languages?.length === 3 && (
                <div className={style["langs"]}>
                  {technicalData?.languages.map((language) => (
                    <a href="#" key={language}>
                      {language === 'english' && <img src={rounded} alt='' />}
                      {language === 'arabic' && <img src={egypt1} alt='' />}
                      {language === 'italian' && <img src={Italy} alt='' />}
                      {language.charAt(0).toUpperCase() + language.slice(1)}
                    </a>
                  ))}
                </div>
              )}
              {technicalData?.address && (
                <>
                  <h3>Address</h3>
                  <a href="#">
                    <img src={group66} alt='' />
                    {technicalData?.city}, {technicalData?.address}
                  </a>
                </>
              )}
              <p>Joined since {formatDate(technicalData?.joinedAt)}</p>
            </div>

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

export default TechnicalProfile
