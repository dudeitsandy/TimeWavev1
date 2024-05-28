import React, { useEffect, useState } from 'react';
import { supabase } from '../app/lib/supabaseClient';

const Calendar = () => {
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    const fetchCalendars = async () => {
      const { data, error } = await supabase
        .from('calendars')
        .select('*');
      if (error) {
        console.error('Error fetching calendars:', error);
      } else {
        setCalendars(data);
      }
    };
    fetchCalendars();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {calendars.map((calendar) => (
        <div key={calendar.id} className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-2">{calendar.name}</h2>
          {/* Display timeslots and other details */}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
