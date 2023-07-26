import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import AdminHeader from '../src/components/headerAdmin';
import AdminClub from "../src/components/adminClub";
import AdminEvent from '../src/components/adminEvent';
import AdminVendor from '../src/components/adminVendor';
import AdminHome from '../src/components/adminHome';
import AdminProps from '../src/components/adminProps';
import AdminGifts from '../src/components/adminGifts';
import AdminCard from '../src/components/adminCard';
import AdminLogin from './components/admin';
import { url } from "./assets/constants/data";

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState("yes");
  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    let token = localStorage.getItem("authToken");
    let config = {
      headers: { authorization: `Bearer ${token}` }
    };
    if (token) {
      axios.get(`${url}api/v1/frontend/verifyToken`, config).then((res) => {
        setIsAuthenticating(res.data)
      })
    }
    setIsAuthenticating("declined");
  }, [])

  if (isAuthenticating === "declined") {
    return <AdminLogin setIsAuthenticating={setIsAuthenticating} />
  }

  return (
    <div className='max-width'>
      <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {getCorrectScreen(activeTab, setActiveTab)}
    </div>
  );
}

const getCorrectScreen = (activeTab, setActiveTab) => {
  switch (activeTab) {
    case "Home":
      return <AdminHome setActiveTab={setActiveTab} />
    case "Club":
      return <AdminClub setActiveTab={setActiveTab} />
    case "Event":
      return <AdminEvent setActiveTab={setActiveTab} />
    case "Vendor":
      return <AdminVendor setActiveTab={setActiveTab} />
    case "Props":
      return <AdminProps setActiveTab={setActiveTab} />
    case "Gifts":
      return <AdminGifts setActiveTab={setActiveTab} />
    case "Cards":
      return <AdminCard setActiveTab={setActiveTab} />
    default:
      return <AdminHome setActiveTab={setActiveTab} />
  }
}


export default App;
