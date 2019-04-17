import { Category } from './category.enum';

export class Comic {
  constructor(
    public title = '',
    public description = '',
    public category = Category.AVAILABLE,
    public urls = { type: '', url: '' },
    public thumbnail = {
      path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
      extension: 'jpg',
    },
    public isFavorite = false,
    public isOnSale = false
  ) {}
}
