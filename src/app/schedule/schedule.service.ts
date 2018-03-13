import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Schedules } from './schedules';

  @Injectable()
  export class ScheduleService {

    private scheduleURL = 'assets/json/schedule.json';

    constructor( private http: HttpClient ) {

     }

    getSchedule (): Observable<Schedules[]> {
      return this.http.get<Schedules[]>(this.scheduleURL);
    }

  }
