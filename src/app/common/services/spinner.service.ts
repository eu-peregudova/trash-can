import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerActiveSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  spinnerActive$ = this.spinnerActiveSubject.asObservable();

  showSpinner() {
    this.spinnerActiveSubject.next(true);
  }

  hideSpinner() {
    this.spinnerActiveSubject.next(false);
  }
}
