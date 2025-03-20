import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import "../CSS/AdminCalendar.css";
import NavBar from './LayoutComponents/NavBar';

const AdminCalendar = () => {
  // State for storing fetched data
  const [prices, setPrices] = useState({});
  const [blockedDates, setBlockedDates] = useState([]);
  const [minNightsRules, setMinNightsRules] = useState([]);
  const [priceStartDate, setPriceStartDate] = useState(null);
  const [priceEndDate, setPriceEndDate] = useState(null);
  const [rangePrice, setRangePrice] = useState('');

  // State for form inputs
  const [selectedDate, setSelectedDate] = useState(null);
  const [price, setPrice] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [blockStartDate, setBlockStartDate] = useState(null);
  const [blockEndDate, setBlockEndDate] = useState(null);
  const [minNightsStartDate, setMinNightsStartDate] = useState(null);
  const [minNightsEndDate, setMinNightsEndDate] = useState(null);
  const [minNights, setMinNights] = useState('');
  const [refresh, setRefresh] = useState(false);

  const BASE_URL = `http://localhost:5001` || 'https://maisonclem2-ca892d3e40be.herokuapp.com'; // Your backend server URL
  // Fetch initial data from backend

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/admin-calendar`);
        setPrices(response.data.prices || {});
        setBlockedDates(response.data.blockedDates || []);
        setMinNightsRules(response.data.minNightsRules || []);
        setBasePrice(response.data.basePrice ? parseFloat(response.data.basePrice) : ""); // ✅ Ensure it's a number
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };
    fetchCalendarData();
  }, [refresh]); // ✅ Use refresh to re-fetch data properly
  
  
  
  
  

  // Update price for a specific range of dates
  const handleSetRangePrice = async () => {
    if (!priceStartDate || !priceEndDate || !rangePrice) return;
  
    const startStr = priceStartDate.toISOString().split('T')[0];
    const endStr = priceEndDate.toISOString().split('T')[0];
    const dateRange = getDateRange(priceStartDate, priceEndDate);
  
    try {
      await axios.post(`${BASE_URL}/api/update-price-range`, {
        startDate: startStr,
        endDate: endStr,
        newPrice: rangePrice,
      });
  
      // ✅ Ensure all selected dates get the new price
      setPrices(prev => {
        const updatedPrices = { ...prev };
        dateRange.forEach(date => {
          updatedPrices[date] = rangePrice;
        });
        return updatedPrices;
      });
  
      // ✅ Clear inputs after updating
      setPriceStartDate(null);
      setPriceEndDate(null);
      setRangePrice('');
    } catch (error) {
      console.error("Error updating price range:", error);
    }
  };
  
  

  // Set base price for all future dates
  const handleSetBasePrice = async () => {
    if (!basePrice) return;
  
    try {
      await axios.post(`${BASE_URL}/api/set-base-price`, { basePrice });
  
      // ✅ Ensure the new base price updates the state correctly
      setPrices(prev => ({ ...prev, basePrice: parseFloat(basePrice) }));
  
      // ❌ Don't clear the input field! Keep it visible in the UI
    } catch (error) {
      console.error("Error setting base price:", error);
    }
  };

  // Utility function to generate date range
  const getDateRange = (start, end) => {
    let dates = [];
    let currentDate = new Date(start);
    const endDate = new Date(end);
  
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]); // Convert to string format
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
  
    return dates;
  };

  // Block a date range
  const handleBlockDateRange = async () => {
    if (!blockStartDate || !blockEndDate) return;
  
    try {
      // Generate all dates in the range
      const dateRange = getDateRange(blockStartDate, blockEndDate);
  
      // Send the full list of blocked dates to the backend
      await axios.post(`${BASE_URL}/api/block-dates`, {
        dates: dateRange, 
      });
  
      // Update the state with all blocked dates
      setBlockedDates(prev => [...new Set([...prev, ...dateRange])]);
  
      // Clear input fields
      setBlockStartDate(null);
      setBlockEndDate(null);
    } catch (error) {
      console.error("Error blocking dates:", error);
    }
  };

  // Unblock a date range
  const handleUnblockDateRange = async () => {
    if (!blockStartDate || !blockEndDate) return;
    try {
      await axios.post(`${BASE_URL}/api/unblock-dates`, {
        startDate: blockStartDate.toISOString().split('T')[0],
        endDate: blockEndDate.toISOString().split('T')[0],
      });
      setBlockedDates(prev => prev.filter(date => !getDateRange(blockStartDate, blockEndDate).includes(date)));
      setBlockStartDate(null);
      setBlockEndDate(null);
    } catch (error) {
      console.error("Error unblocking dates:", error);
    }
  };

  // Set minimum nights for a period
  const handleSetMinNights = async () => {
    if (!minNightsStartDate || !minNightsEndDate || !minNights) return;
    try {
      await axios.post(`${BASE_URL}/api/set-min-nights`, {
        startDate: minNightsStartDate.toISOString().split('T')[0],
        endDate: minNightsEndDate.toISOString().split('T')[0],
        minNights,
      });
      setMinNightsRules(prev => [...prev, {
        startDate: minNightsStartDate.toISOString().split('T')[0],
        endDate: minNightsEndDate.toISOString().split('T')[0],
        minNights,
      }]);
      setMinNightsStartDate(null);
      setMinNightsEndDate(null);
      setMinNights('');
    } catch (error) {
      console.error("Error setting minimum nights:", error);
    }
  };

  // Remove a minimum nights rule
  const handleRemoveMinNightsRule = async (index) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/remove-min-nights-rule/${index}`);
        
        // ✅ Update state to reflect the removed rule
        setMinNightsRules(response.data.minNightsRules);
    } catch (error) {
        console.error("Error removing minimum nights rule:", error);
    }
};

  // Get the most frequent price
  const getCurrentPrice = () => {
    if (!prices || Object.keys(prices).length === 0) return 'Aucun prix défini';
  
    // ✅ Check if a base price exists and return it
    if (basePrice) {
      return `${basePrice}`; // €
    }
  
    // ✅ If no base price, get the most common price from stored prices
    const priceValues = Object.values(prices).filter((price) => price !== basePrice);
    if (priceValues.length === 0) return 'Aucun prix défini';
  
    const priceCounts = priceValues.reduce((acc, price) => {
      acc[price] = (acc[price] || 0) + 1;
      return acc;
    }, {});
  
    // ✅ Get the most frequent price
    const mostFrequentPrice = Object.keys(priceCounts).reduce((a, b) =>
      priceCounts[a] > priceCounts[b] ? a : b
    );
  
    return `${mostFrequentPrice}`; // €
  };
  
  
  

  // Display price for a date in the calendar
  const renderDatePrice = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
  
    const dateStr = date.toISOString().split('T')[0];
  
    if (blockedDates.includes(dateStr)) return ''; // Hide price for blocked dates
    if (prices[dateStr]) return `${prices[dateStr]}€`; // Show set price for that day
    return basePrice ? `${basePrice}€` : ''; // Default to base price
  };
  

  // Unblock a single date
  const handleUnblockDate = async (date) => {
    try {
        await axios.delete(`${BASE_URL}/api/unblock-date/${date}`);
        setBlockedDates(prev => prev.filter(d => d !== date)); // Update UI
    } catch (error) {
        console.error("Error unblocking date:", error);
    }
  };

  //Function to remove the selected rang of dates
  const handleRemovePrice = async (date) => {
    const dateStr = date.toISOString().split('T')[0]; // Convert Date object to "YYYY-MM-DD" format
  
    try {
      await axios.delete(`${BASE_URL}/api/remove-price/${dateStr}`);
  
      // Update local state to reflect the removed price
      setPrices(prev => {
        const updatedPrices = { ...prev };
        delete updatedPrices[dateStr];
        return updatedPrices;
      });
  
      setSelectedDate(null);
      setRefresh(prev => !prev); // Trigger a re-render
    } catch (error) {
      console.error("Error removing price for selected date:", error);
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