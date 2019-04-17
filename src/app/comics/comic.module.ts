import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { ComicFormComponent } from './comic-form/comic-form.component';
import { ComicListModule } from './comic-list/comic-list.module';
import { ComicStorageService } from './comic-storage.service';
import { ComicComponent } from './comic.component';
import { ComicService } from './comic.service';
import { FilterByCategory } from './filter-by-category.pipe';
import { FilterFavorites } from './filter-favorites.pipe';

@NgModule({
  declarations: [ComicComponent, ComicFormComponent, FilterByCategory, FilterFavorites],
  entryComponents: [ComicFormComponent],
  imports: [
    ComicListModule,
    CommonModule,
    NgbModalModule,
    ReactiveFormsModule,
    RouterModule,
    VMessageModule,
  ],
  exports: [],
  providers: [ComicService, ComicStorageService],
})
export class ComicModule {}
