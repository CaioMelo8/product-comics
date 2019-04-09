import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: Product[];

  page = 2;

  constructor(private productService: ProductService) {}

  ngOnInit() {}

  fetch() {
    this.productService.listComicsPaginated(this.page).subscribe(
      products => {
        this.products = products;
      },
      err => console.log(err.message),
    );
  }
}
