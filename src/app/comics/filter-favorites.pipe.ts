import { Pipe, PipeTransform } from '@angular/core';
import { Comic } from './comic-list/comic/comic';

@Pipe({ name: 'filterFavorites' })
export class FilterFavorites implements PipeTransform {
  transform(products: Comic[]) {
    return products.filter(product => {
      return product.isFavorite;
    });
  }
}
