import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interface/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  product: Product | undefined

  ngOnInit(): void {
    this.fetchProductDetails()

  }

  private fetchProductDetails() {
    const id = Number(this.route.snapshot.paramMap.get('productId'))
    if (isNaN(id)) {
      this.toastr.error('Invalid Product ID', 'Error')
      this.router.navigate(['/'])
      return
    }
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data
    },
      (error) => {
        console.error('Error fetching product details:', error);
        this.toastr.error('Failed to load product details.', 'Error');
        this.router.navigate(['/']);
      })
  }

  goBack(): void {
    this.router.navigate(['/']);
  }



}
