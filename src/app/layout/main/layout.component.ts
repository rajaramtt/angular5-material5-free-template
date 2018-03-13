
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, } from '@angular/core';
import { AuthenticationService } from '../../share/authentication.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})

export class LayoutComponent {
  mobileQuery: MediaQueryList;
  userInfo:object;
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,  private authenticationService: AuthenticationService,) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  ngOnInit() {
    this.userInfo = this.authenticationService.getUserInfo();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  

  
}
