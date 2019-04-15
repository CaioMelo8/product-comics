import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ComicComponent } from './comics/comic.component';

const appRoutes: Route[] = [
  { path: '', redirectTo: 'comics', pathMatch: 'full' },
  {
    path: 'comics',
    component: ComicComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
