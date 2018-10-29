import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ToastrModule } from 'ngx-toastr';
import {CalendarModule} from 'ap-angular2-fullcalendar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/main/layout.component';
import { UserComponent } from './users/users.component';
import { UserFormComponent } from './users/users.form.component';
import { UserViewComponent } from './users/users.view.component';
import { ConfirmComponent } from './layout/dialog/confirm.component';
import { ConfirmProductComponent } from './layout/dialog/confirm.product.component';
import { OrderCancelComponent } from './layout/dialog/order.cancel.component';
import { DeliveryConfirmComponent } from './layout/dialog/delivery.confirm.component';


import { OrdersService } from './orders/orders.service';
import { ReportsService } from './reports/reports.service';
import { HeaderService } from './layout/header/header.service';
import { UsersService } from './users/users.service';
// import { HttpErrorHandler }     from './share/http-error-handler.service';
import { MessageService }       from './share/message.service';
import { AuthGuard }       from './share/auth.guard';
import { AuthenticationService }       from './share/authentication.service';
import { AuthInterceptor }   from './share/auth.interceptor.service';
import { ScheduleService }   from './schedule/schedule.service';
import { SettingsService }   from './settings/settings.service';
import { PasswordService } from './password/password.service';
import { ProductsService } from './products/products.service';


import { AppRoutingModule } from './modules/routing/app-routing.module';
import { ProfileComponent } from './layout/profile/profile.component';
import { LoginComponent } from './login/login.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SettingsComponent } from './settings/settings.component';
import { PasswordComponent } from './password/password.component';
import { OrderComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ProductsFormComponent } from './products/products.form.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HeaderComponent,
    DashboardComponent,
    UserComponent,
    UserFormComponent,
    UserViewComponent,
    ConfirmComponent,
    ConfirmProductComponent,
    OrderCancelComponent,
    DeliveryConfirmComponent,
    LayoutComponent,
    ProfileComponent,
    LoginComponent,
    ScheduleComponent,
    SettingsComponent,
    PasswordComponent,
    OrderComponent,
    ProductsComponent,
    ProductsFormComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      progressBar: true,
      positionClass: 'toast-top-full-width',
      closeButton: true
  }),
  CalendarModule,
    Ng2GoogleChartsModule
  ],
  entryComponents: [
    ConfirmComponent,
    ConfirmProductComponent,
    OrderCancelComponent,
    DeliveryConfirmComponent
    ],
  providers: [
    AuthGuard,
    AuthenticationService,
    OrdersService,
    ReportsService,
    HeaderService,
    UsersService,
    // HttpErrorHandler,
    ScheduleService,
    SettingsService,
    MessageService,
    PasswordService,
    ProductsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
