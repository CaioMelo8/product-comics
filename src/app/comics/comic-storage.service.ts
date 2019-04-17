import { Injectable } from '@angular/core';
import { Comic } from 'src/app/comics/comic-list/comic/comic';

@Injectable()
export class ComicStorageService {
  fromLocalStorage(key: string): Comic[] {
    return JSON.parse(window.localStorage.getItem(key));
  }

  toLocalStorage(key: string, value: any[]) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
