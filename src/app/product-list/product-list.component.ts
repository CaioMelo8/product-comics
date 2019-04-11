import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from './product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productGroups = [];
  products = [];
  page = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.products = data['products'];
      this.productGroups = this.groupProducts(this.products);
    });
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
