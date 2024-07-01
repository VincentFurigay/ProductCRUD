import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interface/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  productForm!: FormGroup;
  product: Product | undefined;

  ngOnInit(): void {
    this.initializeForm()
    this.fetchProductDetails()
  }

  private initializeForm() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required]],
      stock: [0, [Validators.required]]
    });
  }

  private fetchProductDetails() {
    const id = Number(this.route.snapshot.paramMap.get('productId'));
    this.productService.getProductById(id).subscribe(
      (data) => {
        this.product = data;
        this.productForm.patchValue({
          name: this.product.name,
          description: this.product.description,
          price: this.product.price,
          stock: this.product.stock
        })
      },
      (error) => {
        console.error('Error fetching product details:', error)
        this.toastr.error('Failed to load product details.', 'Error')
      }
    );

  }

  updateProduct() {
    if (this.productForm.invalid) {
      this.toastr.warning('Please fill in all required fields.', 'Warning');
      return
    }

    const updatedProduct: Product = {
      id: this.product!.id,
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      stock: this.productForm.value.stock
    }

    this.productService.updateProduct(this.product!.id, updatedProduct).subscribe((res) => {
      this.toastr.success('Product updated successfully', 'Success')
      this.router.navigateByUrl('/')
    },
      (error) => {
        this.toastr.error('Failed to update product!', 'Error');
        console.error('Error updating product:', error);
      })
  }


  goBack(): void {
    this.router.navigate(['/']);
  }



}
