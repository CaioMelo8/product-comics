import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComicComponent } from './comic.component';
import { ComicService } from './comic.service';
import { ProductListModule } from '../product-list/product-list.module';
import { FilterByCategory } from './filter-by-category.pipe';
import { FilterFavorites } from './filter-favorites.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ComicComponent, FilterByCategory, FilterFavorites],
  imports: [CommonModule, RouterModule, ProductListModule],
  exports: [],
  providers: [ComicService],
})
export class ComicModule {}
