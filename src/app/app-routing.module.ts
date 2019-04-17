import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ComicsComponent } from './comics/comics.component';

const appRoutes: Route[] = [
  { path: '', redirectTo: 'comics', pathMatch: 'full' },
  { path: 'comics', component: ComicsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
