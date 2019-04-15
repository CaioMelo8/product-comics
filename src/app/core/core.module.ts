import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalRequestInterceptor } from './auth/global-request.interceptor';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [FooterComponent, HeaderComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: GlobalRequestInterceptor, multi: true }],
})
export class CoreModule {}
