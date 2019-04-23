import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @Input() isLoading = false;

  @Output() search = new EventEmitter<string>();

  onSearch(query: string) {
    this.search.emit(query);
  }
}
