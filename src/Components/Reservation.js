import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../CSS/Reservation.css"

export const Reservation = ({ prices, blockedDates, minNightsRules }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [pets, setPets] = useState(0);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [options, setOptions] = useState({
    heater: false,
    bedMade: false,
    cleaning: false,
    breakfast: false,
  });

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(null); // Reset end date when start date changes
    setError('');
  };

  const handleEndDateChange = (date) => {
    if (!startDate || !date) {
      setEndDate(date);
      return;
    }

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = date.toISOString().split('T')[0];
    
    // Find applicable minimum nights rule
    const applicableRule = minNightsRules.find(rule => 
      rule.startDate <= startDateStr && rule.endDate >= startDateStr
    );

    if (applicableRule) {
      const nights = Math.ceil((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      if (nights < applicableRule.minNights) {
        setError(`Minimum stay of ${applicableRule.minNights} nights required for this period`);
        return;
      }
    }

    setEndDate(date);
    setError('');
  };

  const handleAdultsChange = (value) => {
    const newValue = Math.min(10, Math.max(1, value));
    if (newValue + children > 10) {
      setError('Combined number of adults and children cannot exceed 10');
      return;
    }
    setError('');
    setAdults(newValue);
  };

  const handleChildrenChange = (value) => {
    const newValue = Math.min(10, Math.max(0, value));
    if (adults + newValue > 10) {
      setError('Combined number of adults and children cannot exceed 10');
      return;
    }
    setError('');
    setChildren(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (adults + children > 10) {
      setError('Combined number of adults and children cannot exceed 10');
      return;
    }
    // Handle reservation submission
    console.log({
      startDate,
      endDate,
      adults,
      children,
      babies,
      pets,
      lastName,
      firstName,
      phone,
      email,
      options,
    });
  };

  const isDateBlocked = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return blockedDates.includes(dateStr);
  };

  const renderDatePrice = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const price = prices[dateStr];
    return price ? `$${price}` : '';
  };

  return (
    <div className="booking-container">
      <form onSubmit={handleSubmit}>
        <div className="calendar-section">
          <div className="form-group">
            <label className="form-label">Arrival Date</label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              excludeDates={blockedDates.map(date => new Date(date))}
              className="form-input"
              dayClassName={date => {
                if (isDateBlocked(date)) return 'blocked-date';
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
            <label className="form-label">Departure Date</label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              excludeDates={blockedDates.map(date => new Date(date))}
              className="form-input"
              dayClassName={date => {
                if (isDateBlocked(date)) return 'blocked-date';
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
          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="form-section">
          <div className="form-group">
            <label className="form-label">Number of Adults (max 10)</label>
            <input
              type="number"
              min="1"
              max="10"
              value={adults}
              onChange={(e) => handleAdultsChange(parseInt(e.target.value))}
              className="form-input number-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Number of Children (max 10)</label>
            <input
              type="number"
              min="0"
              max="10"
              value={children}
              onChange={(e) => handleChildrenChange(parseInt(e.target.value))}
              className="form-input number-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Number of Babies (no limit)</label>
            <input
              type="number"
              min="0"
              value={babies}
              onChange={(e) => setBabies(parseInt(e.target.value))}
              className="form-input number-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Number of Pets (max 5)</label>
            <input
              type="number"
              min="0"
              max="5"
              value={pets}
              onChange={(e) => setPets(Math.min(5, parseInt(e.target.value)))}
              className="form-input number-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Additional Options</label>
            <div className="options-grid">
              <label className="option-item">
                <input
                  type="checkbox"
                  checked={options.heater}
                  onChange={(e) => setOptions({ ...options, heater: e.target.checked })}
                />
                Heater
              </label>
              <label className="option-item">
                <input
                  type="checkbox"
                  checked={options.bedMade}
                  onChange={(e) => setOptions({ ...options, bedMade: e.target.checked })}
                />
                Bed Made
              </label>
              <label className="option-item">
                <input
                  type="checkbox"
                  checked={options.cleaning}
                  onChange={(e) => setOptions({ ...options, cleaning: e.target.checked })}
                />
                Cleaning Service
              </label>
              <label className="option-item">
                <input
                  type="checkbox"
                  checked={options.breakfast}
                  onChange={(e) => setOptions({ ...options, breakfast: e.target.checked })}
                />
                Breakfast
              </label>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Make Reservation
          </button>
        </div>
      </form>
    </div>
  );
};

Reservation.propTypes = {
  prices: PropTypes.objectOf(PropTypes.number).isRequired,
  blockedDates: PropTypes.arrayOf(PropTypes.string).isRequired,
  minNightsRules: PropTypes.arrayOf(PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    minNights: PropTypes.number.isRequired
  })).isRequired
};

export default Reservation;