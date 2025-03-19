import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { Reservation } from "./Components/Reservation";
import { Galerie } from "./Components/Galerie";
import { Contact } from "./Components/Contact";
import AdminCalendar from './Components/AdminCalendar';
import React, { useState } from "react";
import "./CSS/popupAdmin.css";
import APropos from "./Components/APropos";
import Footer from "./Components/LayoutComponents/Footer";

function App() {
  // Global state for reservation management
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [prices, setPrices] = useState({});
  const [blockedDates, setBlockedDates] = useState([]);
  const [minNightsRules, setMinNightsRules] = useState([]);

  // Admin password (in production, this should be securely handled)
  const ADMIN_PASSWORD = 'admin123';

  const handlePriceUpdate = (newPrices) => {
    setPrices(newPrices);
  };

  const handleBlockedDatesUpdate = (newBlockedDates) => {
    setBlockedDates(newBlockedDates);
  };

  const handleMinNightsUpdate = (newRules) => {
    setMinNightsRules(newRules);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowPasswordPrompt(false);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const handleAdminSwitch = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setShowPasswordPrompt(true);
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
                />
                {passwordError && (
                  <p className="admin-popup-error">{passwordError}</p>
                )}
              </div>
              <div className="admin-popup-buttons">
                <button
                  type="submit"
                  className="admin-popup-button admin-popup-button-login"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordPrompt(false);
                    setPassword('');
                    setPasswordError('');
                  }}
                  className="admin-popup-button admin-popup-button-cancel"
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
