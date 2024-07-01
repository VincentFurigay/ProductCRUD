import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interface/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  constructor(private productService: ProductService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) { }

  productForm!: FormGroup

  private product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  private initializeForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      stock: [0, Validators.required]
    })
  }

  submitProduct() {
    if (this.productForm.invalid) {
      return
    }
    this.product.name = this.productForm.value.name
    this.product.description = this.productForm.value.description
    this.product.price = this.productForm.value.price
    this.product.stock = this.productForm.value.stock
    this.productService.addProduct(this.product).subscribe(
      (res) => {
        this.toastr.success('Product added Successfully', 'Success');
        this.productForm.reset();
        console.log(res);
        this.router.navigateByUrl('/')

      },
      (error) => {
        this.toastr.error('Failed to add product!', 'Error');
        console.error('Error adding product:', error);
      }
    )
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}
