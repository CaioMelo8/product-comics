import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComicComponent } from './comic.component';
import { ComicService } from './comic.service';
import { ProductListModule } from '../product-list/product-list.module';
import { FilterByCategory } from './filter-by-category.pipe';
import { FilterFavorites } from './filter-favorites.pipe';
import { RouterModule } from '@angular/router';
import { ComicFormComponent } from './comic-form/comic-form.component';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { VerticalModalModule } from '../shared/components/vertical-modal/vertical-modal.module';

@NgModule({
  declarations: [ComicComponent, ComicFormComponent, FilterByCategory, FilterFavorites],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ProductListModule,
    VerticalModalModule,
    VMessageModule,
  ],
  exports: [],
  providers: [ComicService],
})
export class ComicModule {}