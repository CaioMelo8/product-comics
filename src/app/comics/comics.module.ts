import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchModule } from '../shared/components/search/search.module';
import { SpinnerModule } from '../shared/components/spinner/spinner.module';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { ComicFormComponent } from './comic-form/comic-form.component';
import { ComicListModule } from './comic-list/comic-list.module';
import { ComicStorageService } from './service/comic-storage.service';
import { ComicService } from './service/comic.service';
import { ComicsComponent } from './comics.component';
import { FilterByCategory } from './pipe/filter-by-category.pipe';
import { FilterSearch } from './pipe/filter-search.pipe';

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
    SpinnerModule,
    VMessageModule,
  ],
  exports: [],
  providers: [ComicStorageService],
})
export class ComicModule {}
