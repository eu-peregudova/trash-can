import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'tc-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  spinnerActive$: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerActive$ = spinnerService.spinnerActive$;
  }
}
