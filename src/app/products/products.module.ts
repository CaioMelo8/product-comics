import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { FavoritesListResolver } from './favorites-list.resolver';
import { ProductListResolver } from './product-list.resolver';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product-list/product/product.component';
import { ProductService } from './product.service';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductsComponent],
  imports: [CommonModule, CoreModule, HttpClientModule],
  exports: [],
  providers: [ProductService, ProductListResolver, FavoritesListResolver]
})
export class ProductsModule {}
