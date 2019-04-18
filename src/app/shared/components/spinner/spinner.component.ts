import { Component, Input } from '@angular/core';
import { SpinnerType } from './spinner-type.enum';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  @Input() type: SpinnerType = SpinnerType.BORDER;
  @Input() size = 1;
}
