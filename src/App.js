import logo from './logo.svg';
import './App.css';
import UserProfile from './Pages/UserProfile/UserProfile';
import TourDetails from './Pages/TourDetails/TourDetails';
import Tours from './Pages/Tours/Tours';
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import TechnicalProfile from './Pages/TechnicalProfile/Technical';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import WonderChat from './Pages/ChatBot/ChatbotEmbed';
import ViewTechnical from './Pages/ViewTechnical/ViewTechnical';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ToursType from './Pages/ToursType/ToursType';
import VipForm from './Pages/VIPForm/VipForm';


const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

function App() {
  return (
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <AppContent />
      </Elements>
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  // Define an array of routes where you want to hide the chatbot
  const routesWithoutChatbot = ['/login', '/technicalprofile'];

  // Check if the current route is in the array of routes to hide the chatbot
  const hideChatbot = routesWithoutChatbot.includes(location.pathname);


  return (
    <>
      <Routes>
        <Route index element={<Home />} path="/home" />
        <Route element={<Home />} path="/" />
        <Route element={<TechnicalProfile />} path="/technicalprofile" />
        <Route element={<ViewTechnical />} path="/viewtechnical/:id/:role" />
        <Route element={<UserProfile />} path="/userprofile" />
        <Route element={<TourDetails />} path="/tourdetails" />
        <Route element={<TourDetails />} path="/tourdetails/:num" />
        <Route element={<Tours />} path="/tours" />
        <Route element={<Login />} path="/login" />
        <Route element={<ForgetPassword />} path="/forget" />
        <Route element={<ToursType />} path="/tourtype/:type" />
        <Route element={< VipForm />} path="/vipform" /> 

      </Routes>
      {!hideChatbot && <WonderChat />}
    </>
  );
}

export default App;
