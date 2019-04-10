import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from './product';

const API_URL = environment.API_ENDPOINT;
const API_KEY = environment.API_KEY;
const DEFAULT_PAGE_OFFSET = 20;

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  private toProduct(object: any) {
    const product = new Product();
    const keys = Object.keys(product);

    keys.forEach(key => {
      if (key in object) {
        product[key] = object[key];
      }
    });

    return product;
  }

  private listComics(offset: number = 0, limit: number = 20) {
    return this.http
      .get<Product[]>(API_URL + 'public/comics', {
        params: { apikey: API_KEY, offset: offset.toString(), limit: limit.toString() }
      })
      .pipe(
        map((response: any) => {
          const comics = response.data.results;
          return comics.map(comic => this.toProduct(comic));
        })
      );
  }

  listAllComics() {
    const storage_key = 'comics_all';
    const cached_results = this.fromLocalStorage(storage_key);

    if (cached_results) {
      this.toProduct(cached_results);
      console.log('results for first 100 comics saved on local storage');
      return of(cached_results);
    }

    return this.listComics(0, 100).pipe(
      tap(results => {
        this.toLocalStorage(storage_key, results);
        console.log('results for first 100 comics saved on local storage');
      })
    );
  }

  listComicsPaginated(page: number) {
    const offset = page * DEFAULT_PAGE_OFFSET;
    const storage_key = 'comics_page' + page;
    const cached_results = this.fromLocalStorage(storage_key);

    if (cached_results) {
      this.toProduct(cached_results[0]);
      console.log('results for page ' + page + ' retrieved from local storage');
      return of(cached_results);
    }

    console.log('fetching results from server API');
    return this.listComics(offset).pipe(
      tap(results => {
        this.toLocalStorage(storage_key, results);
        console.log('results for page ' + page + ' saved on local storage');
      })
    );
  }

  fromLocalStorage(key: string) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  toLocalStorage(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
