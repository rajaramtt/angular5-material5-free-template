import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserComponent } from '../../users/users.component';
import { UserFormComponent } from '../../users/users.form.component';
import { UserViewComponent } from '../../users/users.view.component';
import { ProfileComponent } from '../../layout/profile/profile.component';
import { LoginComponent } from '../../login/login.component';
import { AuthGuard }       from '../../share/auth.guard';
import { ScheduleComponent } from '../../schedule/schedule.component';
import { SettingsComponent } from '../../settings/settings.component';
import { PasswordComponent } from '../../password/password.component';
import { OrderComponent } from '../../orders/orders.component';
import { ProductsComponent } from '../../products/products.component';
import { ProductsFormComponent } from '../../products/products.form.component';
import { ReportsComponent } from '../../reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'users', component: UserComponent , canActivate: [AuthGuard]},
  { path: 'users/new', component: UserFormComponent, canActivate: [AuthGuard]},
  { path: 'users/edit/:id', component: UserFormComponent, canActivate: [AuthGuard]},
  { path: 'users/view/:id', component: UserViewComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  { path: 'change-password', component: PasswordComponent, canActivate: [AuthGuard]},
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard]},
  { path: 'products/edit/:id', component: ProductsFormComponent, canActivate: [AuthGuard]},
  { path: 'products/new', component: ProductsFormComponent, canActivate: [AuthGuard]},
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuard]},
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {


}
