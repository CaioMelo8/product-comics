import { Injectable } from '@angular/core';
import { Product } from 'src/app/products/product';

@Injectable({ providedIn: 'root' })
export class ProductStorageService {
  fromLocalStorage(key: string): Product[] {
    return JSON.parse(window.localStorage.getItem(key));
  }

  toLocalStorage(key: string, value: any[]) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
