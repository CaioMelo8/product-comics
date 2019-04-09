import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from './product';

const API_URL = environment.API_ENDPOINT;
const API_KEY = environment.API_KEY;
const PAGE_OFFSET = 20;

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  listAllComics() {
    return this.listComicsPaginated(0);
  }

  listComicsPaginated(page: number) {
    const comics = JSON.parse(window.localStorage.getItem('comics_page' + page));

    if (comics) {
      console.log('comics page ' + page + ' recovered from local storage');
      return of(comics);
    }

    const offset = PAGE_OFFSET * page;

    return this.http
      .get<Product[]>(API_URL + 'public/comics', {
        params: { apikey: API_KEY, offset: offset.toString() },
      })
      .pipe(map((response: any) => response.data.results))
      .pipe(
        tap(products => {
          window.localStorage.setItem('comics_page' + page, JSON.stringify(products));
          console.log('comics page ' + page + ' saved on local storage');
        }),
      )
      .pipe(
        catchError(err => {
          console.log(err);
          return of(null);
        }),
      );
  }

  listAllSeries() {
    return this.http
      .get<Product>(API_URL + 'public/series', { params: { apikey: API_KEY } })
      .pipe(map((response: any) => response.data.results))
      .pipe(
        catchError(err => {
          console.log(err);
          return of(null);
        }),
      );
  }

  listAllMovies() {
    return;
  }
}
