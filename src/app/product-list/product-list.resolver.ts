import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from './product';
import { Observable } from 'rxjs';

export class ProductListResolver implements Resolve<Product[]> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Product[]> | Promise<Product[]> | Product[] {
    return null;
  }
}
