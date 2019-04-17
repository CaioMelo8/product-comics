import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ComicFormComponent } from './comic-form/comic-form.component';
import { Category } from './comic-list/comic/category.enum';
import { Comic } from './comic-list/comic/comic';
import { ComicService } from './comic.service';

@Component({
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css'],
})
export class ComicsComponent {
  comics$: Observable<Comic[]>;
  currentPage: number;
  pagesRange = new Array(10).fill(undefined).map((value, index) => 1 + index);

  Category = Category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private comicService: ComicService,
    private ngbModal: NgbModal
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

  openModal() {
    this.ngbModal.open(ComicFormComponent, {
      backdrop: 'static',
      centered: true,
    });
  }
}
