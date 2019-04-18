import { Pipe, PipeTransform } from '@angular/core';
import { Comic } from './comic-list/comic/comic';

@Pipe({ name: 'filterSearch' })
export class FilterSearch implements PipeTransform {
  transform(comics: Comic[], query: string) {
    query = query.trim().toLowerCase();

    if (query) {
      return comics.filter(
        comic =>
          comic.title.toLowerCase().includes(query) ||
          (comic.description && comic.description.toLowerCase().includes(query))
      );
    } else {
      return comics;
    }
  }
}
