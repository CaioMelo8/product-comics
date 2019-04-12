import { Category } from './category.enum';

export class Product {
  id = '';
  title = '';
  description = '';
  category: Category = Category.AVAILABLE;
  isFavorite = false;
  isOnSale = false;
  urls: [
    {
      type: string;
      url: string;
    }
  ] = [{ type: '', url: '' }];
  thumbnail: {
    path: string;
    extension: string;
  } = { path: '', extension: '' };
}
