import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../CSS/AdminCalendar.css";
import NavBar from './LayoutComponents/NavBar';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

const AdminCalendar = () => {
  // State for storing fetched data
  const [prices, setPrices] = useState({});
  const [blockedDates, setBlockedDates] = useState([]);
  const [minNightsRules, setMinNightsRules] = useState([]);
  const [priceStartDate, setPriceStartDate] = useState(null);
  const [priceEndDate, setPriceEndDate] = useState(null);
  const [rangePrice, setRangePrice] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [price, setPrice] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [blockStartDate, setBlockStartDate] = useState(null);
  const [blockEndDate, setBlockEndDate] = useState(null);
  const [minNightsStartDate, setMinNightsStartDate] = useState(null);
  const [minNightsEndDate, setMinNightsEndDate] = useState(null);
  const [minNights, setMinNights] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Utility functions
  function getDateRange(start, end) {
    let dates = [];
    let currentDate = new Date(start);
    const endDate = new Date(end);

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  function renderDatePrice(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateStr = date.toISOString().split('T')[0];

    if (blockedDates.includes(dateStr)) return '';
    if (prices[dateStr]) return `${prices[dateStr]}€`;
    return basePrice ? `${basePrice}€` : '';
  }

  function getCurrentPrice() {
    if (!prices || Object.keys(prices).length === 0) return 'Aucun prix défini';
    if (basePrice) return `${basePrice}`;

    const priceValues = Object.values(prices).filter((price) => price !== basePrice);
    if (priceValues.length === 0) return 'Aucun prix défini';

    const priceCounts = priceValues.reduce((acc, price) => {
      acc[price] = (acc[price] || 0) + 1;
      return acc;
    }, {});

    const mostFrequentPrice = Object.keys(priceCounts).reduce((a, b) =>
      priceCounts[a] > priceCounts[b] ? a : b
    );
    return `${mostFrequentPrice}`;
  }

  // Firebase data fetching
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const settingsRef = doc(db, 'adminSettings', 'settings');
        const settingsDoc = await getDoc(settingsRef);
        
        if (settingsDoc.exists()) {
          const data = settingsDoc.data();
          setPrices(data.prices || {});
          setBlockedDates(data.blockedDates || []);
          setMinNightsRules(data.minNightsRules || []);
          setBasePrice(data.basePrice ? parseFloat(data.basePrice) : "");
        }
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };
    
    fetchCalendarData();
  }, [refresh]);

  // Handler functions
  const handleSetRangePrice = async () => {
    if (!priceStartDate || !priceEndDate || !rangePrice) return;
  
    try {
      const dateRange = getDateRange(priceStartDate, priceEndDate);
      const settingsRef = doc(db, 'adminSettings', 'settings');
      const settingsDoc = await getDoc(settingsRef);
  
      let currentPrices = {};
      if (settingsDoc.exists()) {
        currentPrices = settingsDoc.data().prices || {};
      } else {
        // If the document doesn't exist, create it
        await setDoc(settingsRef, { prices: {} });
      }
  
      dateRange.forEach((date) => {
        currentPrices[date] = parseFloat(rangePrice);
      });
  
      await updateDoc(settingsRef, { prices: currentPrices });
      setPrices(currentPrices);
      setPriceStartDate(null);
      setPriceEndDate(null);
      setRangePrice('');
    } catch (error) {
      console.error("Error updating price range:", error);
    }
  };

  const handleSetBasePrice = async () => {
    if (!basePrice) return;
  
    try {
      const settingsRef = doc(db, 'adminSettings', 'settings');
      const settingsDoc = await getDoc(settingsRef);
  
      if (!settingsDoc.exists()) {
        // If the document doesn't exist, create it
        await setDoc(settingsRef, { basePrice: parseFloat(basePrice) });
      } else {
        await updateDoc(settingsRef, { basePrice: parseFloat(basePrice) });
      }
  
      setRefresh((prev) => !prev); // Trigger a refresh
    } catch (error) {
      console.error("Error setting base price:", error);
    }
  };

  const handleBlockDateRange = async () => {
    if (!blockStartDate || !blockEndDate) return;
  
    try {
      const dateRange = getDateRange(blockStartDate, blockEndDate);
      const settingsRef = doc(db, 'adminSettings', 'settings');
      const settingsDoc = await getDoc(settingsRef);
  
      let currentBlockedDates = [];
      if (settingsDoc.exists()) {
        currentBlockedDates = settingsDoc.data().blockedDates || [];
      } else {
        // If the document doesn't exist, create it
        await setDoc(settingsRef, { blockedDates: [] });
      }
  
      const updatedBlockedDates = [...new Set([...currentBlockedDates, ...dateRange])];
      await updateDoc(settingsRef, { blockedDates: updatedBlockedDates });
  
      setBlockedDates(updatedBlockedDates);
      setBlockStartDate(null);
      setBlockEndDate(null);
    } catch (error) {
      console.error("Error blocking dates:", error);
    }
  };

  const handleUnblockDateRange = async () => {
    if (!blockStartDate || !blockEndDate) return;
    
    try {
      const dateRange = getDateRange(blockStartDate, blockEndDate);
      const settingsRef = doc(db, 'calendar', 'settings');
      const settingsDoc = await getDoc(settingsRef);
      const currentBlockedDates = settingsDoc.exists() ? settingsDoc.data().blockedDates || [] : [];

      const updatedBlockedDates = currentBlockedDates.filter(
        date => !dateRange.includes(date)
      );

      await updateDoc(settingsRef, { blockedDates: updatedBlockedDates });
      setBlockedDates(updatedBlockedDates);
      setBlockStartDate(null);
      setBlockEndDate(null);
    } catch (error) {
      console.error("Error unblocking dates:", error);
    }
  };

  const handleSetMinNights = async () => {
    if (!minNightsStartDate || !minNightsEndDate || !minNights) return;
  
    try {
      const newRule = {
        startDate: minNightsStartDate.toISOString().split('T')[0],
        endDate: minNightsEndDate.toISOString().split('T')[0],
        minNights: parseInt(minNights),
      };
  
      const settingsRef = doc(db, 'adminSettings', 'settings'); // Correct path
      const settingsDoc = await getDoc(settingsRef);
  
      let currentRules = [];
      if (settingsDoc.exists()) {
        currentRules = settingsDoc.data().minNightsRules || [];
      } else {
        // If the document doesn't exist, create it
        await setDoc(settingsRef, { minNightsRules: [] });
      }
  
      const updatedRules = [...currentRules, newRule];
      await updateDoc(settingsRef, { minNightsRules: updatedRules });
  
      setMinNightsRules(updatedRules);
      setMinNightsStartDate(null);
      setMinNightsEndDate(null);
      setMinNights('');
    } catch (error) {
      console.error('Error setting minimum nights:', error);
    }
  };  

  const handleRemoveMinNightsRule = async (index) => {
    try {
      const settingsRef = doc(db, 'adminSettings', 'settings'); // Correct path
      const settingsDoc = await getDoc(settingsRef);
  
      if (!settingsDoc.exists()) {
        console.error('Document does not exist at path: adminSettings/settings');
        return;
      }
  
      const currentRules = settingsDoc.data().minNightsRules || [];
      const updatedRules = currentRules.filter((_, i) => i !== index); // Remove the rule at the specified index
  
      await updateDoc(settingsRef, { minNightsRules: updatedRules });
      setMinNightsRules(updatedRules); // Update local state
    } catch (error) {
      console.error('Error removing minimum nights rule:', error);
    }
  };

  const handleUnblockDate = async (date) => {
    try {
      const settingsRef = doc(db, 'adminSettings', 'settings'); // Correct path
      const settingsDoc = await getDoc(settingsRef);
  
      if (!settingsDoc.exists()) {
        console.error('Document does not exist at path: adminSettings/settings');
        return;
      }
  
      const currentBlockedDates = settingsDoc.data().blockedDates || [];
      const updatedBlockedDates = currentBlockedDates.filter((d) => d !== date); // Remove the specified date
  
      await updateDoc(settingsRef, { blockedDates: updatedBlockedDates });
      setBlockedDates(updatedBlockedDates); // Update local state
    } catch (error) {
      console.error('Error unblocking date:', error);
    }
  };

  const handleRemovePrice = async (date) => {
    const dateStr = date.toISOString().split('T')[0];
  
    try {
      const settingsRef = doc(db, 'adminSettings', 'settings'); // Correct path
      const settingsDoc = await getDoc(settingsRef);
  
      if (!settingsDoc.exists()) {
        console.error('Document does not exist at path: adminSettings/settings');
        return;
      }
  
      const currentPrices = settingsDoc.data().prices || {};
      delete currentPrices[dateStr];
  
      await updateDoc(settingsRef, { prices: currentPrices });
      setPrices(currentPrices);
      setSelectedDate(null);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error('Error removing price:', error);
    }
  };
  return (
<div className="admin-booking-container">
  <NavBar/>
  <div className="admin-calendar">
    <h2 className="admin-title">Gérer le Calendrier</h2>

    <div className="admin-section">
      <h3 className="admin-subtitle">Prix de Base</h3>
      <div className="admin-form-group">
        <label className="admin-form-label">Prix de Base pour Tous les Jours</label>
        <div className="admin-flex">
          <input
            type="number"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            className="admin-form-input admin-price-input"
            placeholder="Entrer le prix de base"
          />
          <button onClick={handleSetBasePrice} className="admin-button">
            Définir le Prix de Base
          </button>
        </div>
      </div>
    </div>

    <div className="admin-section">
  <h3 className="admin-subtitle">Prix par Période</h3>
  
  <div className="admin-form-group">
    <label className="admin-form-label">Sélectionner une Période</label>
    <div className="admin-flex">
    <DatePicker
      selected={priceStartDate}
      onChange={(date) => setPriceStartDate(date)}
      selectsStart
      startDate={priceStartDate}
      endDate={priceEndDate}
      minDate={new Date()} // Prevent selecting past dates
      className="admin-form-input"
      dayClassName={(date) => {
        const dateStr = date.toISOString().split('T')[0];
        if (blockedDates.includes(dateStr)) return 'blocked-day'; // Gray out blocked days
        if (prices[dateStr]) return 'has-price'; // Highlight days with a price
        return "";
      }}
      renderDayContents={(day, date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to compare correctly
        if (date < today) return <span>{day}</span>; // Don't show price for past days

        return (
          <div className="admin-date-cell">
            <span>{day}</span>
            <span className="admin-price-tag">{renderDatePrice(date)}</span>
          </div>
        );
      }}
    />


    <DatePicker
      selected={priceEndDate}
      onChange={(date) => setPriceEndDate(date)}
      selectsEnd
      startDate={priceStartDate}
      endDate={priceEndDate}
      minDate={priceStartDate} // Prevent selecting past dates
      className="admin-form-input"
      dayClassName={(date) => {
        const dateStr = date.toISOString().split('T')[0];
        if (blockedDates.includes(dateStr)) return 'blocked-day'; // Gray out blocked days
        if (prices[dateStr]) return 'has-price'; // Highlight days with a price
        return "";
      }}
      renderDayContents={(day, date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to compare correctly
        if (date < today) return <span>{day}</span>; // Don't show price for past days

        return (
          <div className="admin-date-cell">
            <span>{day}</span>
            <span className="admin-price-tag">{renderDatePrice(date)}</span>
          </div>
        );
      }}
    />
    </div>
  </div>

  <div className="admin-form-group">
    <label className="admin-form-label">Prix pour la Période Sélectionnée</label>
    <div className="admin-flex">
          <input
            type="number"
            value={rangePrice}
            onChange={(e) => setRangePrice(e.target.value)}
            className="admin-form-input admin-price-input"
            placeholder="Entrer le prix"
          />
          <button onClick={handleSetRangePrice} className="admin-button">
            Définir le Prix
          </button>
        </div>
      </div>
    </div>

    <div className="admin-section">
      <h3 className="admin-subtitle">Bloquer une Période</h3>
      <div className="admin-form-group">
        <label className="admin-form-label">Date de Début</label>
        <DatePicker
          selected={blockStartDate}
          onChange={(date) => setBlockStartDate(date)}
          selectsStart
          startDate={blockStartDate}
          endDate={blockEndDate}
          minDate={new Date()} // ✅ Prevent past selections
          className="admin-form-input"
          dayClassName={(date) => {
            const dateStr = date.toISOString().split('T')[0];
            if (blockedDates.includes(dateStr)) return 'blocked-day'; // Gray out blocked days
            return "";
          }}
          renderDayContents={(day, date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
            if (date < today) return <span>{day}</span>; // ❌ Hide prices for past days

            return (
              <div className="admin-date-cell">
                <span>{day}</span>
                <span className="admin-price-tag">{renderDatePrice(date)}</span>
              </div>
            );
          }}
        />

      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Date de Fin</label>
        <DatePicker
          selected={blockEndDate}
          onChange={(date) => setBlockEndDate(date)}
          selectsEnd
          startDate={blockStartDate}
          endDate={blockEndDate}
          minDate={blockStartDate} // ✅ Ensures logical range selection
          className="admin-form-input"
          dayClassName={(date) => {
            const dateStr = date.toISOString().split('T')[0];
            if (blockedDates.includes(dateStr)) return 'blocked-day'; // Gray out blocked days
            return "";
          }}
          renderDayContents={(day, date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
            if (date < today) return <span>{day}</span>; // ❌ Hide prices for past days

            return (
              <div className="admin-date-cell">
                <span>{day}</span>
                <span className="admin-price-tag">{renderDatePrice(date)}</span>
              </div>
            );
          }}
        />

      </div>
      <div className="admin-flex">
        <button onClick={handleBlockDateRange} className="admin-button2" disabled={!blockStartDate || !blockEndDate}>
          Bloquer la Période
        </button>
      </div>
    </div>

    <div className="admin-section">
      <h3 className="admin-subtitle">Définir le Minimum de Nuits</h3>
      <div className="admin-form-group">
        <label className="admin-form-label">Date de Début de la Période</label>
        <DatePicker
          selected={minNightsStartDate}
          onChange={(date) => setMinNightsStartDate(date)}
          selectsStart
          startDate={minNightsStartDate}
          endDate={minNightsEndDate}
          minDate={new Date()}
          className="admin-form-input"
        />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Date de Fin de la Période</label>
        <DatePicker
          selected={minNightsEndDate}
          onChange={(date) => setMinNightsEndDate(date)}
          selectsEnd
          startDate={minNightsStartDate}
          endDate={minNightsEndDate}
          minDate={minNightsStartDate}
          className="admin-form-input"
        />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Minimum de Nuits Requis</label>
        <input
          type="number"
          min="1"
          value={minNights}
          onChange={(e) => setMinNights(e.target.value)}
          className="admin-form-input admin-number-input"
          placeholder="Entrer le minimum de nuits"
        />
      </div>
      <button onClick={handleSetMinNights} className="admin-button2" disabled={!minNightsStartDate || !minNightsEndDate || !minNights}>
        Définir le Minimum de Nuits
      </button>
    </div>

    <div className="admin-section">
      <h3 className="admin-subtitle">Paramètres Actuels</h3>
      <div className="admin-grid">
        <div className="admin-form-group">
          <div className="admin-form-group">
            <h4 className="admin-small-title">Prix Actuel</h4>
            <div className="admin-price-display">
              {getCurrentPrice() !== null ? getCurrentPrice() : 'Aucun prix défini'}€
            </div>
          </div>
        </div>

        <h4 className="admin-small-title">Prix par jours</h4>
        <div className="admin-scroll">
          <ul>
            {Object.entries(prices).map(([date, prices]) => (
              <li key={date} className="admin-list-item">
                <span>
                  {date} : {prices}€
                </span>
                <button
                  onClick={() => handleRemovePrice(new Date(date))} // Use handleRemovePrice to remove the price
                  className="admin-button-danger"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="admin-form-group">
          <h4 className="admin-small-title">Dates Bloquées</h4>
          <div className="admin-scroll">
            <ul>
              {blockedDates.map(date => (
                <li key={date} className="admin-list-item">
                  <span>{date}</span>
                  <button onClick={() => handleUnblockDate(date)} className="admin-button-danger">
                    Débloquer
                  </button>

                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="admin-form-group admin-col-span">
          <h4 className="admin-small-title">Règles de Nuits Minimum</h4>
          <div className="admin-scroll">
            <ul>
              {minNightsRules.map((rule, index) => (
                <li key={index} className="admin-list-item">
                  <span>
                    {rule.startDate} à {rule.endDate}: Minimum {rule.minNights} nuits
                  </span>
                  <button onClick={() => handleRemoveMinNightsRule(index)} className="admin-button-danger">
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};


export default AdminCalendar;