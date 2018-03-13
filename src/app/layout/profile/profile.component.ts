/* tslint:disable: member-ordering forin */
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from '../../users/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-hero-form-reactive',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  isSubmit: boolean;
  profileData:object;
  EMAIL_REGEX = "[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*";
  id = JSON.parse(localStorage.getItem('currentUser')).id;
  constructor(private router: Router, private usersService: UsersService, private http: HttpClient, private toastrService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      'gender': new FormControl('', [
        Validators.required,
      ]),
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
        Validators.pattern(this.EMAIL_REGEX)
      ]),
      'mobile': new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12),
      ]),
      'dob': new FormControl('', [
        Validators.required,
      ])
    });

    if (this.id) {
      this.usersService.getUser(this.id).subscribe((res) => {
        res.dob = new Date(res.dob);
        this.profileData = Object.assign({}, res)
        this.profileForm.patchValue({
          name:res.name,
          gender:res.gender,
          email:res.email,
          mobile:res.mobile,
          dob:res.dob
        });
      })
    }


  }

  get name() { return this.profileForm.get('name'); }
  get email() { return this.profileForm.get('email'); }
  get mobile() { return this.profileForm.get('mobile'); }
  get dob() { return this.profileForm.get('dob'); }
  get gender() { return this.profileForm.get('gender'); }

  onSubmit(formvalue):boolean {
    this.isSubmit = true;
    if (this.profileForm.invalid) {
      return false;
    } else {
      this.usersService.updateProfile(this.profileForm.value)
      .subscribe((res) => {
        if (res.status == 'success') {
          this.toastrService.success(res.msg);
          this.router.navigate(['/profile']);
        }
      }
      // , function (err) {
      //   this.toastrService.error(err);
      // }
    )
      return true;
    }

  }



}