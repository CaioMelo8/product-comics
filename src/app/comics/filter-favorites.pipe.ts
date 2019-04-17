import { Pipe, PipeTransform } from '@angular/core';
import { Comic } from './comic-list/comic/comic';

@Pipe({ name: 'filterFavorites' })
export class FilterFavorites implements PipeTransform {
  transform(comics: Comic[]) {
    return comics.filter(comic => {
      return comic.isFavorite;
    });
  }
}
