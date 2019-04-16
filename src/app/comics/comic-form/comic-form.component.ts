import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/product-list/product/category.enum';
import { Product } from 'src/app/product-list/product/product';
import { ComicService } from '../comic.service';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './comic-form.component.html',
  styleUrls: ['./comic-form.component.css'],
})
export class ComicFormComponent implements OnInit {
  addForm: FormGroup;
  categories = Category;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private comicService: ComicService,
    public activeModal: NgbActiveModal
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
    const newComic = this.comicService.toComic(formData);

    this.comicService.addComic(newComic);
    this.activeModal.dismiss('Submit');
    this.router.navigate(['/comics']);
  }
}
