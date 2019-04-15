import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ComicComponent } from './comics/comic.component';
import { ComicFormComponent } from './comics/comic-form/comic-form.component';

const appRoutes: Route[] = [
  { path: '', redirectTo: 'comics', pathMatch: 'full' },
  { path: 'comics', component: ComicComponent },
  { path: 'comics/add', component: ComicFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
