import { Component, DoCheck, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../product-list/product/category.enum';
import { Product } from '../product-list/product/product';
import { ComicService } from './comic.service';
import { Observable, merge } from 'rxjs';

@Component({
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css'],
})
export class ComicComponent {
  comics$: Observable<Product[]>;
  currentPage: number;
  pagesRange = Array.from({ length: 20 }, (value, key) => key + 1);

  comicCategory = Category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private comicService: ComicService,
  ) {
    this.route.queryParams.subscribe(params => {
      const page = +params['page'];

      if (!page || page < 1) {
        this.router.navigate(['/comics'], {
          queryParams: { page: 1 },
          queryParamsHandling: 'merge',
        });
      } else {
        this.comics$ = this.comicService.listPaginated(page - 1);
        this.currentPage = page;
      }
    });
  }
}
