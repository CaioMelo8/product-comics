import { Component, DoCheck, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, merge } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../product-list/product/category.enum';
import { Product } from '../product-list/product/product';
import { ComicService } from './comic.service';
import { ComicFormComponent } from './comic-form/comic-form.component';

@Component({
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css'],
})
export class ComicComponent {
  comics$: Observable<Product[]>;
  currentPage: number;
  pagesRange = new Array(10).fill(undefined).map((value, index) => 1 + index);

  comicCategory = Category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private comicService: ComicService,
    private ngbModal: NgbModal
  ) {
    console.log(this.pagesRange);
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

  openModal() {
    this.ngbModal.open(ComicFormComponent, {
      backdrop: 'static',
      centered: true,
    });
  }
}
