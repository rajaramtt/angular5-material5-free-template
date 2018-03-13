import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsForm } from '../products/products.form';
import { ProductsService } from '../products/products.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  templateUrl: './products.form.component.html',
})
export class ProductsFormComponent implements OnInit {
  products = new ProductsForm();
  productData:object;
  isSubmit: boolean;
  pageType:string;
  
  constructor(private router: Router, private productsService: ProductsService, private http: HttpClient, private toastrService: ToastrService, private route: ActivatedRoute) { }
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.pageType = 'Add';
    if (id) {
      this.pageType = 'Edit';
      this.productsService.getProduct(id).subscribe((res) => {
        if (!res.id) {
          this.router.navigate(['/products']);
        }
        this.products = res;
        this.productData = Object.assign({}, res)
      })
    }
  }
  onSubmit(myForm) {
    this.isSubmit = true;
    if (myForm.invalid) {
      return false;
    } else {
      if (this.products.id) {
        this.productsService.updateProduct(this.products)
          .subscribe((res) => {
            if (res.status == 'success') {
              this.toastrService.success(res.msg);
              this.router.navigate(['/products']);
            }
          }
        )

      } else {
        this.productsService.createProduct(this.products)
          .subscribe((res) => {
            if (res.status == 'success') {
              this.toastrService.success(res.msg);
              this.router.navigate(['/products']);
            }
          }
        
        )
      }
    }
  }

  onFormReset(myForm): void {
    if (this.products.id) {
      myForm.resetForm(this.productData);
    } else {
      myForm.resetForm({});
    }
  }


}


