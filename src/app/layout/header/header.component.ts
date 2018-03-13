import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HeaderService } from '.././header/header.service';
import { AuthenticationService } from '../../share/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-header-nav',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  notifications;
  userInfo: object;
  @Output() navToggle = new EventEmitter<boolean>();
  constructor(private headerService: HeaderService, private authenticationService: AuthenticationService, private router: Router) {
  }
  ngOnInit() {
    this.getNotifications();
    this.userInfo = this.authenticationService.getUserInfo();
  }
  navOpen() {
    this.navToggle.emit(true);
  }

  getNotifications(): void {
    this.headerService.getNotification().subscribe(
      data => {
        this.notifications = data;
      },
      err => console.error(err),
      () => {

      }
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    return false;
  }



}


