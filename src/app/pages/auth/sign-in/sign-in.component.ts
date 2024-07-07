import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../common/services/auth.service';

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
      console.log(this.signInForm.value);
      this.authService.signIn(this.signInForm.value).subscribe((data: { token: string }) => {
        localStorage.setItem('userToken', data.token);
        console.log(data);
        this.router.navigate(['/tasks']);
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
