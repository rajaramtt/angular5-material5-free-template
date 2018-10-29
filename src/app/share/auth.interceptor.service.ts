
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from './message.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService, private toastrService: ToastrService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return Observable.fromPromise(this.handleAccess(request, next)).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // process successful responses here
      }
    }, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        console.log(error);
        this.toastrService.error(error.message);

        // if (error.status === 401) {
        //  console.log('404');
        // }
      }
    });
  }



  private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
    Promise<HttpEvent<any>> {
    const token = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).token : '';
    let changedRequest = request;
    const headerSettings: { [name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }
    if (token) {
      headerSettings['Authorization'] = token;
    }
    headerSettings['Content-Type'] = 'application/json';
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({
      headers: newHeader
    });

    return next.handle(changedRequest).toPromise();












  }
}

