import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ComicService } from '../../comic.service';
import { Category } from './category.enum';
import { Comic } from './comic';

@Component({
  selector: 'app-product',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css'],
})
export class ComicComponent implements OnInit {
  @Input() comic: Comic;

  updateDebounce = new Subject();

  Category = Category;

  constructor(private comicService: ComicService) {}

  ngOnInit() {
    this.updateDebounce.pipe(debounceTime(400)).subscribe(() => {
      this.comicService.updateComic(this.comic);
    });
  }

  onFavorite() {
    this.comic.isFavorite = !this.comic.isFavorite;
    this.updateDebounce.next();
  }

  onToPurchase() {
    this.comic.category =
      this.comic.category === Category.TOPURCHASE ? Category.AVAILABLE : Category.TOPURCHASE;

    this.updateDebounce.next();
  }

  onPurchased() {
    this.comic.category =
      this.comic.category === Category.PURCHASED ? Category.AVAILABLE : Category.PURCHASED;

    this.updateDebounce.next();
  }
}
