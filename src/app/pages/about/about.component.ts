import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'tc-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnDestroy {
  isAuth = false;
  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.subscription = this.authService.isAuthenticated().subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
