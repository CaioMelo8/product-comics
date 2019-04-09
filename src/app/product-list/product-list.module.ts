import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './product-list.component';
import { ProductModule } from './product/product.module';
import { ProductService } from './product.service';

@NgModule({
  declarations: [ProductListComponent],
  imports: [CommonModule, HttpClientModule, ProductModule],
  exports: [ProductListComponent],
  providers: [ProductService],
})
export class ProductListModule {}
