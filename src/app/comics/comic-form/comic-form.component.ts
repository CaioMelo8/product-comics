import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/product-list/product/category.enum';
import { Product } from 'src/app/product-list/product/product';
import { ComicService } from '../comic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comic-form',
  templateUrl: './comic-form.component.html',
  styleUrls: ['./comic-form.component.css'],
})
export class ComicFormComponent implements OnInit {
  addComicForm: FormGroup;
  categories = Category;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private comicService: ComicService,
  ) {}

  ngOnInit() {
    this.addComicForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: [this.categories.AVAILABLE],
      isFavorite: [false],
      isOnSale: [false],
      description: [''],
    });
  }

  onSubmit() {
    const newComic = new Product();

    newComic.title = this.addComicForm.get('title').value;
    newComic.category = +this.addComicForm.get('category').value;
    newComic.isFavorite = !!this.addComicForm.get('isFavorite').value;
    newComic.isOnSale = !!this.addComicForm.get('isOnSale').value;
    newComic.description = this.addComicForm.get('description').value;

    this.comicService.addComic(newComic);

    this.router.navigate(['/comics']);
  }
}
