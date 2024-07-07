import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LogoComponent } from './logo/logo.component';

@Component({
  selector: 'tc-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [LogoComponent, RouterModule, CommonModule],
})
export class NavigationComponent {
  isAuth = false;

  constructor(private authService: AuthService) {
    this.authService.isAuthenticated().subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
  }
}
