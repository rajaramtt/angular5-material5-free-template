import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ap-angular2-fullcalendar';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: [
    './schedule.component.css',
  ]
})
export class ScheduleComponent implements OnInit {
  constructor(private scheduleService: ScheduleService) { }

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  changeCalendarView(view) {
    this.myCalendar.fullCalendar('changeView', view);
  }
  calendarOptions: Object;
  calendarData: Object;
  title: string;

  ngOnInit() {

    this.title = 'Schedule';

    this.scheduleService.getSchedule().subscribe(
      data => {
        this.calendarData = data;
      },
      err => console.error(err),
      () => {
        this.calendarOptions = {
          height: '',
          fixedWeekCount: false,
          editable: true,
          eventLimit: true,
          events: this.calendarData
        };
      }
    );

  }

}
