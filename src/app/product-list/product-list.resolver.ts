import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from './product';
import { ProductService } from './product.service';

@Injectable()
export class ProductListResolver implements Resolve<Product[]> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]> | Promise<Product[]> | Product[] {
    const page = +route.queryParams['page'];

    if (page) {
      return this.productService.listComicsPaginated(page);
    } else {
      return this.productService.listAllComics();
    }
  }
}
