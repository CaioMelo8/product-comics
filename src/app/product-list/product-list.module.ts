import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductService } from './product.service';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [ProductComponent, ProductListComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [ProductListComponent],
  providers: [ProductService],
})
export class ProductListModule {}
