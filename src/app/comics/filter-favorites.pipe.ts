import { PipeTransform, Pipe } from '@angular/core';
import { Product } from '../product-list/product/product';

@Pipe({ name: 'filterFavorites' })
export class FilterFavorites implements PipeTransform {
  transform(products: Product[]) {
    return products.filter(product => {
      return product.isFavorite;
    });
  }
}
