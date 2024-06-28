import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LogoComponent } from './logo/logo.component';

@Component({
  selector: 'tc-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [LogoComponent, RouterModule],
})
export class NavigationComponent {}
