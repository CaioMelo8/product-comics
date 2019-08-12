import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ComicFormComponent } from './comic-form/comic-form.component';
import { Category } from './comic-list/comic/category.enum';
import { Comic } from './comic-list/comic/comic';
import { ComicEvent } from './service/comic.event';
import { ComicService } from './service/comic.service';

@Component({
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css'],
})
export class ComicsComponent {
  comics: Comic[] = [];
  favorites$: Observable<Comic[]>;
  onSale$: Observable<Comic[]>;

  searchQuery = '';
  isLoadingMore = false;

  Category = Category;

  constructor(private comicService: ComicService, private modalService: NgbModal) {
    this.loadCached();
    this.comicService.getEvents().subscribe((event: ComicEvent) => this.updateLists(event));
  }

  updateLists(event: ComicEvent) {
    if (event.type === 'add') {
      this.comics = event.comics.concat(this.comics);
    }

    this.favorites$ = this.comicService.listFavorites();
    this.onSale$ = this.comicService.listOnSale();
  }

  onAddComic() {
    this.modalService.open(ComicFormComponent, {
      backdrop: 'static',
      centered: true,
    });
  }

  loadCached() {
    this.comics = this.comicService.listCachedComics();

    if (this.comics.length === 0) {
      this.loadMore();
    }
  }

  loadMore() {
    this.isLoadingMore = true;

    this.comicService.listMore().subscribe((comics: Comic[]) => {
      this.comics.push(...comics);
      this.isLoadingMore = false;
    });
  }
}
