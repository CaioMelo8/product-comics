import { Component, DoCheck, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../product-list/product/category.enum';
import { Product } from '../product-list/product/product';

@Component({
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css'],
})
export class ComicComponent implements OnInit {
  comics: Product[];

  comicCategory = Category;
  iterableDiffer: IterableDiffer<Product>;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.comics = data['comics'];
    });
  }

  ngOnInit() {}
}
