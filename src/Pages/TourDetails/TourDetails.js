import React, { useEffect, useState } from 'react'
import style from './TourDetails.module.css'
import BookingStyle from './BookingRolesModal.module.css'
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
import UserCoverModalStyle from '../UserProfile/UserCoverModal.module.css'



function TourDetails() {

  const [lang, setLang] = useState("english")
  const [tap, setTap] = useState("about")
  const [menu, setMenu] = useState(false)
  const [tour, setTour] = useState()
  const [publicTours, setPublicTours] = useState()
  const [vip, setVip] = useState()
  const [free, setFree] = useState()
  const [hour, setHour] = useState([])
  const [language, setLanguage] = useState([])
  const [bookedNumber, setBookedNumber] = useState()
  const [bookedLang, setBookedLang] = useState()
  const [bookedHours, setBookedHours] = useState()
  const [showSuccessBookModal, setShowSuccessBookModal] = useState(false)
  const [showErrorBookModal, setShowErrorBookModal] = useState(false)
  const [showErrorMsg, setErrorMsg] = useState("")
  const [showSuccessMsg, setSuccessMsg] = useState("")
  const [isLive, setIsLive] = useState(false)
  const [liveTourId, setLiveTourId] = useState([]);
  const [isBookingDisabled, setIsBookingDisabled] = useState(false);
  const [showRolesModal, setShowRolesModal] = useState(false);
  const [tourBookingData, setTourBookingData] = useState(false)
  //UserData
  const [userData, setUserData] = useState("")
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  //successModal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSuccessProfileModal, setShowSuccessProfileModal] = useState(false);
  const [showSuccessCoverModal, setShowSuccessCoverModal] = useState(false);

  //Error
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorCoverModal, setShowErrorCoverModal] = useState(false);
  const [showErrorProfileModal, setShowErrorProfileModal] = useState(false)

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [successEditDesc, setSuccessEditDesc] = useState(false)
  const [errorEditDesc, setErrorEditDesc] = useState(false)

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [successEditTitle, setSuccessEditTitle] = useState(false)
  const [errorEditTitle, setErrorEditTitle] = useState(false)

  const [editMedia, setEditMedia] = useState(false)
  const [successEditMedia, setSuccessEditMedia] = useState(false)
  const [errorEditMedia, setErrorEditMedia] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaImagePreview, setMediaImagePreview] = useState('');

  const [editAllMedia, setEditAllMedia] = useState(false)
  const [mediaData, setMediaData] = useState([]); // State to store media data
  const [newlyAddedImages, setNewlyAddedImages] = useState([]);

  // const [allMediaFiles, setAllMediaFiles] = useState([]);
  // const [allMediaPreviews, setAllMediaPreviews] = useState([]);



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
        axios.get("http://localhost:5000/user/getTourBooks", { params: { id: res.data._id } }).then((bookres) => {
          if (bookres.data.tour == "free") {
            setTourBookingData(true)
          } else {
            for (let i = 0; i < bookres.data.length; i++) {
              if (bookres.data[i].user == JSON.parse(localStorage.getItem("id"))) {
                setTourBookingData(true)
              }
            }
          }
        })
      })
    } else if (num) {
      axios.get("http://localhost:5000/user/oneTour", { params: { id: num } }).then((res) => {
        setTour(res.data)
        hours(res.data.hours)
        languages(res.data)
        axios.get("http://localhost:5000/user/getTourBooks", { params: { id: res.data._id } }).then((bookres) => {
          if (bookres.data.tour == "free") {
            setTourBookingData(true)
          } else {
            for (let i = 0; i < bookres.data.length; i++) {
              if (bookres.data[i].user == JSON.parse(localStorage.getItem("id"))) {
                setTourBookingData(true)
              }
            }
          }
        })
      })
    }
    axios.get("http://localhost:5000/user/public").then((res) => {
      setPublicTours(res.data)
    })
    axios.get("http://localhost:5000/user/vip").then((res) => {
      setVip(res.data)
    })
    axios.get("http://localhost:5000/user/free").then((res) => {
      setFree(res.data)
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

  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [editedInstructions, setEditedInstructions] = useState(
    Array.isArray(tour?.instructions) ? [...tour?.instructions] : []);
  const [successEditInstruc, setSuccessEditInstruc] = useState(false)
  const [errorEditInstruc, setErrorEditInstruc] = useState(false)

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
    if (tour?.category != 'free') {
      if (localStorage.getItem('role') == 'user') {
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
          console.error('Error processing payment:', error);

          // Handle error logic here, e.g., show an error message
          setErrorMsg('An error occurred while processing your payment.');
          setShowErrorBookModal(true);
          setTimeout(() => {
            setShowErrorBookModal(false);
          }, 3000)
        }
      }
    } else {
      if (localStorage.getItem('role') == 'user') {
        axios.post("http://localhost:5000/user/bookFreeTour", {
          user: JSON.parse(localStorage.getItem("id")),
          tour: tour._id,
          hours: bookedHours,
          language: bookedLang,
          num: bookedNumber,
        }).then((res) => {
          if (res.data.status === 200) {
            setShowSuccessBookModal(true);
            setTimeout(() => {
              setShowSuccessBookModal(false);
            }, 3000);
          }
          else if (res.data.status === 400) {
            setErrorMsg(res.data.message)
            setShowErrorBookModal(true)
            setTimeout(() => {
              setShowErrorBookModal(false)
            }, 3000)
          }
        })
      }
    }
  };
  const isFreeCategory = tour?.category === 'free';

  const handleBookNowClick = (event) => {
    event.preventDefault();
    setShowRolesModal(true);
  };

  const handleCloseModal = (event) => {
    event.preventDefault();
    setShowRolesModal(false);
  };
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
    if (userData?.email !== "sara@gmail.com") {
      console.error("User does not have permission to update the cover image");
      return;
    }
    const formData = new FormData();
    formData.append("coverImg", selectedCoverImage);



    axios.put(`http://localhost:5000/user/editTourCoverImage/${tour?._id}`, formData).then((response) => {
      setShowCoverModal(false)
      if (location.state) {
        axios.get("http://localhost:5000/user/oneTour", { params: { id: location.state } }).then((res) => {
          setTour(res.data)
          hours(res.data.hours)
          languages(res.data)
          setShowSuccessCoverModal(true);
          setTimeout(() => {
            setShowSuccessCoverModal(false);
          }, 3000);
        }).catch((error) => {
          console.error("Error fetching user data:", error);
        });
      } else if (num) {
        axios.get("http://localhost:5000/user/oneTour", { params: { id: num } }).then((res) => {
          setTour(res.data)
          hours(res.data.hours)
          languages(res.data)
          setShowSuccessCoverModal(true);
          setTimeout(() => {
            setShowSuccessCoverModal(false);
          }, 3000);
        }).catch((error) => {
          console.error("Error fetching user data:", error);
        });
      }
    }).catch((error) => {
      console.error("Error updating cover image:", error);
    });
  };
  const handleEditDescriptionClick = () => {
    if (userData?.email === "sara@gmail.com") {
      setIsEditingDescription(!isEditingDescription);
      if (!isEditingDescription) {
        setEditedDescription(tour?.description || "");
      }
    }
  };
  const handleSaveDescription = () => {
    axios
      .put(`http://localhost:5000/user/editTourDescription/${tour?._id}`, {
        description: editedDescription,
      })
      .then((res) => {
        setTour((prevTour) => ({ ...prevTour, description: editedDescription }));
        setIsEditingDescription(false);
        if (location.state) {
          axios.get("http://localhost:5000/user/oneTour", { params: { id: location.state } }).then((res) => {
            setTour(res.data)
            hours(res.data.hours)
            languages(res.data)
            setSuccessEditDesc(true);
            setTimeout(() => {
              setSuccessEditDesc(false);
            }, 3000);
          }).catch((error) => {
            console.error("Error fetching user data:", error);
          });
        } else if (num) {
          axios.get("http://localhost:5000/user/oneTour", { params: { id: num } }).then((res) => {
            setTour(res.data)
            hours(res.data.hours)
            languages(res.data)
            setSuccessEditDesc(true);
            setTimeout(() => {
              setSuccessEditDesc(false);
            }, 3000);
          }).catch((error) => {
            console.error("Error fetching user data:", error);
          });
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating tour description:", error);
      });
  };
  const handleCancelEdit = () => {
    setIsEditingDescription(false);
    setEditedDescription(tour?.description || "");
  };
  const handleEditTitleClick = () => {
    if (userData?.email === "sara@gmail.com") {
      setIsEditingTitle(!isEditingTitle);
      if (!isEditingTitle) {
        setEditedTitle(tour?.title || "");
      }
    }
  };
  const handleSaveTitle = () => {
    axios
      .put(`http://localhost:5000/user/editTourTitle/${tour?._id}`, {
        title: editedTitle,
      })
      .then((res) => {
        setTour((prevTour) => ({ ...prevTour, title: editedTitle }));
        setIsEditingTitle(false);
        if (location.state) {
          axios.get("http://localhost:5000/user/oneTour", { params: { id: location.state } }).then((res) => {
            setTour(res.data)
            hours(res.data.hours)
            languages(res.data)
            setSuccessEditTitle(true);
            setTimeout(() => {
              setSuccessEditTitle(false);
            }, 3000);
          }).catch((error) => {
            console.error("Error fetching user data:", error);
          });
        } else if (num) {
          axios.get("http://localhost:5000/user/oneTour", { params: { id: num } }).then((res) => {
            setTour(res.data)
            hours(res.data.hours)
            languages(res.data)
            setSuccessEditTitle(true);
            setTimeout(() => {
              setSuccessEditTitle(false);
            }, 3000);
          }).catch((error) => {
            console.error("Error fetching user data:", error);
          });
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating tour title:", error);
      });
  };
  const handleCancelEditTitle = () => {
    setIsEditingTitle(false);
    setEditedTitle(tour?.title || "");
  };
  const handleEditMediaSelection = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setSelectedMedia(file);
      setMediaImagePreview(URL.createObjectURL(file));
    }
  };
  const handleEditMediaSaveChanges = () => {

    if (!selectedMedia) {
      setErrorEditMedia(true);
      setTimeout(() => {
        setErrorEditMedia(false);
      }, 3000);
      return;
    }
    if (userData?.email !== "sara@gmail.com") {
      console.error("User does not have permission to update the cover image");
      return;
    }
    const formData = new FormData();
    formData.append("img", selectedMedia);



    axios.put(`http://localhost:5000/user/editTourMedia/${tour?._id}`, formData).then((response) => {
      setEditMedia(false)
      if (location.state) {
        axios.get("http://localhost:5000/user/oneTour", { params: { id: location.state } }).then((res) => {
          setTour(res.data)
          hours(res.data.hours)
          languages(res.data)
          setSuccessEditMedia(true);
          setTimeout(() => {
            setSuccessEditMedia(false);
          }, 3000);
        }).catch((error) => {
          console.error("Error fetching user data:", error);
        });
      } else if (num) {
        axios.get("http://localhost:5000/user/oneTour", { params: { id: num } }).then((res) => {
          setTour(res.data)
          hours(res.data.hours)
          languages(res.data)
          setSuccessEditMedia(true);
          setTimeout(() => {
            setSuccessEditMedia(false);
          }, 3000);
        }).catch((error) => {
          console.error("Error fetching user data:", error);
        });
      }
    }).catch((error) => {
      console.error("Error updating cover image:", error);
    });
  };
  const handleEditInstructionsClick = () => {
    if (userData?.email === "sara@gmail.com") {
      setIsEditingInstructions(!isEditingInstructions);
      if (!isEditingInstructions) {
        setEditedInstructions([...tour?.instructions]);
      }
    }
  };
  const handleInstructionChange = (e, index) => {
    const updatedInstructions = [...editedInstructions];
    updatedInstructions[index] = e.target.value;
    setEditedInstructions(updatedInstructions);
  };
  const handleRemoveInstruction = (index) => {
    const updatedInstructions = [...editedInstructions];
    updatedInstructions.splice(index, 1);
    setEditedInstructions(updatedInstructions);
  };
  const handleAddInstruction = () => {
    setEditedInstructions([...editedInstructions, ""]);
  };
  const handleSaveInstructions = () => {
    axios
      .put(`http://localhost:5000/user/editTourInstructions/${tour?._id}`, {
        instructions: editedInstructions,
      })
      .then((res) => {
        setTour((prevTour) => ({ ...prevTour, instructions: editedInstructions }));
        setIsEditingInstructions(false);
        if (location.state) {
          axios.get("http://localhost:5000/user/oneTour", { params: { id: location.state } }).then((res) => {
            setTour(res.data)
            hours(res.data.hours)
            languages(res.data)
            setSuccessEditInstruc(true);
            setTimeout(() => {
              setSuccessEditInstruc(false);
            }, 3000);
          }).catch((error) => {
            console.error("Error fetching user data:", error);
          });
        } else if (num) {
          axios.get("http://localhost:5000/user/oneTour", { params: { id: num } }).then((res) => {
            setTour(res.data)
            hours(res.data.hours)
            languages(res.data)
            setSuccessEditInstruc(true);
            setTimeout(() => {
              setSuccessEditInstruc(false);
            }, 3000);
          }).catch((error) => {
            console.error("Error fetching user data:", error);
          });
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating tour instructions:", error);
      });
  };
  const handleCancelInstructionsEdit = () => {
    // Exit edit mode and reset the editedInstructions to the current tour instructions
    setIsEditingInstructions(false);
    setEditedInstructions(Array.isArray(tour?.instructions) ? [...tour?.instructions] : []);
  };
  var myI = JSON.parse(localStorage.getItem("index")) || [];
  const handleFileChange = (index, event) => {
    const files = event.target.files;
    myI.push(index)
    localStorage.setItem("index", JSON.stringify(myI))
    // Create a copy of the existing mediaData
    const updatedMediaData = [...mediaData];

    // Push each file into the updatedMediaData array
    for (let i = 0; i < files.length; i++) {
      updatedMediaData.push({ file: files[i], remove: false });
    }

    // Log the updated mediaData
    console.log(updatedMediaData);

    // Set the updated mediaData in the state
    setMediaData(updatedMediaData);
  };
  const handleAddNewImages = (event) => {
    const files = event.target.files;

    // Create a copy of newlyAddedImages
    const updatedNewlyAddedImages = [...newlyAddedImages];

    for (let i = 0; i < files.length; i++) {
      updatedNewlyAddedImages.push(files[i]);
    }

    // Set the updated newlyAddedImages in the state
    setNewlyAddedImages(updatedNewlyAddedImages);
  };
  const [removeIm, setRemoveIm] = useState(JSON.parse(localStorage.getItem("remove")) || []);
  useEffect(() => {
    // Store the updated 'removeIm' array in local storage whenever it changes
    localStorage.setItem("remove", JSON.stringify(removeIm));
  }, [removeIm]);

  const handleRemoveMedia = (index) => {
    const updatedMediaData = [...mediaData];
    updatedMediaData.splice(index, 1);

    setMediaData(updatedMediaData);

    // Update the 'removeIm' state by pushing the index
    setRemoveIm([...removeIm, index]);
  };
  const handleSaveChanges = async () => {
    const updatePromises = [];
    const addNewPromises = [];
    const removePromises = [];

    // Update existing images
    for (let i = 0; i < mediaData.length; i++) {
      if (!mediaData[i].remove && mediaData[i].file) {
        const formData = new FormData();
        formData.append('img', mediaData[i].file);
        console.log(mediaData[i].file)
        console.log(myI)
        console.log(typeof myI)
        const theI = JSON.parse(localStorage.getItem("index"));

        updatePromises.push(
          axios.put(`http://localhost:5000/user/editTourMedia/${tour._id}/${theI[i]}`, formData)
        );
      }
    }

    // Add newly added images
    for (let i = 0; i < newlyAddedImages.length; i++) {
      const formData = new FormData();
      formData.append('img', newlyAddedImages[i]);

      addNewPromises.push(
        axios.post(`http://localhost:5000/user/addTourMedia/${tour._id}`, formData)
      );
    }

    // Remove items by sending their indices to the server
    const theRemove = JSON.parse(localStorage.getItem("remove"));
    for (let i = 0; i < theRemove.length; i++) {
      removePromises.push(
        axios.delete(`http://localhost:5000/user/removeTourMedia/${tour._id}/${theRemove[i]}`)
      );
    }
    try {
      await Promise.all([...updatePromises, ...addNewPromises, ...removePromises]);
      setNewlyAddedImages([])
      setRemoveIm([])
      localStorage.removeItem("index")
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
      // window.location.reload();
    } catch (error) {
      console.error("Error updating images:", error);
      // Handle errors as needed.
    }

    setEditAllMedia(false); // Close the edit media modal
  };
  const handleCancel = () => {
    setEditAllMedia(false)
    // localStorage.removeItem("remove")
    // localStorage.removeItem("index")
    setRemoveIm([])
    // window.location.reload();
  }
  return (
    <div>
      {
        showSuccessBookModal && <SuccessandErrorModals success={true} message={"Tour Booked Successfully"} />
      }
      {
        showErrorBookModal && <SuccessandErrorModals success={false} message={showErrorMsg} />
      }
      {
        showSuccessCoverModal && <SuccessandErrorModals message={"Your Cover Edited Successfully"} success={true} />
      }
      {
        showErrorCoverModal && <SuccessandErrorModals message={"No Cover image selected"} success={false} />
      }
      {
        successEditDesc && <SuccessandErrorModals message={"Your description Edited Successfully"} success={true} />
      }
      {
        errorEditDesc && <SuccessandErrorModals message={"Error updating tour description"} success={false} />
      }
      {
        successEditMedia && <SuccessandErrorModals message={"Your Media Edited Successfully"} success={true} />
      }
      {
        errorEditMedia && <SuccessandErrorModals message={"Error updating tour Media"} success={false} />
      }
      {
        successEditTitle && <SuccessandErrorModals message={"Your Title Edited Successfully"} success={true} />
      }
      {
        errorEditTitle && <SuccessandErrorModals message={"Error updating tour title"} success={false} />
      }
      {
        successEditInstruc && <SuccessandErrorModals message={"Your Instructions Edited Successfully"} success={true} />
      }
      {
        errorEditInstruc && <SuccessandErrorModals message={"Error updating tour instructions"} success={false} />
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
              {userData?.email === "sara@gmail.com" && (
                <i className="fa-solid fa-pen-to-square" style={{ position: 'absolute', fontSize: '20px', zIndex: '999', cursor: 'pointer' }}
                  onClick={() => setShowCoverModal(true)}
                ></i>
              )}
              {showCoverModal && (
                <div className={UserCoverModalStyle['usercover-modal__overlay']}>
                  <div className={UserCoverModalStyle['usercover-modal__content']}>
                    <div className={UserCoverModalStyle['usercovermodal__header']}>
                      <h2>Edit Cover Image</h2>
                    </div>
                    <div className={UserCoverModalStyle['usercovermodal__input']}>
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
                          className={UserCoverModalStyle['usercover-preview']}
                        />
                      )}
                      <div className={UserCoverModalStyle['usercovermodal__actions']}>
                        <button onClick={() => setShowCoverModal(false)}>Cancel</button>
                        <button onClick={() => handleCoverImageSaveChanges()}>Save Changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* <img src={vecto2} />
              <img src={vectorStroke} /> */}
            </div>
            {isEditingTitle ? (
              <div className={style['edit__title']}>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <div className={style['input__buttons']}>
                  <button onClick={handleCancelEditTitle}>Cancel</button>
                  <button onClick={handleSaveTitle}>Save</button>
                </div>
              </div>
            ) : (
              <div className={style["hero__text"]}>
                <h2>{tour?.title}</h2>
                {userData?.email === "sara@gmail.com" && (
                  <i
                    className="fa-solid fa-pen-to-square"
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '40%',
                      fontSize: '20px',
                      cursor: 'pointer'
                    }}
                    onClick={handleEditTitleClick}
                  ></i>
                )}
                <div className={style["stars"]}>
                  {starIcons}
                  <h5>({(tour?.avgRate?.toFixed(1))})</h5>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      {
        isLive && tourBookingData && (
          <div style={{ marginTop: '50px', marginBottom: '20px' }}>
            <StreamingSection />
          </div>
        )
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
                    {isEditingDescription ? (
                      <div className={style['textarea__description']}>
                        <textarea
                          rows="4"
                          cols="50"
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                        />
                        <div className={style['textarea__buttons']}>
                          <button onClick={handleCancelEdit}>Cancel</button>
                          <button onClick={handleSaveDescription}>Save</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p>{tour?.description ? tour?.description : "There's no description for this tour"}</p>
                        {userData?.email === "sara@gmail.com" && (
                          <i className="fa-solid fa-pen-to-square" style={{ fontSize: '20px', cursor: 'pointer' }} onClick={handleEditDescriptionClick}></i>
                        )}
                      </div>
                    )}

                    <div className={style["tags"]}>
                      {tour?.tags && tour?.tags.map((tag, index) => (
                        <a key={index}>{tag}</a>
                      ))}
                    </div>
                    <div className={style["media"]}>{
                      tour?.img?.length > 0 &&
                      <img src={`http://localhost:5000/${tour?.img[1]}`} />
                    }
                      {userData?.email === "sara@gmail.com" && (
                        <i className="fa-solid fa-pen-to-square"
                          onClick={() => setEditMedia(true)}
                          style={{
                            fontSize: '20px', position: 'absolute',
                            top: '0',
                            right: '0',
                            cursor: 'pointer'
                          }}></i>
                      )}
                      {editMedia && (
                        <div className={UserCoverModalStyle['usercover-modal__overlay']}>
                          <div className={UserCoverModalStyle['usercover-modal__content']}>
                            <div className={UserCoverModalStyle['usercovermodal__header']}>
                              <h2>Edit Media</h2>
                            </div>
                            <div className={UserCoverModalStyle['usercovermodal__input']}>
                              <input
                                type="file"
                                id="img"
                                name="img"
                                onChange={handleEditMediaSelection}
                              />
                              {mediaImagePreview && (
                                <img
                                  src={mediaImagePreview}
                                  alt="Selected Media"
                                  className={UserCoverModalStyle['usercover-preview']}
                                />
                              )}
                              <div className={UserCoverModalStyle['usercovermodal__actions']}>
                                <button onClick={() => setEditMedia(false)}>Cancel</button>
                                <button onClick={() => handleEditMediaSaveChanges()}>Save Changes</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
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
              {tap === "instructions" && (
                <div>
                  {isEditingInstructions ? (
                    <div className={style["main-content"]}>
                      <div className={style['instruc__edit']}>
                        {editedInstructions.map((instruction, index) => (
                          <div className={style['instruc__input']} key={index}>
                            <textarea
                              rows="4"
                              cols="50"
                              type="text"
                              value={instruction}
                              onChange={(e) => handleInstructionChange(e, index)}
                            />
                            <button onClick={() => handleRemoveInstruction(index)}>
                              Remove
                            </button>
                          </div>
                        ))}
                        <button onClick={handleAddInstruction}><i class="fa-solid fa-plus" style={{ color: 'white', marginRight: '5px' }}></i>Add Instruction</button>
                        <div className={style['instruc__buttons']}>
                          <button onClick={handleCancelInstructionsEdit}>Cancel</button>
                          <button onClick={handleSaveInstructions}>Save</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={style["main-content"]}>
                      {tour?.instructions.length > 0 ? (
                        tour.instructions.map((instruction, index) => (
                          <h5 key={index}>{instruction}</h5>
                        ))
                      ) : (
                        <h5>No Instructions for this tour</h5>
                      )}
                      {userData?.email === "sara@gmail.com" && (
                        <i
                          className="fa-solid fa-pen-to-square"
                          style={{
                            fontSize: '20px',
                            position: 'absolute',
                            top: '53%',
                            left: '60%',
                            cursor: 'pointer'
                          }}
                          onClick={handleEditInstructionsClick}
                        ></i>
                      )}
                    </div>
                  )}
                </div>
              )}

              {
                tap === "media" && (
                  <div className={style["main-content"]}>
                    {userData?.email === "sara@gmail.com" && (
                      <i
                        className="fa-solid fa-pen-to-square"
                        style={{
                          fontSize: '20px',
                          position: 'absolute',
                          top: '53%',
                          left: '60%',
                          cursor: 'pointer'
                        }}
                        onClick={() => setEditAllMedia(true)}
                      ></i>
                    )}
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
                    {editAllMedia && (
                      <div className={UserCoverModalStyle['usercover-modal__overlay']}>
                        <div className={UserCoverModalStyle['usercover-modal__content']}>
                          <div className={UserCoverModalStyle['usercovermodal__header']}>
                            <h2>Edit All Media</h2>
                          </div>
                          {tour?.img.length > 0 && (
                            <div className={style["media-preview-container"]} style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              flexWrap: 'wrap',
                              paddingLeft: '10px',
                              paddingRight: '10px'
                            }}>
                              {tour?.img.map((preview, index) => (
                                <div key={index} className={`${style["media-preview"]} ${removeIm.includes(index) ? style["opacity-effect"] : ""}`}>
                                  <img src={`http://localhost:5000/${preview}`} alt={`Media ${index}`} style={{ width: '70%', height: '150px' }} />
                                  <div className={style['allmedia__btns']}>
                                    <button onClick={() => handleRemoveMedia(index)}>Remove</button>
                                    <input
                                      type="file"
                                      id={`media-input-${index}`}
                                      name={`media-input-${index}`}
                                      onChange={(e) => handleFileChange(index, e)}
                                    />
                                  </div>

                                </div>
                              ))}
                            </div>
                          )}
                          <div className={UserCoverModalStyle['usercovermodal__input']}>
                            <input
                              type="file"
                              id="images"
                              name="images"
                              multiple  // Allow multiple file selection
                              onChange={handleAddNewImages}
                            />
                            <div className={UserCoverModalStyle['usercovermodal__actions']}>
                              <button onClick={handleCancel}>Cancel</button>
                              <button onClick={handleSaveChanges}>Save Changes</button>
                            </div>
                          </div>
                        </div>
                      </div>
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
                      {
                        tour?.category === "free" &&
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
                        <option value={3}>3 Gusts</option>
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
                    {
                      tour?.category != "free" &&
                      <div style={{ marginTop: '40px', marginBottom: '20px' }}>
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
                    }
                    <div className={style["price"]}>
                      <h4>Total</h4>
                      {
                        tour?.category != 'free' ? (
                          <h4>
                            {bookedHours && bookedNumber
                              ? bookedHours * bookedNumber * tour?.price
                              : bookedHours && !bookedNumber
                                ? tour?.price * bookedHours
                                : !bookedHours && bookedNumber
                                  ? tour?.price * bookedNumber
                                  : tour?.price}
                            $
                          </h4>
                        ) : (
                          <h4>FREE</h4>
                        )
                      }
                    </div>
                    <button
                      onClick={handleBookNowClick}
                      disabled={isBookingDisabled}
                      style={{
                        width: '100%',
                        height: '48px',
                        background: 'linear-gradient(72.64deg, #366DAF 51.72%, #418AE2 104.47%)',
                        color: 'white',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Book Now
                    </button>

                    {
                      showRolesModal && <div className={BookingStyle['booking__modall__content']}>
                        <div className={BookingStyle['booking__modal__header']}>
                          <h4>Confirm Booking</h4>
                          <img src={logo1} alt='' />
                        </div>
                        <div className={BookingStyle['booking__modal__body']}>
                          <h2>Are you sure you want to book this tour?</h2>
                          <p>1) If you need to cancel the tour you have booked, you can do so up to 24 hours before the scheduled tour date.</p>
                          <p>2) To request a tour cancellation, please contact us at <span>LVW@support.com</span>. We will guide you through the cancellation process and initiate a refund if the trip was pre-paid.</p>
                          <p>3) There are no fees associated with the cancellation process.</p>
                          <div className={BookingStyle['booking__modal__buttons']}>
                            <button className={BookingStyle['booking__cancel__btn']} onClick={handleCloseModal}>Cancel</button>
                            <button
                              onClick={(event) => {
                                event.preventDefault(); // Prevent form submission
                                handleSubmit(event); // Pass the event object to handleSubmit
                                setShowRolesModal(false);
                              }}
                              type="submit"
                              disabled={isBookingDisabled}
                              className={BookingStyle['booking__confirm__btn']}
                            >
                              Confirm
                            </button>


                          </div>
                        </div>
                      </div>
                    }
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
    </div >
  )
}

export default TourDetails
