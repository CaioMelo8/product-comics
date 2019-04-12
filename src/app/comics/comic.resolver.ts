import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../product-list/product/product';
import { ComicService } from './comic.service';

@Injectable()
export class ComicListResolver implements Resolve<Product[]> {
  constructor(private productService: ComicService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Product[]> | Promise<Product[]> | Product[] {
    const page = +route.queryParams['page'];

    if (page) {
      return this.productService.listPaginated(page);
    } else {
      return this.productService.listAll();
    }
  }
}
