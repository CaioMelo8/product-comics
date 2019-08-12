import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ComicMapper } from 'src/app/shared/mappers/comic.mapper';
import { environment } from '../../../environments/environment';
import { Comic } from '../comic-list/comic/comic';
import { ComicStorageService } from './comic-storage.service';
import { ComicEvent } from './comic.event';

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

  constructor(private http: HttpClient, private comicStorageService: ComicStorageService) {}

  private fetchComics(offset: number = 0, limit: number = DEFAULT_COMICS_PER_PAGE) {
    return this.http
      .get(API_URL + 'public/comics', {
        params: { offset: (offset + DEFAULT_OFFSET).toString(), limit: limit.toString() },
      })
      .pipe(
        map((response: any) => {
          return response.data.results.map((comic: any) => ComicMapper.map(comic));
        })
      );
  }

  private cacheFetchedComics(comics: Comic[], page: number) {
    const cached_comics = this.listCachedComics();
    cached_comics.push(...comics);

    page++;

    window.localStorage.setItem(STORAGE_KEY_NEXT_PAGE, page.toString());
    this.comicStorageService.toLocalStorage(STORAGE_KEY_COMICS, cached_comics);
  }

  private listByKey(key: string, page?: number) {
    let cached_comics = this.listCachedComics();
    let favoriteCount = 0;

    if (page) {
      const offset = page * DEFAULT_FAVORITES_PER_PAGE;
      cached_comics = cached_comics.slice(offset, offset + DEFAULT_FAVORITES_PER_PAGE);
    }

    return of(
      cached_comics.filter(comic => comic[key] && favoriteCount++ < DEFAULT_FAVORITES_PER_PAGE)
    );
  }

  listCachedComics() {
    let cached_comics = this.comicStorageService.fromLocalStorage(STORAGE_KEY_COMICS);

    if (!cached_comics) {
      cached_comics = [];
    }

    return cached_comics;
  }

  listMore(): Observable<Comic[]> {
    const next_page = +window.localStorage.getItem(STORAGE_KEY_NEXT_PAGE);
    const offset = next_page * DEFAULT_COMICS_PER_PAGE;

    return this.fetchComics(offset).pipe(
      tap((results: Comic[]) => {
        this.cacheFetchedComics(results, next_page);
        console.log(results);
        console.log('page ' + next_page + ' saved on local storage');
      })
    );
  }

  listLatest(): Observable<Comic[]> {
    const cached_comics = this.comicStorageService.fromLocalStorage(STORAGE_KEY_COMICS);

    if (cached_comics) {
      return of(cached_comics.slice(0, DEFAULT_LATEST_COUNT));
    }
  }

  listFavorites(page?: number): Observable<Comic[]> {
    return this.listByKey('isFavorite', page);
  }

  listOnSale(page?: number): Observable<Comic[]> {
    return this.listByKey('isOnSale', page);
  }

  getEvents(): Observable<ComicEvent> {
    return this.updateSubject.asObservable();
  }

  add(...comics: Comic[]): void {
    if (!comics) {
      return;
    }

    const cached_comics = this.comicStorageService.fromLocalStorage(STORAGE_KEY_COMICS);

    if (cached_comics) {
      comics.push(...cached_comics);
    }

    this.comicStorageService.toLocalStorage(STORAGE_KEY_COMICS, comics);
    this.updateSubject.next(new ComicEvent('add', comics));
  }

  update(...comics: Comic[]): void {
    if (!comics) {
      return;
    }

    const updatedComics = [];

    comics.forEach(comic => {
      if (this.comicStorageService.updateComic(STORAGE_KEY_COMICS, comic)) {
        updatedComics.push(comic);
      }
    });

    this.updateSubject.next(new ComicEvent('update', comics));
  }
}
