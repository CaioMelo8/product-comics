import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { ProductListComponent } from './product-list.component';
import { ProductListResolver } from './product-list.resolver';
import { ProductService } from './product.service';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [ProductComponent, ProductListComponent],
  imports: [CommonModule, HttpClientModule, CoreModule],
  exports: [ProductListComponent],
  providers: [ProductService, ProductListResolver]
})
export class ProductListModule {}
