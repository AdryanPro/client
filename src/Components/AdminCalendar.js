import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../CSS/Reservation.css"

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
      
      const newPrices = { ...prices };
      let currentDate = new Date(today);
      
      while (currentDate <= oneYearFromNow) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (!prices[dateStr]) {
          newPrices[dateStr] = basePriceNum;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
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
    <div className="booking-container">
      <div className="admin-calendar">
        <h2 className="text-2xl font-bold mb-6">Gérer le Calendrier</h2>
        
        <div className="admin-section">
          <h3 className="text-xl font-semibold mb-4">Prix de Base</h3>
          <div className="form-group">
            <label className="form-label">Prix de Base pour Tous les Jours</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                className="form-input price-input"
                placeholder="Entrer le prix de base"
              />
              <button onClick={handleSetBasePrice} className="submit-button">
                Définir le Prix de Base
              </button>
            </div>
          </div>
        </div>

        <div className="admin-section">
          <h3 className="text-xl font-semibold mb-4">Prix par Jour</h3>
          <div className="form-group">
            <label className="form-label">Sélectionner une Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              className="form-input"
              dayClassName={date => {
                if (blockedDates.includes(date.toISOString().split('T')[0])) return 'blocked-date';
                return prices[date.toISOString().split('T')[0]] ? 'has-price' : undefined;
              }}
              renderDayContents={(day, date) => (
                <div className="date-cell">
                  <span>{day}</span>
                  <span className="price-tag">{renderDatePrice(date)}</span>
                </div>
              )}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Prix pour la Date Sélectionnée</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-input price-input"
                placeholder="Entrer le prix"
              />
              <button onClick={handleSetPrice} className="submit-button">
                Définir le Prix
              </button>
            </div>
          </div>
        </div>

        <div className="admin-section">
          <h3 className="text-xl font-semibold mb-4">Bloquer/Débloquer une Période</h3>
          <div className="form-group">
            <label className="form-label">Date de Début</label>
            <DatePicker
              selected={blockStartDate}
              onChange={(date) => setBlockStartDate(date)}
              selectsStart
              startDate={blockStartDate}
              endDate={blockEndDate}
              minDate={new Date()}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Date de Fin</label>
            <DatePicker
              selected={blockEndDate}
              onChange={(date) => setBlockEndDate(date)}
              selectsEnd
              startDate={blockStartDate}
              endDate={blockEndDate}
              minDate={blockStartDate}
              className="form-input"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleBlockDateRange}
              className="block-button"
              disabled={!blockStartDate || !blockEndDate}
            >
              Bloquer la Période
            </button>
            <button 
              onClick={handleUnblockDateRange}
              className="submit-button"
              disabled={!blockStartDate || !blockEndDate}
            >
              Débloquer la Période
            </button>
          </div>
        </div>

        <div className="admin-section">
          <h3 className="text-xl font-semibold mb-4">Définir le Minimum de Nuits</h3>
          <div className="form-group">
            <label className="form-label">Date de Début de la Période</label>
            <DatePicker
              selected={minNightsStartDate}
              onChange={(date) => setMinNightsStartDate(date)}
              selectsStart
              startDate={minNightsStartDate}
              endDate={minNightsEndDate}
              minDate={new Date()}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Date de Fin de la Période</label>
            <DatePicker
              selected={minNightsEndDate}
              onChange={(date) => setMinNightsEndDate(date)}
              selectsEnd
              startDate={minNightsStartDate}
              endDate={minNightsEndDate}
              minDate={minNightsStartDate}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Minimum de Nuits Requis</label>
            <input
              type="number"
              min="1"
              value={minNights}
              onChange={(e) => setMinNights(e.target.value)}
              className="form-input number-input"
              placeholder="Entrer le minimum de nuits"
            />
          </div>
          <button 
            onClick={handleSetMinNights}
            className="submit-button"
            disabled={!minNightsStartDate || !minNightsEndDate || !minNights}
          >
            Définir le Minimum de Nuits
          </button>
        </div>

        <div className="admin-section">
          <h3 className="text-xl font-semibold mb-4">Paramètres Actuels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <h4 className="text-lg font-medium mb-2">Prix Actuel</h4>
              <div className="text-xl font-semibold">
                {getCurrentPrice() !== null ? `€${getCurrentPrice()}` : 'Aucun prix défini'}
              </div>
            </div>

            <div className="form-group">
              <h4 className="">Dates Bloquées</h4>
              <div className="AddScroll">
                <ul className="space-y-1">
                  {blockedDates.map(date => (
                    <li key={date} className="flex items-center justify-between">
                      <span className="text-sm">{date}</span>
                      <button
                        onClick={() => {
                          const newBlockedDates = blockedDates.filter(d => d !== date);
                          onBlockedDatesUpdate(newBlockedDates);
                        }}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Débloquer
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="form-group col-span-2">
              <h4 className="text-lg font-medium mb-2">Règles de Nuits Minimum</h4>
              <div className="AddScroll">
                <ul className="space-y-2">
                  {minNightsRules.map((rule, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">
                        {rule.startDate} à {rule.endDate}: Minimum {rule.minNights} nuits
                      </span>
                      <button
                        onClick={() => handleRemoveMinNightsRule(index)}
                        className="text-red-600 hover:text-red-800"
                      >
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