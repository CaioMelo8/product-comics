import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductModule } from './product/product.module';

@NgModule({
  declarations: [ProductListComponent],
  imports: [CommonModule, ProductModule],
  exports: [ProductListComponent],
})
export class ProductListModule {}
