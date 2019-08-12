import { Comic } from 'src/app/comics/comic-list/comic/comic';

export class ComicMapper {
  static map(object: Object) {
    const comic = new Comic();
    const keys = Object.keys(comic);

    keys.forEach(key => {
      if (key in object) {
        comic[key] = object[key];
      }
    });

    return comic;
  }
}
