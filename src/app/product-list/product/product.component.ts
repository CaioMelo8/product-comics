import { Component, Input, Renderer2, Output, EventEmitter } from '@angular/core';
import { Product } from './product';
import { Category } from './category.enum';
import { ComicService } from '../../comics/comic.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  Category = Category;

  @Input() product: Product;

  constructor() {}

  onFavorite() {
    this.product.isFavorite = !this.product.isFavorite;
  }

  onToPurchase(element: HTMLElement) {
    this.product.category =
      this.product.category === this.Category.TOPURCHASE
        ? this.Category.AVAILABLE
        : this.Category.TOPURCHASE;
  }

  onPurchased() {
    this.product.category =
      this.product.category === this.Category.PURCHASED
        ? this.Category.AVAILABLE
        : this.Category.PURCHASED;
  }
}
