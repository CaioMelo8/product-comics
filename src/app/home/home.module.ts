import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ComicListModule } from '../comics/comic-list/comic-list.module';
import { SpinnerModule } from '../shared/components/spinner/spinner.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [ComicListModule, CommonModule, RouterModule, SpinnerModule],
  exports: [HomeComponent],
})
export class HomeModule {}
