
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
import { Users } from './users';
import { UsersService } from './users.service';

 import { ConfirmComponent } from '../layout/dialog/confirm.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users.component.html',
})
export class UserComponent implements OnInit {
  displayedColumns = ['name', 'email', 'mobile', 'status', 'actions'];
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;

  animal: string;
  name: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private usersService: UsersService, public dialog: MatDialog, private toastrService: ToastrService, private router: Router) {

  }

  ngOnInit() {
    this.getUserData();

  }

  getUserData(): void {

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.usersService.getUsers(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.total_count;

          return data.users;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);

  }

  deleteUser(element):void{


    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){

        this.usersService.deleteUser(element)
        .subscribe((res) => {
          if (res.status == 'success') {
            this.toastrService.success(res.msg);
            this.router.navigate(['/users']);
          }
        }, function (err) {
          this.toastrService.error(err);
        })

      }
    });





    

  }



}

