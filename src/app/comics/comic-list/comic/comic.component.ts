import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ComicService } from '../../service/comic.service';
import { Category } from './category.enum';
import { Comic } from './comic';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic-card.component.css', './comic-icons.component.css'],
})
export class ComicComponent implements OnInit {
  @Input() comic: Comic;

  updateDebounce = new Subject();

  Category = Category;

  constructor(private comicService: ComicService) {}

  ngOnInit() {
    this.updateDebounce.pipe(debounceTime(400)).subscribe(() => {
      this.comicService.update(this.comic);
    });
  }

  onFavorite() {
    this.comic.isFavorite = !this.comic.isFavorite;
    this.updateDebounce.next();
  }

  onSale() {
    this.comic.isOnSale = !this.comic.isOnSale;
    this.updateDebounce.next();
  }

  onCategorize(category: Category) {
    this.comic.category = this.comic.category === category ? Category.AVAILABLE : category;
    this.updateDebounce.next();
  }
}
