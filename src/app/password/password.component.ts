import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PasswordService } from './password.service';
import { PasswordValidation  } from './confirm';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  passwordForm: FormGroup;
  isSubmit: boolean;
  constructor(private router: Router, private passwordService: PasswordService, private toastrService: ToastrService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.passwordForm = new FormGroup({
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
      'confirm_password': new FormControl('', [
         Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
    }, this.pwdMatchValidator);

  }
 pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('confirm_password').value
       ? null : {'mismatch': true};
 }

  get password() { return this.passwordForm.get('password'); }
  get confirm_password() { return this.passwordForm.get('confirm_password'); }

  onSubmit(formvalue): boolean {

    this.isSubmit = true;
    if (this.passwordForm.invalid) {
      return false;
    } else {
      this.passwordService.updatePassword(this.passwordForm.value)
      .subscribe((res) => {
        if (res.status == 'success') {
          this.toastrService.success(res.msg);
          this.router.navigate(['/change-password']);
        }
      });
      return true;
    }

  }

}
