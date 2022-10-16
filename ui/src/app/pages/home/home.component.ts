import { Component, OnInit } from '@angular/core';
import {CalendarOptions} from "@fullcalendar/angular";
import {CrudService} from "../../_services/crud.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
  };

  constructor(private service: CrudService) { }

  ngOnInit(): void {
    this.service.get("reservations/calendar").subscribe(resp => {
      this.calendarOptions.events = JSON.parse(JSON.stringify(resp))
    })
  }

}
