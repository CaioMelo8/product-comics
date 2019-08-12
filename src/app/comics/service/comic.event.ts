import { Comic } from '../comic-list/comic/comic';

export class ComicEvent {
  constructor(public type: String, public comics: Comic[]) {}
}
