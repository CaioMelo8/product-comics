import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(query: string) {
    this.search.emit(query);
  }
}
