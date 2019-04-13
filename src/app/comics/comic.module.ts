import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComicComponent } from './comic.component';
import { ComicService } from './comic.service';
import { ComicListResolver } from './comic-list.resolver';
import { ProductListModule } from '../product-list/product-list.module';
import { FilterByCategory } from './filter-by-category.pipe';
import { FilterFavorites } from './filter-favorites.pipe';

@NgModule({
  declarations: [ComicComponent, FilterByCategory, FilterFavorites],
  imports: [CommonModule, ProductListModule],
  exports: [],
  providers: [ComicService, ComicListResolver],
})
export class ComicModule {}
