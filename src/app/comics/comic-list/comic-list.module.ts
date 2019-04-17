import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ComicListComponent } from './comic-list.component';
import { ComicComponent } from './comic/comic.component';

@NgModule({
  declarations: [ComicComponent, ComicListComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [ComicListComponent],
  providers: [],
})
export class ComicListModule {}
