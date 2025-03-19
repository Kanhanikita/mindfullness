import Button from './Button/Button.jsx'
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import {createViewWeek, createViewMonthGrid, createViewMonthAgenda} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/calendar.css'
import Pomodoro from './Pomodoro/Pomodoro.jsx'
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';


function App() {
  const calendar = useCalendarApp({
    views: [
      createViewWeek(),
      createViewMonthGrid()
    ],
    events: [ //from api
      {
        id:1,
        title: 'Calc Midterm',
        start: '2025-01-01 00:00',
        end: '2025-01-01 02:00',
        description: 'Study!!!'
      }
    ],
    selectedDate: '2025-01-01',
    plugins: [ 
      createEventModalPlugin(),
      createDragAndDropPlugin()
    ]
  })
  return(
    <>
    <Pomodoro/>
    <ScheduleXCalendar calendarApp={calendar} />
    </>
    
    
    
  );
}

export default App
