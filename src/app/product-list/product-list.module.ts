import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { ProductListComponent } from './product-list.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [ProductComponent, ProductListComponent],
  imports: [CommonModule, CoreModule, HttpClientModule],
  exports: [ProductListComponent],
  providers: [],
})
export class ProductListModule {}
