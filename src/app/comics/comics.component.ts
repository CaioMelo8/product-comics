import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ComicFormComponent } from './comic-form/comic-form.component';
import { Category } from './comic-list/comic/category.enum';
import { Comic } from './comic-list/comic/comic';
import { ComicService } from './comic.service';

@Component({
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css'],
})
export class ComicsComponent {
  comics: Comic[] = [];
  favorites$: Observable<Comic[]>;
  onSale$: Observable<Comic[]>;

  searchQuery = '';
  currentPage = 0;
  isLoadingMore = true;

  Category = Category;

  constructor(private comicService: ComicService, private modalService: NgbModal) {
    this.loadMore();
    this.comicService
      .getUpdates()
      .subscribe((update: { type: string; comic: Comic[] }) => this.updateLists(update));
  }

  updateLists(update: { type: string; comic: Comic[] }) {
    if (!update) {
      this.loadMore();
    } else if (update.type === 'add') {
      this.comics = update.comic.concat(this.comics);
    }

    this.favorites$ = this.comicService.listFavorites(this.currentPage);
    this.onSale$ = this.comicService.listOnSale(this.currentPage);
  }

  onAddComic() {
    this.modalService.open(ComicFormComponent, {
      backdrop: 'static',
      centered: true,
    });
  }

  loadMore() {
    this.isLoadingMore = true;

    this.comicService.listPage(this.currentPage++).subscribe((comics: Comic[]) => {
      this.comics.push(...comics);
      this.isLoadingMore = false;
    });
  }
}
