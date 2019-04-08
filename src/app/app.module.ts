import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { ProductListModule } from './product-list/product-list.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HeaderModule, ProductListModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
