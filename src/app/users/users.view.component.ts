import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { usersForm } from './users.form';
import { UsersService } from './users.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import { ToastrService } from 'ngx-toastr';
import { debug } from 'util';

@Component({
  selector: 'app-user-view',
  templateUrl: './users.view.component.html',
})
export class UserViewComponent implements OnInit {

  users = new usersForm();

  constructor(private router: Router, private usersService: UsersService, private http: HttpClient, private toastrService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      this.usersService.getUser(id).subscribe((res) => {
        if (!res.id) {
          this.router.navigate(['/users']);
        }
        res.dob = new Date(res.dob);
        this.users = res;
      })
    }
  }
}


