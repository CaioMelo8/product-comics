import { PipeTransform, Pipe } from '@angular/core';
import { Product } from '../product-list/product/product';
import { Category } from '../product-list/product/category.enum';

@Pipe({ name: 'filterByCategory' })
export class FilterByCategory implements PipeTransform {
  transform(products: Product[], category: Category) {
    return products.filter(product => {
      return product.category === category;
    });
  }
}
