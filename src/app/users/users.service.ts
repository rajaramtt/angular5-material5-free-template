import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Users } from '../users/users';
import { usersForm } from './users.form';
import 'rxjs/add/operator/timeout';
// import { HttpErrorHandler, HandleError } from '../share/http-error-handler.service';
import { Router} from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class UsersService {

  private userslist = 'assets/json/users.json';
  // private handleError: HandleError;
  //,   httpErrorHandler: HttpErrorHandler
  constructor(private http: HttpClient) {
    // this.handleError = httpErrorHandler.createHandleError('UsersService');

  }

  getUsers(sort: string, order: string, page: number): Observable<Users> {

    const href = 'assets/json/users.json';
    const requestUrl = `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;
return this.http.get<Users>(requestUrl);
  }

  createUser(users: usersForm): Observable<any> {
    const href = 'http://localhost/angular/server/add_user.php';
    return this.http.post<usersForm>(href, users);
    // .pipe(
    //   catchError(this.handleError('createUser', users))
    // );
  }

  updateUser(users: usersForm): Observable<any> {
    const href = 'http://localhost/angular/server/update_user.php';
    return this.http.post<usersForm>(href, users);
    // .pipe(
    //   catchError(this.handleError('updateUser', users))
    // );
  }

  getUser(id): Observable<usersForm> {
    const href = 'assets/json/get_users.json';
    return this.http.get<usersForm>(href);
    // .pipe(
    //   catchError(this.handleError('getUser'))

    // );
  }

  deleteUser(users: usersForm): Observable<any> {
    const href = 'http://localhost/angular/server/delete_user.php';
    return this.http.post<usersForm>(href, users);
    // .pipe(
    //   catchError(this.handleError('deleteUser', users))
    // );
  }

  updateProfile(users: usersForm): Observable<any> {
    const href = 'http://localhost/angular/server/profile.php';
    return this.http.post<usersForm>(href, users);
    // .pipe(
    //   catchError(this.handleError('updateUser', users))
    // );
  }










}
