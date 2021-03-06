import { Component, Input } from '@angular/core';
import { Comic } from './comic/comic';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.css'],
})
export class ComicListComponent {
  @Input() comics: Comic[];
}
