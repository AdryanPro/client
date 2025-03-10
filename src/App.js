import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { Reservation } from "./Components/Reservation";
import { Galerie } from "./Components/Galerie";
import { Contact } from "./Components/Contact";
import AdminCalendar from './Components/AdminCalendar';
import React, { useState } from "react";
import "./CSS/Reservation.css";
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-bold">Admin Access</h2>
            </div>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Admin Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />
                {passwordError && (
                  <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
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
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
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
