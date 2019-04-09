import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [FooterComponent, HeaderComponent],
})
export class CoreModule {}
