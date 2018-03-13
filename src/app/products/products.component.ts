
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { Products } from './products';
import { productsList } from './productslist';

import { ProductsService } from '../products/products.service';
import { ConfirmProductComponent } from '../layout/dialog/confirm.product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumns = ['product', 'name', 'price', 'quantity', 'status', 'actions'];
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;

  animal: string;
  name: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private productsService: ProductsService, public dialog: MatDialog, private toastrService: ToastrService, private router: Router) {
    
  }

  ngOnInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.productsService.getProductsList(
          this.sort.active, this.sort.direction, this.paginator.pageIndex);
      }),
      map(data => {
        this.isLoadingResults = false;
        this.resultsLength = data.total_count;

        return data.products;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        return observableOf([]);
      })
      ).subscribe(data => this.dataSource.data = data);

  }

  outofStack(element): void {
      const dialogRef = this.dialog.open(ConfirmProductComponent);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.productsService.updateProduct(element)
          .subscribe((res) => {
            if (res.status == 'success') {
              this.toastrService.success(res.msg);
              this.router.navigate(['/products']);
            }
          }, function (err) {
            this.toastrService.error(err);
          })
  
        }
      });


  }

}