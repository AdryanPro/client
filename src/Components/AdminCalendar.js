import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../CSS/AdminCalendar.css"

const AdminCalendar = ({ 
  prices, 
  blockedDates, 
  minNightsRules,
  onPriceUpdate, 
  onBlockedDatesUpdate,
  onMinNightsUpdate
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [price, setPrice] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [blockStartDate, setBlockStartDate] = useState(null);
  const [blockEndDate, setBlockEndDate] = useState(null);
  const [minNightsStartDate, setMinNightsStartDate] = useState(null);
  const [minNightsEndDate, setMinNightsEndDate] = useState(null);
  const [minNights, setMinNights] = useState('');

  const handleSetPrice = () => {
    if (selectedDate && price) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const newPrices = {
        ...prices,
        [dateStr]: parseFloat(price)
      };
      onPriceUpdate(newPrices);
      setSelectedDate(null);
      setPrice('');
    }
  };

  const handleSetBasePrice = () => {
    if (basePrice) {
      const basePriceNum = parseFloat(basePrice);
      const today = new Date();
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(today.getFullYear() + 1);
  
      const newPrices = {};
      let currentDate = new Date(today);
  
      while (currentDate <= oneYearFromNow) {
        const dateStr = currentDate.toISOString().split('T')[0];
        // Always set the new base price, overriding old values
        newPrices[dateStr] = basePriceNum;
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
      // Update state with the new price list
      onPriceUpdate(newPrices);
      setBasePrice('');
    }
  };
  

  const handleBlockDateRange = () => {
    if (blockStartDate && blockEndDate) {
      const newBlockedDates = [...blockedDates];
      let currentDate = new Date(blockStartDate);
      
      while (currentDate <= blockEndDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (!newBlockedDates.includes(dateStr)) {
          newBlockedDates.push(dateStr);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      onBlockedDatesUpdate(newBlockedDates);
      setBlockStartDate(null);
      setBlockEndDate(null);
    }
  };

  const handleSetMinNights = () => {
    if (minNightsStartDate && minNightsEndDate && minNights) {
      const newRule = {
        startDate: minNightsStartDate.toISOString().split('T')[0],
        endDate: minNightsEndDate.toISOString().split('T')[0],
        minNights: parseInt(minNights, 10)
      };
      
      const filteredRules = minNightsRules.filter(rule => 
        rule.endDate < newRule.startDate || rule.startDate > newRule.endDate
      );
      
      onMinNightsUpdate([...filteredRules, newRule]);
      setMinNightsStartDate(null);
      setMinNightsEndDate(null);
      setMinNights('');
    }
  };

  const handleRemoveMinNightsRule = (index) => {
    const newRules = [...minNightsRules];
    newRules.splice(index, 1);
    onMinNightsUpdate(newRules);
  };

  const handleBlockDate = () => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      if (!blockedDates.includes(dateStr)) {
        const newBlockedDates = [...blockedDates, dateStr];
        onBlockedDatesUpdate(newBlockedDates);
      }
      setSelectedDate(null);
    }
  };

  const handleUnblockDate = () => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const newBlockedDates = blockedDates.filter(date => date !== dateStr);
      onBlockedDatesUpdate(newBlockedDates);
      setSelectedDate(null);
    }
  };

  const handleUnblockDateRange = () => {
    if (blockStartDate && blockEndDate) {
      let currentDate = new Date(blockStartDate);
      const endDate = new Date(blockEndDate);
      const newBlockedDates = [...blockedDates];
      
      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const index = newBlockedDates.indexOf(dateStr);
        if (index !== -1) {
          newBlockedDates.splice(index, 1);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      onBlockedDatesUpdate(newBlockedDates);
      setBlockStartDate(null);
      setBlockEndDate(null);
    }
  };

  const renderDatePrice = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const price = prices[dateStr];
    return price ? `€${price}` : '';
  };

  // Get the current price (most common price in the prices object)
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
                  <button onClick={() => onBlockedDatesUpdate(blockedDates.filter(d => d !== date))} className="admin-button-danger">
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

AdminCalendar.propTypes = {
  prices: PropTypes.objectOf(PropTypes.number).isRequired,
  blockedDates: PropTypes.arrayOf(PropTypes.string).isRequired,
  minNightsRules: PropTypes.arrayOf(PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    minNights: PropTypes.number.isRequired
  })).isRequired,
  onPriceUpdate: PropTypes.func.isRequired,
  onBlockedDatesUpdate: PropTypes.func.isRequired,
  onMinNightsUpdate: PropTypes.func.isRequired
};

export default AdminCalendar;