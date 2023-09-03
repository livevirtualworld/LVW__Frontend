import logo from './logo.svg';
import './App.css';
import UserProfile from './Pages/UserProfile/UserProfile';
import TourDetails from './Pages/TourDetails/TourDetails';
import Tours from './Pages/Tours/Tours';
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import TechnicalProfile from './Pages/TechnicalProfile/Technical';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import WonderChat from './Pages/ChatBot/ChatbotEmbed';
import ViewTechnical from './Pages/ViewTechnical/ViewTechnical';
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  // Define an array of routes where you want to hide the chatbot
  const routesWithoutChatbot = ['/login', '/technicalprofile'];
  console.log('Current pathname:', location.pathname);

  // Check if the current route is in the array of routes to hide the chatbot
  const hideChatbot = routesWithoutChatbot.includes(location.pathname);


  return (
    <>
      {!hideChatbot && <WonderChat />}
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
      </Routes>
    </>
  );
}

export default App;
