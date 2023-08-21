import logo from './logo.svg';
import './App.css';
import UserProfile from './Pages/UserProfile/UserProfile';
import TourDetails from './Pages/TourDetails/TourDetails';
import Tours from './Pages/Tours/Tours';
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import TechnicalProfile from './Pages/TechnicalProfile/Technical';
import { BrowserRouter, Routes, Route ,Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Home />} path="/home" />
      <Route element={<Home />} path="/" />
      <Route element={<TechnicalProfile />} path="/TechnicalProfile" />
      <Route element={<UserProfile />} path="/UserProfile" />
      <Route element={<TourDetails />} path="/TourDetails" />
      <Route element={<TourDetails />} path="/TourDetails/:num" />
      <Route element={<Tours />} path="/Tours" />
      <Route element={<Login />} path="/Login" />
    </Routes>
  </BrowserRouter>
    // <TechnicalProfile />
    // <UserProfile />
    // <TourDetails />
    // <Tours />
    // <Login />
    // <Home />

  );
}

export default App;
