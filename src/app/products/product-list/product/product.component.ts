import { Component, Input, Renderer2 } from '@angular/core';
import { Product } from '../../product';
import { ProductCategoryEnum } from '../../product-category.enum';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  Category = ProductCategoryEnum;

  @Input() product: Product;

  constructor(private renderer: Renderer2) {}

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
