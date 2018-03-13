import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Passwords } from './passwords';

  @Injectable()
  export class PasswordService {


    constructor( private http: HttpClient ) {

     }


    updatePassword(password: Passwords): Observable<any> {
        const href = 'http://localhost/angular/server/update_password.php';
        return this.http.post<Passwords>(href, password)
      }


  }
