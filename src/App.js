import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { Reservation } from "./Components/Reservation";
import { Galerie } from "./Components/Galerie";
import { Contact } from "./Components/Contact";
import AdminCalendar from './Components/AdminCalendar';
import React, { useState, useEffect } from "react";
import "./CSS/popupAdmin.css";
import Footer from "./Components/LayoutComponents/Footer";
import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

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

  // Fetch Reservation Data on Component Mount
  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const settingsRef = doc(db, 'calendar', 'settings');
        const settingsDoc = await getDoc(settingsRef);
        
        if (settingsDoc.exists()) {
          const data = settingsDoc.data();
          setPrices(data.prices || {});
          setBlockedDates(data.blockedDates || []);
          setMinNightsRules(data.minNightsRules || []);
        }
      } catch (error) {
        console.error('Error fetching reservation data:', error);
      }
    };

    fetchReservationData();
  }, []);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      // Update the path to match your Firestore structure
      const settingsRef = doc(db, 'adminSettings', 'settings');
      console.log('Fetching document from path: adminSettings/settings'); // Debugging log
      const settingsDoc = await getDoc(settingsRef);
  
      // Check if the document exists
      if (!settingsDoc.exists()) {
        console.error('Document does not exist at path: adminSettings/settings'); // Debugging log
        throw new Error('Admin settings not found');
      }
  
      // Log the document data for debugging
      const data = settingsDoc.data();
      console.log('Document data:', data);
  
      const adminPassword = data.adminPassword || '';
      if (password === adminPassword) {
        setIsAdmin(true);
        setShowPasswordPrompt(false);
  
        // Set data from Firestore
        setPrices(data.prices || {});
        setBlockedDates(data.blockedDates || []);
        setMinNightsRules(data.minNightsRules || []);
  
        // Reset form states
        setPassword('');
        setPasswordError('');
      } else {
        throw new Error('Invalid password');
      }
    } catch (error) {
      console.error('Authentication error:', error); // Debugging log
      setPasswordError(error.message || 'Authentication failed');
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminSwitch = () => {
    if (isAdmin) {
      // Log out admin
      setIsAdmin(false);
    } else {
      // Show password prompt
      setShowPasswordPrompt(true);
    }
  };

  // Change Admin Password
  const changeAdminPassword = async (currentPassword, newPassword) => {
    try {
      const settingsRef = doc(db, 'calendar', 'settings');
      const settingsDoc = await getDoc(settingsRef);
      
      if (settingsDoc.exists()) {
        const data = settingsDoc.data();
        
        if (currentPassword === data.adminPassword) {
          await updateDoc(settingsRef, { adminPassword: newPassword });
          return { 
            success: true, 
            message: 'Password updated successfully' 
          };
        } else {
          throw new Error('Current password is incorrect');
        }
      } else {
        throw new Error('Admin settings not found');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to update password' 
      };
    }
  };

  // Price Update Handler
  const handlePriceUpdate = async (newPrices) => {
    try {
      const settingsRef = doc(db, 'calendar', 'settings');
      await updateDoc(settingsRef, { prices: newPrices });
      setPrices(newPrices);
    } catch (error) {
      console.error('Error updating prices:', error);
    }
  };

  // Blocked Dates Update Handler
  const handleBlockedDatesUpdate = async (newBlockedDates) => {
    try {
      const settingsRef = doc(db, 'calendar', 'settings');
      await updateDoc(settingsRef, { blockedDates: newBlockedDates });
      setBlockedDates(newBlockedDates);
    } catch (error) {
      console.error('Error updating blocked dates:', error);
    }
  };

  // Min Nights Rules Update Handler
  const handleMinNightsUpdate = async (newRules) => {
    try {
      const settingsRef = doc(db, 'calendar', 'settings');
      await updateDoc(settingsRef, { minNightsRules: newRules });
      setMinNightsRules(newRules);
    } catch (error) {
      console.error('Error updating min nights rules:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Password Prompt (remains mostly unchanged) */}
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
      
      {/* Routes (unchanged) */}
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
      </Routes>

      {/* Footer with Admin Switch */}
      <Footer isAdmin={isAdmin} handleAdminSwitch={handleAdminSwitch} />
    </div>
  );
}

export default App;