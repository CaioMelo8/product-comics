import { Component, Input } from '@angular/core';
import { ComicService } from '../../comic.service';
import { Category } from './category.enum';
import { Comic } from './comic';

@Component({
  selector: 'app-product',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css'],
})
export class ComicComponent {
  Category = Category;

  @Input() comic: Comic;

  constructor(private comicService: ComicService) {}

  onFavorite() {
    this.comic.isFavorite = !this.comic.isFavorite;
  }

  onToPurchase(element: HTMLElement) {
    this.comic.category =
      this.comic.category === this.Category.TOPURCHASE
        ? this.Category.AVAILABLE
        : this.Category.TOPURCHASE;
  }

  onPurchased() {
    this.comic.category =
      this.comic.category === this.Category.PURCHASED
        ? this.Category.AVAILABLE
        : this.Category.PURCHASED;
  }
}
