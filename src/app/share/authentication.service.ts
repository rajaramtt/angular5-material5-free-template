import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import { HttpErrorHandler, HandleError } from '../share/http-error-handler.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

    // private handleError: HandleError;
    // , httpErrorHandler: HttpErrorHandler
    constructor(private http: HttpClient) {
        // this.handleError = httpErrorHandler.createHandleError('AuthenticationService');
    }

    login(Login: any) {

        const href = 'http://localhost/angular/server/login.php';
        return this.http.post<any>(href, Login).pipe(
            tap(
                function (data) {
                    if (data.status === 'success') {
                        localStorage.setItem('currentUser', JSON.stringify(data));
                    }
                    return data;
                }
                // ,
                // function (error) {
                //     catchError(this.handleError('createUser', Login))
                // }
            )
        );
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    getUserInfo() {
        return JSON.parse(localStorage.getItem('currentUser'));

    }

    isLogin() {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        return false;
    }


}
