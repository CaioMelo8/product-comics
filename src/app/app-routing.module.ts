import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FavoritesListResolver } from './products/favorites-list.resolver';
import { ProductListResolver } from './products/product-list.resolver';
import { ProductsComponent } from './products/products.component';
import { ProductsModule } from './products/products.module';

const appRoutes: Route[] = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    component: ProductsComponent,
    resolve: { comics_all: ProductListResolver, comics_favorite: FavoritesListResolver }
  }
];

@NgModule({
  imports: [ProductsModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
