import { Pipe, PipeTransform } from '@angular/core';
import { Category } from './comic-list/comic/category.enum';
import { Comic } from './comic-list/comic/comic';

@Pipe({ name: 'filterByCategory' })
export class FilterByCategory implements PipeTransform {
  transform(products: Comic[], category: Category) {
    return products.filter(product => {
      return product.category === category;
    });
  }
}
