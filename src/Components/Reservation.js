import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../CSS/Reservation.css"
import { useEffect } from 'react';
import axios from 'axios';
import NavBar from './LayoutComponents/NavBar';
import emailjs from "@emailjs/browser";

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
  const [fetchedPrices, setFetchedPrices] = useState({});
  const [fetchedBlockedDates, setFetchedBlockedDates] = useState([]);
  const [fetchedMinNightsRules, setFetchedMinNightsRules] = useState([]);
  const [basePrice, setBasePrice] = useState(null);
  const [options, setOptions] = useState({
    heater: { selected: false, price: 50 },
    bedMade: { selected: false, price: 50 },
    cleaning: { selected: false, price: 50 },
    breakfast: { selected: false, price: 25 },
    co: { selected: false, price: 50 },
    ko: { selected: false, price: 50 },
    lo: { selected: false, price: 50 },
    momom: { selected: false, price: 25 },
  });
  const [showPopup, setShowPopup] = useState(false); // ✅ Pop-up state
  
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/get-reservation-data');
        setFetchedPrices(response.data.prices || {});
        setFetchedBlockedDates(response.data.blockedDates || []);
        setFetchedMinNightsRules(response.data.minNightsRules || []);
        setBasePrice(response.data.basePrice || null);  // ✅ Store base price
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    };
  
    fetchCalendarData();
  }, []);
  
  useEffect(() => {
    emailjs.init("36MiKWV_lUwSwuvhj"); // ✅ Initialize EmailJS
  }, []);
  
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
  
    // Get all dates between startDate and endDate
    const getDateRange = (start, end) => {
      let dates = [];
      let currentDate = new Date(start);
      while (currentDate <= new Date(end)) {
        dates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    };
  
    const selectedRange = getDateRange(startDate, date);
  
    // ❌ If any blocked date is in the range, prevent selection
    const hasBlockedDate = selectedRange.some(date => blockedDates.includes(date));
  
    if (hasBlockedDate) {
      setError('You cannot select a range that includes blocked dates.');
      return;
    }
  
    // ✅ Apply minimum nights rule
    const applicableRule = minNightsRules.find(rule =>
      rule.startDate <= startDateStr && rule.endDate >= startDateStr
    );
  
    if (applicableRule) {
      const nights = selectedRange.length - 1;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (adults + children > 10) {
      setError('Combined number of adults and children cannot exceed 10');
      return;
    }
  
    setError('');
  
    const selectedOptions = Object.entries(options)
      .filter(([_, value]) => value.selected)
      .map(([key]) => key)
      .join(', ');
  
    const totalPrice = calculateTotalPrice();
  
    const emailParams = {
      guest_name: `${firstName} ${lastName}`,
      guest_email: email,
      guest_phone: phone,
      check_in: startDate ? startDate.toLocaleDateString() : '',
      check_out: endDate ? endDate.toLocaleDateString() : '',
      num_adults: adults,
      num_children: children,
      num_babies: babies,
      num_pets: pets,
      selected_options: selectedOptions || 'None',
      total_price: `€${totalPrice}`,
    };
  
    try {
      // ✅ Send emails
      await emailjs.send('service_n26skoe', 'template_dubm5ow', { ...emailParams, to_email: email }); //Send to client
      await emailjs.send('service_n26skoe', 'template_gkwsk49', { ...emailParams, to_email: 'your-business-email@example.com' }); //Send to owner
  
      // ✅ Show pop-up
      setShowPopup(true);
  
    } catch (error) {
      console.error('EmailJS error:', error);
      setError('Failed to send reservation. Please try again later.');
    }
  };

  const isDateBlocked = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return fetchedBlockedDates.includes(dateStr);
  };
  

  const renderDatePrice = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
    
    const dateStr = date.toISOString().split('T')[0];
  
    // ❌ Don't show price for past days
    if (date < today) return '';
  
    if (isDateBlocked(date)) return ''; // ❌ Hide price for blocked dates
  
    if (prices[dateStr]) {
      return `${prices[dateStr]}€`;  // ✅ Show specific price for that day
    }
  
    return basePrice ? `${basePrice}€` : '';  // ✅ Show base price if no specific price is set
  };

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
  
    const dateRange = getDateRange(startDate, endDate);
    let total = 0;
  
    dateRange.forEach(date => {
      if (prices[date]) {
        total += parseFloat(prices[date]); // Use custom price if available
      } else if (basePrice) {
        total += parseFloat(basePrice); // Use base price if no custom price
      }
    });
  
    // Additional Options Calculation (Each option has its own price)
    Object.values(options).forEach(option => {
      if (option.selected) total += option.price;
    });
  
    return total;
  };
  
  

  const getDateRange = (start, end) => {
    let dates = [];
    let currentDate = new Date(start);
    const endDate = new Date(end);
  
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]); // Convert to "YYYY-MM-DD"
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
  
    return dates;
  };
  return (
    <div className="booking-container">
      <NavBar />
      <form onSubmit={handleSubmit}>
        <div className="calendar-section">
          <div className="form-group">
            <label className="form-label">Arrival Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setEndDate(null); // ✅ Reset end date properly
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              excludeDates={blockedDates.map(date => new Date(date))}
              className="form-input reservation-datepicker"  // ✅ Assign class to separate CSS
              highlightDates={[{
                "react-datepicker__day--range-start": [startDate],
                "react-datepicker__day--in-range": [startDate, endDate],
                "react-datepicker__day--range-end": [endDate]
              }]}
              dayClassName={date => {
                const dateStr = date.toISOString().split('T')[0];

                if (date < new Date()) return ''; // ✅ No price for past days
                if (isDateBlocked(date)) return 'blocked-date';
                if (prices[dateStr]) return 'has-price';
                if (basePrice) return 'base-price';
                
                return '';
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
              onChange={date => {
                if (!startDate) return; // ✅ Prevent selecting end date first
                setEndDate(date);
              }}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate} // ✅ Ensure logical selection
              excludeDates={blockedDates.map(date => new Date(date))}
              className="form-input reservation-datepicker"  // ✅ Separate CSS
              highlightDates={[{
                "react-datepicker__day--range-start": [startDate],
                "react-datepicker__day--in-range": [startDate, endDate],
                "react-datepicker__day--range-end": [endDate]
              }]}
              dayClassName={date => {
                const dateStr = date.toISOString().split('T')[0];

                if (date < new Date()) return ''; // ✅ No price for past days
                if (isDateBlocked(date)) return 'blocked-date';
                if (prices[dateStr]) return 'has-price';
                if (basePrice) return 'base-price';
                
                return '';
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
            <label className="form-label">Number of Babies</label>
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
              {Object.entries(options).map(([key, option]) => (
                <label key={key} className="option-item">
                  <input
                    type="checkbox"
                    checked={option.selected}
                    onChange={(e) =>
                      setOptions({ ...options, [key]: { ...option, selected: e.target.checked } })
                    }
                  />
                  {key.charAt(0).toUpperCase() + key.slice(1)} (+{option.price}€)
                </label>
              ))}
            </div>
          </div>

          <div className="form-group total-price-container">
            <h4 className="total-price-title">Total Amount :</h4>
            <div className="total-price-display">
              {calculateTotalPrice() > 0 ? `${calculateTotalPrice()}€` : "Select dates to see total"}
            </div>
          </div>

          <button type="submit" className="submit-button">
            Make Reservation
          </button>
        </div>
      </form>
      {/* ✅ Pop-up confirmation message */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Merci pour votre réservation!</h2>
            <p>Vous serez contacté dans les plus brefs délais pour confirmer celle-ci ainsi que pour procéder au paiement.</p>
            <button onClick={() => window.location.href = '/'}>OK</button>
          </div>
        </div>
      )}
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