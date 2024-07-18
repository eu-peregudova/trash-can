import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../common/services/auth.service';
import { SpinnerService } from '../../../common/services/spinner.service';

@Component({
  selector: 'tc-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  signInForm: FormGroup;
  error: string = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.spinnerService.showSpinner();
      this.authService.signIn(this.signInForm.value).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
          this.spinnerService.hideSpinner();
        },
        error: (error) => {
          this.error = 'Something went wrong, try again';
          this.spinnerService.hideSpinner();
          console.log(error);
        },
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
