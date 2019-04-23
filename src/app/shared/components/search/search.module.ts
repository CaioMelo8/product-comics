import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '../spinner/spinner.module';
import { SearchComponent } from './search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, SpinnerModule],
  exports: [SearchComponent],
})
export class SearchModule {}
