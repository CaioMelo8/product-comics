import { ProductCategoryEnum } from './product-category.enum';

export class Product {
  id = '';
  title = '';
  description = '';
  category = ProductCategoryEnum.AVAILABLE.valueOf();
  isFavorite = false;
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
