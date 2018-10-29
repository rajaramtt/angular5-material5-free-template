


import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Orders } from './orders';
import { OrdersService } from './orders.service';
import { ordersList } from '../orders/orderslist';

import { OrderCancelComponent } from '../layout/dialog/order.cancel.component';
import { DeliveryConfirmComponent } from '../layout/dialog/delivery.confirm.component';




@Component({
  selector: 'app-users-list',
  templateUrl: './orders.component.html',
})
export class OrderComponent implements OnInit {
  displayedColumns = ['order', 'name', 'price', 'status', 'actions'];
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;

  animal: string;
  name: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private ordersService: OrdersService, public dialog: MatDialog, private toastrService: ToastrService, private router: Router) {

  }

  ngOnInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.ordersService.getOrderList(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.total_count;

          return data.orders;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);

  }

  cancelOrder(element): void {
    const dialogRef = this.dialog.open(OrderCancelComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.ordersService.cancelOrder(element)
        .subscribe((res) => {
          if (res.status == 'success') {
            this.toastrService.success(res.msg);
            this.router.navigate(['/orders']);
          }
        }, function (err) {
          this.toastrService.error(err);
        });

      }
    });
  }

  deliveryOrder(element): void {
    const dialogRef = this.dialog.open(DeliveryConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.ordersService.deliveryOrder(element)
        .subscribe((res) => {
          if (res.status == 'success') {
            this.toastrService.success(res.msg);
            this.router.navigate(['/orders']);
          }
        }, function (err) {
          this.toastrService.error(err);
        });

      }
    });
  }



}

