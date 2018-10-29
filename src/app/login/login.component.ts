/* tslint:disable: member-ordering forin */
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../share/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'login-form',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmit: boolean;
  EMAIL_REGEX = '[a-z0-9!#$%&\'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*';
  hide: boolean;
  returnUrl: string;
  constructor(private router: Router, private http: HttpClient, private toastrService: ToastrService, private route: ActivatedRoute, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {

    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.hide = true;
    this.loginForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
        Validators.pattern(this.EMAIL_REGEX)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
    });
    }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(formvalue): boolean {
    this.isSubmit = true;
    if (this.loginForm.invalid) {
      return false;
    } else {
      this.authenticationService.login(this.loginForm.value)
      .subscribe((res) => {
        if (res.status == 'success') {
          this.toastrService.success('You have successfully login');
          this.router.navigate([this.returnUrl]);
        }
      }

      // , function (err) {
      //   this.toastrService.error(err);
      // }
    );
      return true;
    }
  }



}
