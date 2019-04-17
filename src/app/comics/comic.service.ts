import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Comic } from './comic-list/comic/comic';
import { ComicStorageService } from './comic-storage.service';

const API_URL = environment.API_ENDPOINT;
const DEFAULT_COMICS_PER_PAGE = 24;
const DEFAULT_FAVORITES_PER_PAGE = 12;

const STORAGE_KEY_COMICS = 'comics';
const STORAGE_KEY_LAST_PAGE = 'last_page';

@Injectable()
export class ComicService {
  updateSubject = new Subject();

  constructor(private http: HttpClient, private storageService: ComicStorageService) {}

  toComic(object: Object) {
    const comic = new Comic();
    const keys = Object.keys(comic);

    keys.forEach(key => {
      if (key in object) {
        comic[key] = object[key];
      }
    });

    return comic;
  }

  private fetchComics(offset: number = 0, limit: number = DEFAULT_COMICS_PER_PAGE) {
    return this.http
      .get<Comic[]>(API_URL + 'public/comics', {
        params: { offset: offset.toString(), limit: limit.toString() },
      })
      .pipe(
        map((response: any) => {
          const comics = response.data.results;
          return comics.map(comic => this.toComic(comic));
        })
      );
  }

  private cacheFetchedComics(comics: Comic[]) {
    const cached_comics = this.storageService.fromLocalStorage(STORAGE_KEY_COMICS);

    if (cached_comics) {
      cached_comics.push(...comics);
      this.storageService.toLocalStorage(STORAGE_KEY_COMICS, cached_comics);
    } else {
      this.storageService.toLocalStorage(STORAGE_KEY_COMICS, comics);
    }
  }

  getUpdates() {
    return this.updateSubject.asObservable();
  }

  listAll(page: number) {
    const offset = (page - 1) * DEFAULT_COMICS_PER_PAGE;
    const cached_results = this.storageService.fromLocalStorage(STORAGE_KEY_COMICS);

    if (cached_results && cached_results.length > offset) {
      console.log('results for page ' + page + ' retrieved from local storage');
      return of(cached_results.slice(offset, offset + DEFAULT_COMICS_PER_PAGE));
    }

    console.log('fetching data from API');

    let lastFetchedPage = +window.localStorage.getItem(STORAGE_KEY_LAST_PAGE);

    return this.fetchComics(lastFetchedPage)
      .pipe(
        tap(results => {
          this.cacheFetchedComics(results);
          console.log(
            'results for application page ' + lastFetchedPage + ' saved on local storage'
          );
        })
      )
      .pipe(
        finalize(() => {
          lastFetchedPage++;
          window.localStorage.setItem(STORAGE_KEY_LAST_PAGE, lastFetchedPage.toString());
        })
      );
  }

  private listByKey(page: number, key: string) {
    const cached_comics = this.storageService.fromLocalStorage(STORAGE_KEY_COMICS);
    const offset = (page - 1) * DEFAULT_FAVORITES_PER_PAGE;

    let favoriteCount = 0;

    return of(
      cached_comics
        .splice(offset)
        .filter(comic => comic[key] && favoriteCount++ < DEFAULT_FAVORITES_PER_PAGE)
    );
  }

  listFavorites(page: number) {
    return this.listByKey(page, 'isFavorite');
  }

  listOnSale(page: number) {
    return this.listByKey(page, 'isOnSale');
  }

  addComic(...comics: Comic[]) {
    if (!comics) {
      return;
    }

    const cached_comics = this.storageService.fromLocalStorage(STORAGE_KEY_COMICS);

    if (cached_comics) {
      comics.push(...cached_comics);
    }

    this.storageService.toLocalStorage(STORAGE_KEY_COMICS, comics);
  }

  updateComic(comic: Comic) {
    if (!comic) {
      return;
    }

    if (this.storageService.updateComic(STORAGE_KEY_COMICS, comic)) {
      this.updateSubject.next();
    }
  }
}
