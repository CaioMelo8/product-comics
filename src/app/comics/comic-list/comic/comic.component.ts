import { Component, Input } from '@angular/core';
import { Category } from './category.enum';
import { Comic } from './comic';

@Component({
  selector: 'app-product',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css'],
})
export class ComicComponent {
  Category = Category;

  @Input() product: Comic;

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
