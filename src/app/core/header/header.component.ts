import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  navbarOpen = false;
  dropdownOpen = false;

  constructor(private renderer: Renderer2) {}

  navbarCollapseToggle() {
    this.navbarOpen = !this.navbarOpen;
  }

  dropdownToggle() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
