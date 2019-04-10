import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  productGroups = [];

  page = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {}

  fetch() {
    this.productService.listComicsPaginated(this.page).subscribe(
      products => {
        this.productGroups = this.groupProducts(products);
      },
      err => console.log(err.message),
    );
  }

  groupProducts(products: Product[]) {
    const groupLimit = 4;
    const groups = [];

    for (let i = 0; i < products.length; i += groupLimit) {
      groups.push(products.splice(i, groupLimit));
    }

    return groups;
  }
}
