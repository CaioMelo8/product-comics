import { Component } from '@angular/core';
import { Product } from './product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  products: Product[] = [
    { title: 'test', description: 'just a test' },
    { title: 'test', description: 'just a test' },
    { title: 'test', description: 'just a test' },
    { title: 'test', description: 'just a test' },
    { title: 'test', description: 'just a test' },
  ];
}
