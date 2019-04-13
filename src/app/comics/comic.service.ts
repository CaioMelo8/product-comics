import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ProductStorageService } from '../core/storage/product-storage.service';
import { Product } from '../product-list/product/product';

const API_URL = environment.API_ENDPOINT;
const DEFAULT_PAGE_OFFSET = 20;

const STORAGE_COMICS_ALL = 'comics_all';
const STORAGE_COMICS_PAGE = 'comics_page';
const STORAGE_COMICS_FAVORITES = 'comics_favorites';

@Injectable()
export class ComicService {
  constructor(private http: HttpClient, private storageService: ProductStorageService) {}

  private toProduct(object: Object) {
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
        params: { offset: offset.toString(), limit: limit.toString() },
      })
      .pipe(
        map((response: any) => {
          const comics = response.data.results;
          return comics.map(comic => this.toProduct(comic));
        }),
      );
  }

  listAll() {
    const cached_results = this.storageService.fromLocalStorage(STORAGE_COMICS_ALL);

    if (cached_results) {
      console.log('results for first 100 comics retrieved from local storage');
      return of(cached_results);
    }

    return this.listComics(0, 100).pipe(
      tap(results => {
        this.storageService.toLocalStorage(STORAGE_COMICS_ALL, results);
        console.log('results for first 100 comics saved on local storage');
      }),
    );
  }

  listPaginated(page: number) {
    const offset = page * DEFAULT_PAGE_OFFSET;
    const cached_results = this.storageService.fromLocalStorage(STORAGE_COMICS_PAGE + page);

    if (cached_results) {
      console.log('results for page ' + page + ' retrieved from local storage');
      return of(cached_results);
    }

    console.log('fetching results from server API');

    return this.listComics(offset).pipe(
      tap(results => {
        this.storageService.toLocalStorage(STORAGE_COMICS_PAGE + page, results);
        console.log('results for page ' + page + ' saved on local storage');
      }),
    );
  }

  addFavorite(product: Product): Product[] {
    // TODO
    return;
  }
}
