import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import UserService from "../Services/user.service";

export class SpiralCalendar extends React.Component {
  
  render() {

    console.log('rendering');

    const spirals = (this.state && this.state.calendarSpirals ? this.state.calendarSpirals : []);

    async function getCalendarData(e, cb, cbFail) {
      let startDate = e.startStr.substring(0, 10);
      let endDate = e.endStr.substring(0, 10);

      console.log('GETTING THE SPIRALS 2');
      try {
        let results = await UserService.getSpiralsByDate(startDate, endDate);

        cb(
          results.data.map(event => {

            return {
              title: event.goals[0],
              start: event.startDate,
              url: "/spirals/" + event.id
            };
          })
        );


      //  cb(results.data);

        return results.data;

      } catch (e) {
        console.log(e);

        cbFail();
      }
    }

    return (
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={
          (fetchInfo, successCallback, failureCallback) => getCalendarData(fetchInfo, successCallback, failureCallback)
        }
      />
    )
  }
}