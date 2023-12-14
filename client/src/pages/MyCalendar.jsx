import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import "./Page's.css";

const localizer = momentLocalizer(moment);

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

  const [currentDate, setCurrentDate] = React.useState(moment());

  const onView = (view) => {
    // Update the current date when the view changes
    setCurrentDate(moment());
  };

  const onNavigate = (date, view) => {
    // Update the current date when navigating
    setCurrentDate(moment(date));
  };

  const dayPropGetter = (date) => {
    const isCurrentDay = moment(date).isSame(currentDate, 'day');
    return {
      className: isCurrentDay ? 'currentDay' : '',
    };
  };

  return (
    <div className="calendarContainer">
      <style>{`
        .rbc-calendar {
          overflow: hidden;
        }

        .rbc-time-view {
          overflow-x: auto;
        }

        .rbc-month-view {
          table-layout: fixed;
        }

        .rbc-header + .rbc-time-header {
          width: calc(100% - 1em);
        }

        .rbc-row-bg + .rbc-time-content {
          width: calc(100% - 1em);
        }

        .rbc-row-bg, .rbc-header, .rbc-day-slot {
          cursor: default !important;
        }

        .currentDay {
          color: black; /* Set the text color to black or apply other styles as needed */
          /* Add any additional styles for the current day */
        }
      `}</style>
      <Calendar
        localizer={localizer}
        events={events || []}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 200 }}
        components={{
          toolbar: CustomToolbar,
        }}
        onView={onView}
        onNavigate={onNavigate}
        dayPropGetter={dayPropGetter}
        selectable
      />
    </div>
  );
};

export default MyCalendar;
