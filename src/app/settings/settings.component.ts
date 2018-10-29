
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

@Component({
  selector: 'settings-service',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;
  isSubmit: boolean;
  settingsData: object;
  EMAIL_REGEX = '[a-z0-9!#$%&\'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*';
  id = JSON.parse(localStorage.getItem('currentUser')).id;
  constructor(private router: Router, private settingsService: SettingsService, private http: HttpClient, private toastrService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      'notification_email': new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
        Validators.pattern(this.EMAIL_REGEX)
      ]),
      'phone_no': new FormControl('', [
         Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12),
      ]),
    });

    if (this.id) {
      this.settingsService.getSettings(this.id).subscribe((res) => {
        this.settingsData = Object.assign({}, res);
        this.settingsForm.patchValue({
          notification_email: res.notification_email,
          phone_no: res.phone_no,
        });
      });
    }
  }
  get notification_email() { return this.settingsForm.get('notification_email'); }
  get phone_no() { return this.settingsForm.get('phone_no'); }

  onSubmit(formvalue): boolean {
    this.isSubmit = true;
    if (this.settingsForm.invalid) {
      return false;
    } else {
      this.settingsService.updateSettings(this.settingsForm.value)
      .subscribe((res) => {
        if (res.status == 'success') {
          this.toastrService.success(res.msg);
          this.router.navigate(['/settings']);
        }
      });
      return true;
    }

  }
}
