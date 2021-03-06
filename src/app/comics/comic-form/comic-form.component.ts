import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComicMapper } from 'src/app/shared/mappers/comic.mapper';
import { Category } from '../comic-list/comic/category.enum';
import { ComicService } from '../service/comic.service';

@Component({
  templateUrl: './comic-form.component.html',
  styleUrls: ['./comic-form.component.css'],
})
export class ComicFormComponent implements OnInit {
  addForm: FormGroup;
  categories = Category;

  constructor(
    private formBuilder: FormBuilder,
    private comicService: ComicService,
    public modalService: NgbActiveModal
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: [this.categories.AVAILABLE],
      isFavorite: [false],
      isOnSale: [false],
      description: [''],
    });
  }

  onSubmit() {
    const formData = this.addForm.getRawValue();
    const newComic = ComicMapper.map(formData);

    this.comicService.add(newComic);
    this.modalService.dismiss('Submit');
  }
}
