import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../common/services/auth.service';
import { UserRole } from '../../../models/user-role.model';

@Component({
  selector: 'tc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          (control: { value: string }): { notSame: boolean } => {
            return control.value === this.signUpForm?.controls['password'].value ? null : { notSame: true };
          },
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const { repeatPassword, ...values } = this.signUpForm.value;
      this.authService.signUp(values).subscribe((data: { role: UserRole; token: string }) => {
        localStorage.setItem('userToken', data.token);
        this.router.navigate(['/tasks']);
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
