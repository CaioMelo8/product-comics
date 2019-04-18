import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchModule } from '../shared/components/search/search.module';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { ComicFormComponent } from './comic-form/comic-form.component';
import { ComicListModule } from './comic-list/comic-list.module';
import { ComicStorageService } from './comic-storage.service';
import { ComicService } from './comic.service';
import { ComicsComponent } from './comics.component';
import { FilterByCategory } from './filter-by-category.pipe';
import { FilterSearch } from './filter-search.pipe';

@NgModule({
  declarations: [ComicsComponent, ComicFormComponent, FilterByCategory, FilterSearch],
  entryComponents: [ComicFormComponent],
  imports: [
    ComicListModule,
    CommonModule,
    NgbModalModule,
    ReactiveFormsModule,
    RouterModule,
    SearchModule,
    VMessageModule,
  ],
  exports: [],
  providers: [ComicService, ComicStorageService],
})
export class ComicModule {}
