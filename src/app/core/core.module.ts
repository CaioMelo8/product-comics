import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GlobalRequestInterceptor } from './auth/global-request.interceptor';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [FooterComponent, HeaderComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: GlobalRequestInterceptor, multi: true }],
})
export class CoreModule {}
