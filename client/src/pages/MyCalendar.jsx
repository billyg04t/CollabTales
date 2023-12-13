// MyCalendar.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import "./Page's.css"

const localizer = momentLocalizer(moment);

// Define the CustomToolbar function
const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  return (
    <div className="rbc-toolbar">
      <button type="button" onClick={goToBack}>&lt;</button>
      <span className="rbc-toolbar-label">{toolbar.label}</span>
      <button type="button" onClick={goToNext}>&gt;</button>
    </div>
  );
};

const MyCalendar = () => {
  const events = [
    {
      title: 'Event 1',
      start: new Date(2023, 0, 1, 10, 0), // January 1, 2023, 10:00 AM
      end: new Date(2023, 0, 1, 12, 0),   // January 1, 2023, 12:00 PM
    },
      // Add more events as needed
    ];

    const dayPropGetter = (date) => {
        const dayName = moment(date).format('dddd');
        return {
          className: 'custom-day-header',
          children: <span>{dayName}</span>,
        };
      };
    
      return (
        <div className="calendarContainer">
          <Calendar
            localizer={localizer}
            events={events || []}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 200, }}
            components={{
              toolbar: CustomToolbar,
            }}
            dayPropGetter={dayPropGetter}
          />
        </div>
      );
    };
    
    export default MyCalendar;
