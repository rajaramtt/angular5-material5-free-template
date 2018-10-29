import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { usersForm } from './users.form';
import { UsersService } from './users.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import { ToastrService } from 'ngx-toastr';
import { debug } from 'util';

@Component({
  selector: 'app-user-form',
  templateUrl: './users.form.component.html',
})
export class UserFormComponent implements OnInit {

  users = new usersForm();
  userData: object;
  isSubmit: boolean;
  hide = true;
  constructor(private router: Router, private usersService: UsersService, private http: HttpClient, private toastrService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      this.usersService.getUser(id).subscribe((res) => {
        if (!res.id) {
          this.router.navigate(['/users']);
        }
        res.dob = new Date(res.dob);
        this.users = res;
        this.userData = Object.assign({}, res);
      });
    }
  }
  onSubmit(myForm) {
    this.isSubmit = true;
    if (myForm.invalid) {
      return false;
    } else {
      if (this.users.id) {
        this.usersService.updateUser(this.users)
          .subscribe((res) => {
            if (res.status == 'success') {
              this.toastrService.success(res.msg);
              this.router.navigate(['/users']);
            }
          }
          // , function (err) {
          //   this.toastrService.error(err);
          // }
        );

      } else {
        this.usersService.createUser(this.users)
          .subscribe((res) => {
            if (res.status == 'success') {
              this.toastrService.success(res.msg);
              this.router.navigate(['/users']);
            }
          }
          // , function (err) {
          //   this.toastrService.error(err);
          // }

        );
      }
    }
  }

  onFormReset(myForm): void {
    if (this.users.id) {
      console.log(this.userData);
      myForm.resetForm(this.userData);
    } else {
      myForm.resetForm({});
    }
  }


}


