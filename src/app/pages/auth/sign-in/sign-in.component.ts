import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../common/services/auth.service';
import { UserRole } from '../../../models/user-role.model';
import { catchError } from 'rxjs';

@Component({
  selector: 'tc-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value).subscribe({
        next: (data: { role: UserRole; token: string }) => {
          localStorage.setItem('userToken', data.token);
          this.router.navigate(['/tasks']);
        },
        error: (error) => console.log(error),
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
