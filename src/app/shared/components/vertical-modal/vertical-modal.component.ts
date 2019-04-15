import { Component, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-vertical-modal',
  templateUrl: './vertical-modal.component.html',
  styleUrls: ['./vertical-modal.component.css'],
})
export class VerticalModalComponent {
  @ViewChild('modal') modal: ElementRef;

  constructor(private renderer: Renderer2) {}

  @Input() set show(show: boolean) {
    console.log(this.modal);
    if (show) {
      this.renderer.addClass(this.modal.nativeElement, 'show');
      this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.modal.nativeElement, 'display', 'none');
    }
  }
}
