import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { Reservation } from "./Components/Reservation";
import { Galerie } from "./Components/Galerie";
import { Contact } from "./Components/Contact";
import AdminCalendar from './Components/AdminCalendar';
import React, { useState, useEffect } from "react";
import "./CSS/popupAdmin.css";
import APropos from "./Components/APropos";
import Footer from "./Components/LayoutComponents/Footer";
import axios from "axios"; // Make sure axios is installed

function App() {
  // Global state for reservation management
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [prices, setPrices] = useState({});
  const [blockedDates, setBlockedDates] = useState([]);
  const [minNightsRules, setMinNightsRules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = 'http://localhost:5001'; // Your backend server URL

  const handlePriceUpdate = (newPrices) => {
    setPrices(newPrices);
  };

  const handleBlockedDatesUpdate = (newBlockedDates) => {
    setBlockedDates(newBlockedDates);
  };

  const handleMinNightsUpdate = (newRules) => {
    setMinNightsRules(newRules);
  };

const handlePasswordSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    // Notice the change here to use the API_BASE_URL
    const response = await axios.get(`${API_BASE_URL}/api/admin-calendar`, {
      headers: {
        'password': password
      }
    });
    
    // If we get here, authentication was successful
    setIsAdmin(true);
    setShowPasswordPrompt(false);
    setPassword('');
    setPasswordError('');
  } catch (error) {
    // Rest of your error handling code
  } finally {
    setIsLoading(false);
  }
};

  const handleAdminSwitch = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setShowPasswordPrompt(true);
    }
  };

  // Optional: Function to change admin password
  const changeAdminPassword = async (currentPassword, newPassword) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/update-admin-password`, 
        { newPassword },
        { headers: { 'password': currentPassword } }
      );
      return { success: true, message: 'Password updated successfully' };
    } catch (error) {
      console.error('Error updating password:', error);
      return { 
        success: false, 
        message: error.response?.data?.error || 'Failed to update password' 
      };
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Password Prompt */}
      {showPasswordPrompt && (
        <div className="admin-popup-overlay">
          <div className="admin-popup-container">
            <div className="admin-popup-header">
              <h2 className="admin-popup-title">Admin Access</h2>
            </div>
            <form onSubmit={handlePasswordSubmit} className="admin-popup-form">
              <div className="admin-popup-form-group">
                <label className="admin-popup-label">
                  Enter Admin Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-popup-input"
                  placeholder="Password"
                  disabled={isLoading}
                />
                {passwordError && (
                  <p className="admin-popup-error">{passwordError}</p>
                )}
              </div>
              <div className="admin-popup-buttons">
                <button
                  type="submit"
                  className="admin-popup-button admin-popup-button-login"
                  disabled={isLoading}
                >
                  {isLoading ? 'Verifying...' : 'Login'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordPrompt(false);
                    setPassword('');
                    setPasswordError('');
                  }}
                  className="admin-popup-button admin-popup-button-cancel"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Reservation"
          element={
            isAdmin ? (
              <AdminCalendar
                prices={prices}
                blockedDates={blockedDates}
                minNightsRules={minNightsRules}
                onPriceUpdate={handlePriceUpdate}
                onBlockedDatesUpdate={handleBlockedDatesUpdate}
                onMinNightsUpdate={handleMinNightsUpdate}
                // Pass changeAdminPassword function if you want to implement password change in AdminCalendar
                changeAdminPassword={changeAdminPassword}
              />
            ) : (
              <Reservation
                prices={prices}
                blockedDates={blockedDates}
                minNightsRules={minNightsRules}
              />
            )
          }
        />
        <Route path="/Galerie" element={<Galerie />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/APropos" element={<APropos />} />
      </Routes>

      {/* Footer with Admin Switch */}
      <Footer isAdmin={isAdmin} handleAdminSwitch={handleAdminSwitch} />
    </div>
  );
}

export default App;