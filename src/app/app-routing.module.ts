import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ComicsComponent } from './comics/comics.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'comics', component: ComicsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
