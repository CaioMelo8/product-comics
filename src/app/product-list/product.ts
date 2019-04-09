import { ProductCategoryEnum } from './product-category.enum';

export interface Product {
  id: number;
  title: string;
  description: string;
  urls: [
    {
      type: string;
      url: string;
    }
  ];
  thumbnail: {
    path: string;
    extension: string;
  };
  isFavorite: boolean;
  category: ProductCategoryEnum;
}
