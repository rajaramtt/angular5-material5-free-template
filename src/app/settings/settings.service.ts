import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Settings } from './settings';

  @Injectable()
  export class SettingsService {

    private settingsURL = 'assets/json/settings.json';

    constructor( private http: HttpClient ) {

     }

 
    getSettings(id): Observable<Settings>{
      const href = 'assets/json/get_users.json';
      return this.http.get<Settings>(this.settingsURL)
    }

    
    updateSettings(settings: Settings): Observable<any> {
        const href = 'http://localhost/angular/server/update_settings.php';
        return this.http.post<Settings>(href, settings)
      }


  }
