import { Injectable } from '@angular/core';
import { Comic } from 'src/app/comics/comic-list/comic/comic';

@Injectable()
export class ComicStorageService {
  fromLocalStorage(key: string): Comic[] {
    return JSON.parse(window.localStorage.getItem(key));
  }

  toLocalStorage(key: string, value: Comic[]): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  updateComic(key: string, comic: Comic): Boolean {
    const cached_comics = this.fromLocalStorage(key);
    const index = cached_comics.findIndex(cached_comic => comic.title === cached_comic.title);

    if (index !== -1) {
      cached_comics[index] = comic;
      this.toLocalStorage(key, cached_comics);
      return true;
    }

    return false;
  }
}
