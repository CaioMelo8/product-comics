import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ComicMapper } from '../../shared/mappers/comic.mapper';
import { Comic } from '../comic-list/comic/comic';
import { ComicEvent } from './comic.event';
import { ComicStorageService } from './comic-storage.service';

const API_URL = environment.API_ENDPOINT;
const DEFAULT_OFFSET = 150;
const DEFAULT_COMICS_PER_PAGE = 30;
const DEFAULT_FAVORITES_PER_PAGE = 10;
const DEFAULT_LATEST_COUNT = 10;

const STORAGE_KEY_COMICS = 'comics';
const STORAGE_KEY_NEXT_PAGE = 'next_page';

@Injectable({ providedIn: 'root' })
export class ComicService {
  updateSubject = new Subject<ComicEvent>();
  cached_comics: Comic[];
  nextPage: number;

  init$: Observable<Comic[]>;

  constructor(private http: HttpClient, private storageService: ComicStorageService) {
    this.init$ = this.init();
  }

  init(): Observable<Comic[]> {
    this.cached_comics = this.storageService.fromLocalStorage(STORAGE_KEY_COMICS);
    this.nextPage = +window.localStorage.getItem(STORAGE_KEY_NEXT_PAGE);

    if (!this.cached_comics) {
      return this.listPage(0);
    }

    return of(this.cached_comics);
  }

  private fetchComics(offset: number = 0, limit: number = DEFAULT_COMICS_PER_PAGE) {
    return this.http
      .get<Comic[]>(API_URL + 'public/comics', {
        params: { offset: (offset + DEFAULT_OFFSET).toString(), limit: limit.toString() },
      })
      .pipe(
        map((response: any) => {
          const comics = response.data.results;
          return comics.map((comic: Comic[]) => ComicMapper.map(comic));
        })
      );
  }

  private cacheFetchedComics(comics: Comic[], page: number) {
    const cached_comics = this.storageService.fromLocalStorage(STORAGE_KEY_COMICS);

    page++;
    window.localStorage.setItem(STORAGE_KEY_NEXT_PAGE, page.toString());

    if (cached_comics) {
      cached_comics.push(...comics);
      this.storageService.toLocalStorage(STORAGE_KEY_COMICS, cached_comics);
      return cached_comics;
    } else {
      this.storageService.toLocalStorage(STORAGE_KEY_COMICS, comics);
      return comics;
    }
  }

  private listByKey(key: string, page?: number) {
    let cached_comics = this.storageService.fromLocalStorage(STORAGE_KEY_COMICS);

    if (cached_comics) {
      let favoriteCount = 0;

      if (page) {
        const offset = page * DEFAULT_FAVORITES_PER_PAGE;
        cached_comics = cached_comics.slice(offset, offset + DEFAULT_FAVORITES_PER_PAGE);
      }

      return of(
        cached_comics.filter(comic => comic[key] && favoriteCount++ < DEFAULT_FAVORITES_PER_PAGE)
      );
    }

    return of([]);
  }

  listPage(page: number): Observable<Comic[]> {
    const offset = page * DEFAULT_COMICS_PER_PAGE;
    const next_page = +window.localStorage.getItem(STORAGE_KEY_NEXT_PAGE);

    let cached_comics = this.storageService.fromLocalStorage(STORAGE_KEY_COMICS);

    if (!cached_comics) {
      cached_comics = [];
    }

    if (page < next_page) {
      console.log('page ' + page + ' retrieved from local storage');
      return of(cached_comics.slice(offset, offset + DEFAULT_COMICS_PER_PAGE));
    } else if (page === next_page) {
      return this.fetchComics(offset)
        .pipe(
          tap((results: Comic[]) => {
            this.cacheFetchedComics(results, page);
            console.log('page ' + page + ' saved on local storage');
          })
        )
        .pipe(switchMap(() => this.listPage(page)));
    } else {
      return this.listPage(page - 1).pipe(switchMap(() => this.listPage(page)));
    }
  }

  listLatest(): Observable<Comic[]> {
    const cached_comics = this.storageService.fromLocalStorage(STORAGE_KEY_COMICS);

    if (cached_comics) {
      return of(cached_comics.slice(0, DEFAULT_LATEST_COUNT));
    }

    return this.init$.pipe(map((comics: Comic[]) => comics.slice(0, DEFAULT_LATEST_COUNT)));
  }

  listFavorites(page?: number) {
    return this.listByKey('isFavorite', page);
  }

  listOnSale(page?: number) {
    return this.listByKey('isOnSale', page);
  }

  add(...comics: Comic[]) {
    if (!comics) {
      return;
    }

    const cached_comics = this.storageService.fromLocalStorage(STORAGE_KEY_COMICS);

    if (cached_comics) {
      comics.push(...cached_comics);
    }

    this.storageService.toLocalStorage(STORAGE_KEY_COMICS, comics);
    this.updateSubject.next(new ComicEvent('add', comics));
  }

  update(...comics: Comic[]) {
    if (!comics) {
      return;
    }

    const updatedComics = [];

    comics.forEach(comic => {
      if (this.storageService.updateComic(STORAGE_KEY_COMICS, comic)) {
        updatedComics.push(comic);
      }
    });

    this.updateSubject.next(new ComicEvent('update', comics));
  }

  getUpdates() {
    return this.updateSubject.asObservable();
  }
}
