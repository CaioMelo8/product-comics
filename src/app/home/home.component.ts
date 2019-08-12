import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../comics/comic-list/comic/comic';
import { ComicService } from '../comics/comic.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  favorites$: Observable<Comic[]>;
  onSale$: Observable<Comic[]>;
  latest$: Observable<Comic[]>;

  constructor(private comicService: ComicService) {
    this.updateLists();
    this.comicService.getUpdates().subscribe(() => this.updateLists());
  }

  updateLists() {
    this.favorites$ = this.comicService.listFavorites();
    this.onSale$ = this.comicService.listOnSale();
    this.latest$ = this.comicService.listLatest();
  }
}
