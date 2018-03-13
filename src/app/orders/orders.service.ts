import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Orders } from '../orders/orders';
import { ordersList } from '../orders/orderslist';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OrdersService {

  private orderlist = 'assets/json/orders.json';

  constructor(private http: HttpClient) {

  }


  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.orderlist);
  }

  getOrderList(sort: string, order: string, page: number): Observable<ordersList> {
    const href = 'assets/json/orderslist.json';
    const requestUrl = `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;
    return this.http.get<ordersList>(requestUrl);
  }

  cancelOrder(users: Orders): Observable<any> {
    const href = 'http://localhost/angular/server/cancel_order.php';
    return this.http.post<Orders>(href, users)
  }

  deliveryOrder(users: Orders): Observable<any> {
    const href = 'http://localhost/angular/server/delivery_order.php';
    return this.http.post<Orders>(href, users)
  }


  



  

}
