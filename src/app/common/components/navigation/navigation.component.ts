import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LogoComponent } from './logo/logo.component';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { UserRole } from '../../../models/user-role.model';
import { ShowAuthDirective } from '../../directives/show-auth.directive';

@Component({
  selector: 'tc-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [LogoComponent, RouterModule, CommonModule, ShowAuthDirective],
})
export class NavigationComponent {
  userRole$: Observable<UserRole>;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.userRole$ = this.userService.userRole$;
  }

  logOut(): void {
    this.authService.signOut();
    this.router.navigate([''])
  }
}
