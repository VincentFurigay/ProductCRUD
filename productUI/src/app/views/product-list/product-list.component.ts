import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interface/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService, private toastr: ToastrService) { }

  product$: Observable<Product[]> | undefined

  ngOnInit(): void {
    this.product$ = this.productService.getAllProducts()
  }


  deleteProduct(id: number) {
    if (confirm('Are you sure to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.toastr.success('Product Deleted Successfully', 'Success')
        this.product$ = this.productService.getAllProducts()
      },
        (error) => {
          this.toastr.error('Failed to delete product!', 'Error');
          console.error('Error deleting product:', error);
        })
    }
  }



}
