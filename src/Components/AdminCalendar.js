import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import "../CSS/AdminCalendar.css";

const AdminCalendar = () => {
  // State for storing fetched data
  const [prices, setPrices] = useState({});
  const [blockedDates, setBlockedDates] = useState([]);
  const [minNightsRules, setMinNightsRules] = useState([]);

  // State for form inputs
  const [selectedDate, setSelectedDate] = useState(null);
  const [price, setPrice] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [blockStartDate, setBlockStartDate] = useState(null);
  const [blockEndDate, setBlockEndDate] = useState(null);
  const [minNightsStartDate, setMinNightsStartDate] = useState(null);
  const [minNightsEndDate, setMinNightsEndDate] = useState(null);
  const [minNights, setMinNights] = useState('');

  // Fetch initial data from backend
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/admin-calendar');
        setPrices(response.data.prices || {});
        setBlockedDates(response.data.blockedDates || []);
        setMinNightsRules(response.data.minNightsRules || []);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };
    fetchCalendarData();
  }, []);

  // Update price for a specific date
  const handleSetPrice = async () => {
    if (!selectedDate || !price) return;
    try {
      const dateStr = selectedDate.toISOString().split('T')[0];
      await axios.post('http://localhost:5001/api/update-price', { date: dateStr, newPrice: price });
      setPrices(prev => ({ ...prev, [dateStr]: price }));
      setSelectedDate(null);
      setPrice('');
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  // Set base price for all future dates
  const handleSetBasePrice = async () => {
    if (!basePrice) return;
    try {
      await axios.post('http://localhost:5001/api/set-base-price', { basePrice });
      setBasePrice('');
    } catch (error) {
      console.error("Error setting base price:", error);
    }
  };

  // Block a date range
  const handleBlockDateRange = async () => {
    if (!blockStartDate || !blockEndDate) return;
    try {
      await axios.post('http://localhost:5001/api/block-dates', {
        startDate: blockStartDate.toISOString().split('T')[0],
        endDate: blockEndDate.toISOString().split('T')[0],
      });
      setBlockedDates(prev => [...prev, ...getDateRange(blockStartDate, blockEndDate)]);
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
      await axios.post('http://localhost:5001/api/unblock-dates', {
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
      await axios.post('http://localhost:5001/api/set-min-nights', {
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
      await axios.post('http://localhost:5001/api/remove-min-nights-rule', { index });
      setMinNightsRules(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error removing minimum nights rule:", error);
    }
  };

  // Utility function to generate date range
  const getDateRange = (start, end) => {
    let dates = [];
    let currentDate = new Date(start);
    const endDate = new Date(end);

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  // Get the most frequent price
  const getCurrentPrice = () => {
    const priceValues = Object.values(prices);
    if (priceValues.length === 0) return null;

    const priceCounts = {};
    let maxCount = 0;
    let currentPrice = null;

    priceValues.forEach(price => {
      priceCounts[price] = (priceCounts[price] || 0) + 1;
      if (priceCounts[price] > maxCount) {
        maxCount = priceCounts[price];
        currentPrice = price;
      }
    });

    return currentPrice;
  };

  // Display price for a date in the calendar
  const renderDatePrice = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return prices[dateStr] ? `€${prices[dateStr]}` : '';
  };

  // Unblock a single date
  const handleUnblockDate = async (date) => {
    try {
      await axios.post('http://localhost:5001/api/unblock-date', { date });
      setBlockedDates(prev => prev.filter(d => d !== date));
    } catch (error) {
      console.error("Error unblocking date:", error);
    }
  };
  return (
<div className="admin-booking-container">
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
      <h3 className="admin-subtitle">Prix par Jour</h3>
      <div className="admin-form-group">
        <label className="admin-form-label">Sélectionner une Date</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          className="admin-form-input"
          dayClassName={date => {
            if (blockedDates.includes(date.toISOString().split('T')[0])) return 'blocked-date';
            return prices[date.toISOString().split('T')[0]] ? 'has-price' : undefined;
          }}
          renderDayContents={(day, date) => (
            <div className="admin-date-cell">
              <span>{day}</span>
              <span className="admin-price-tag">{renderDatePrice(date)}</span>
            </div>
          )}
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Prix pour la Date Sélectionnée</label>
        <div className="admin-flex">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="admin-form-input admin-price-input"
            placeholder="Entrer le prix"
          />
          <button onClick={handleSetPrice} className="admin-button">
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
          minDate={new Date()}
          className="admin-form-input"
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
          minDate={blockStartDate}
          className="admin-form-input"
        />
      </div>
      <div className="admin-flex">
        <button onClick={handleBlockDateRange} className="admin-button" disabled={!blockStartDate || !blockEndDate}>
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
      <button onClick={handleSetMinNights} className="admin-button" disabled={!minNightsStartDate || !minNightsEndDate || !minNights}>
        Définir le Minimum de Nuits
      </button>
    </div>

    <div className="admin-section">
      <h3 className="admin-subtitle">Paramètres Actuels</h3>
      <div className="admin-grid">
        <div className="admin-form-group">
          <h4 className="admin-small-title">Prix Actuel</h4>
          <div className="admin-price-display">
            {getCurrentPrice() !== null ? `€${getCurrentPrice()}` : 'Aucun prix défini'}
          </div>
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