import React, { useState } from 'react';
import { format } from 'date-fns';
import "../CSS/Reservation.css"
import Swal from 'sweetalert2'
import Footer from './LayoutComponents/Footer';
import NavBar from './LayoutComponents/NavBar';

export const Reservation =() =>{
  const [currentDate, setCurrentDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [selectingDeparture, setSelectingDeparture] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleDateSelection = (date) => {
    if (!arrivalDate || selectingDeparture) {
      if (!arrivalDate) {
        setArrivalDate(date);
        setSelectingDeparture(true);
      } else if (date > arrivalDate) {
        setDepartureDate(date);
        setSelectingDeparture(false);
      }
    } else {
      setArrivalDate(date);
      setDepartureDate(null);
      setSelectingDeparture(true);
    }
  };

  const isDateInRange = (date) => {
    if (!arrivalDate || !departureDate) return false;
    return date >= arrivalDate && date <= departureDate;
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    // Define a function to determine the price for each day
    const getPriceForDate = (date) => {
      const dayOfWeek = date.getDay();
      // Example pricing logic: weekends are more expensive
      return dayOfWeek === 0 || dayOfWeek === 6 ? 200 : 150; // Weekend: 200, Weekday: 150
    };
  
    const days = [];
  
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }
  
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isDisabled = date < today;
      const isArrival = arrivalDate && date.getTime() === arrivalDate.getTime();
      const isDeparture = departureDate && date.getTime() === departureDate.getTime();
      const isInRange = isDateInRange(date);
      const price = getPriceForDate(date);
  
      const classes = [
        'calendar-day',
        isDisabled ? 'disabled' : '',
        isArrival ? 'arrival' : '',
        isDeparture ? 'departure' : '',
        isInRange ? 'in-range' : ''
      ]
        .filter(Boolean)
        .join(' ');
  
      days.push(
        <div
          key={day}
          className={classes}
          onClick={() => !isDisabled && handleDateSelection(date)}
        >
          <div>{day}</div>
          <div className="day-price">${price}</div> {/* Display the price */}
        </div>
      );
    }
  
    return days;
  };
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if all form fields are filled
    const isFormValid =
      formData.firstName &&
      formData.lastName &&
      formData.phone &&
      formData.email &&
      arrivalDate &&
      departureDate;
  
    if (!isFormValid) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields and select a date range.",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }
  
    Swal.fire({
      title: "Success!",
      text: `Booking submitted successfully from ${format(arrivalDate, 'MMM d, yyyy')} to ${format(departureDate, 'MMM d, yyyy')}.`,
      icon: "success",
      confirmButtonText: "OK"
    });
  
    // Clear form and state
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    });
    setArrivalDate(null);
    setDepartureDate(null);
  };  

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="calendar-wrapper">

          <div className="calendar-header">
            <button onClick={prevMonth}>&lt;</button>
            <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <button onClick={nextMonth}>&gt;</button>
          </div>

          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="weekday">{day}</div>
            ))}
            {renderCalendar()}
          </div>

          {(arrivalDate || departureDate) && (
            <div className="selected-dates">
              {arrivalDate && (
                <div>Arrival: {format(arrivalDate, 'EEE, MMM d')}</div>
              )}
              {departureDate && (
                <div>Departure: {format(departureDate, 'EEE, MMM d')}</div>
              )}
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                required
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                required
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="submit-button">
              Book Now
            </button>
          </form>
      </div>
      <Footer />
    </div>
  );
}
