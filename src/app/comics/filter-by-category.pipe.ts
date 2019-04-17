import { Pipe, PipeTransform } from '@angular/core';
import { Category } from './comic-list/comic/category.enum';
import { Comic } from './comic-list/comic/comic';

@Pipe({ name: 'filterByCategory' })
export class FilterByCategory implements PipeTransform {
  transform(comics: Comic[], category: Category) {
    return comics.filter(comic => {
      return comic.category === category;
    });
  }
}
