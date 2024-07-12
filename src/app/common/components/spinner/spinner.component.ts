import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'tc-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  spinnerActive$: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerActive$ = spinnerService.spinnerActive$;
  }
}
