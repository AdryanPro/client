import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../CSS/Reservation.css";
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
    Option1: { selected: false, price: 50 },
    Option2: { selected: false, price: 50 },
    Option3: { selected: false, price: 50 },
    Option4: { selected: false, price: 25 },
    Option5: { selected: false, price: 50 },
    Option6: { selected: false, price: 50 },
    Option7: { selected: false, price: 50 },
    Option8: { selected: false, price: 25 },
  });
  const [showPopup, setShowPopup] = useState(false);
  const BASE_URL = `http://localhost:5001` || 'https://maisonclem2-ca892d3e40be.herokuapp.com'; // Your backend server URL

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/get-reservation-data`);
        setFetchedPrices(response.data.prices || {});
        setFetchedBlockedDates(response.data.blockedDates || []);
        setFetchedMinNightsRules(response.data.minNightsRules || []);
        setBasePrice(response.data.basePrice || null);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    };
  
    fetchCalendarData();
  }, []);
  
  useEffect(() => {
    emailjs.init("36MiKWV_lUwSwuvhj");
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

    // If any blocked date is in the range, prevent selection
    const hasBlockedDate = selectedRange.some(date => fetchedBlockedDates.includes(date));

    if (hasBlockedDate) {
      setError('You cannot select a range that includes blocked dates.');
      return;
    }
  
    // Apply minimum nights rule
    const applicableRule = fetchedMinNightsRules.find(rule =>
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
      setError("Le nombre total d'adultes et d'enfants ne peut pas dépasser 10.");
      return;
    }
    setError('');
    setAdults(newValue);
  };

  const handleChildrenChange = (value) => {
    const newValue = Math.min(10, Math.max(0, value));
    if (adults + newValue > 10) {
      setError("Le nombre total d'adultes et d'enfants ne peut pas dépasser 10.");
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
      // Send emails
      await emailjs.send('service_n26skoe', 'template_dubm5ow', { ...emailParams, to_email: email }); // Send to client replace serviceID & templateID
      await emailjs.send('service_n26skoe', 'template_gkwsk49', { ...emailParams, to_email: 'lepetitenoirie@gmail.com' }); // Send to owner 
  
      // Show pop-up
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
  
    // Don't show price for past days
    if (date < today) return '';
  
    if (isDateBlocked(date)) return ''; // Hide price for blocked dates
  
    if (fetchedPrices[dateStr]) {
      return `${fetchedPrices[dateStr]}€`;  // Show specific price for that day
    }
  
    return basePrice ? `${basePrice}€` : '';  // Show base price if no specific price is set
  };

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
  
    const dateRange = getDateRange(startDate, endDate);
    let total = 0;
  
    dateRange.forEach(date => {
      if (fetchedPrices[date]) {
        total += parseFloat(fetchedPrices[date]); // Use custom price if available
      } else if (basePrice) {
        total += parseFloat(basePrice); // Use base price if no custom price
      }
    });
  
    // Additional Options Calculation
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
    <div className="booking-container-resa">
      <NavBar />
      <div className="titleResaWrapper">
        Reservation
      </div>
      <form onSubmit={handleSubmit} className="resaForm">
        <div className="calendar-section-resa">
          <div className="form-group-resa">
            <label className="form-label-resa">Date d'arrivée</label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              excludeDates={fetchedBlockedDates.map(date => new Date(date))}
              className="form-input-resa reservation-datepicker"
              dayClassName={date => {
                const dateStr = date.toISOString().split('T')[0];

                if (date < new Date()) return ''; 
                if (isDateBlocked(date)) return 'blocked-date-resa';
                if (fetchedPrices[dateStr]) return 'has-price-resa';
                if (basePrice) return 'base-price-resa';

                return '';
              }}
              renderDayContents={(day, date) => (
                <div className="date-cell-resa">
                  <span>{day}</span>
                  <span className="price-tag-resa">{renderDatePrice(date)}</span>
                </div>
              )}
            />
          </div>
          <div className="form-group-resa">
            <label className="form-label-resa">Date de départ</label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              excludeDates={fetchedBlockedDates.map(date => new Date(date))}
              className="form-input-resa reservation-datepicker"
              dayClassName={date => {
                const dateStr = date.toISOString().split('T')[0];

                if (date < new Date()) return ''; 
                if (isDateBlocked(date)) return 'blocked-date-resa';
                if (fetchedPrices[dateStr]) return 'has-price-resa';
                if (basePrice) return 'base-price-resa';

                return '';
              }}
              renderDayContents={(day, date) => (
                <div className="date-cell-resa">
                  <span>{day}</span>
                  <span className="price-tag-resa">{renderDatePrice(date)}</span>
                </div>
              )}
            />
          </div>
          {error && <div className="error-message-resa">{error}</div>}
        </div>

        <div className="form-section-resa">
          <div className="form-group-resa">
            <label className="form-label-resa">Nombre d'adultes (max 10)</label>
            <input
              type="number"
              min="1"
              max="10"
              value={adults}
              onChange={(e) => handleAdultsChange(parseInt(e.target.value))}
              className="form-input-resa number-input-resa"
            />
          </div>

          <div className="form-group-resa">
            <label className="form-label-resa">Nombre d'enfants (max 10)</label>
            <input
              type="number"
              min="0"
              max="10"
              value={children}
              onChange={(e) => handleChildrenChange(parseInt(e.target.value))}
              className="form-input-resa number-input-resa"
            />
          </div>

          <div className="form-group-resa">
            <label className="form-label-resa">Nombre de bébés (max 2)</label>
            <input
              type="number"
              min="0"
              max="2"
              value={babies}
              onChange={(e) => setBabies(parseInt(e.target.value))}
              className="form-input-resa number-input-resa"
            />
          </div>

          <div className="form-group-resa">
            <label className="form-label-resa">Nombre d'animaux (max 5)</label>
            <input
              type="number"
              min="0"
              max="5"
              value={pets}
              onChange={(e) => setPets(Math.min(5, parseInt(e.target.value)))}
              className="form-input-resa number-input-resa"
            />
          </div>

          <div className="form-group-resa">
            <label className="form-label-resa">Nom de famille</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-input-resa"
              required
            />
          </div>

          <div className="form-group-resa">
            <label className="form-label-resa">Prénom</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-input-resa"
              required
            />
          </div>

          <div className="form-group-resa">
            <label className="form-label-resa">Numéro de téléphone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input-resa"
              required
            />
          </div>

          <div className="form-group-resa">
            <label className="form-label-resa">Adresse e-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input-resa"
              required
            />
          </div>

          <div className="form-group-resa">
            <label className="form-label-resa">Options supplémentaires</label>
            <div className="options-grid-resa">
              {Object.entries(options).map(([key, option]) => (
                <label key={key} className="option-item-resa">
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

          <div className="form-group-resa total-price-container-resa">
            <h4 className="total-price-title-resa">Montant total :</h4>
            <div className="total-price-display-resa">
              {calculateTotalPrice() > 0 ? `${calculateTotalPrice()}€` : "Sélectionnez des dates pour voir le montant total"}
            </div>
          </div>
          <div className="btnResaWrapper">
            <button type="submit" className="submit-button-resa">
              Réserver
            </button>
          </div>
        </div>
      </form>

      {/* Pop-up de confirmation */}
      {showPopup && (
        <div className="popup-overlay-resa">
          <div className="popup-content-resa">
            <h2>Merci pour votre réservation !</h2>
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