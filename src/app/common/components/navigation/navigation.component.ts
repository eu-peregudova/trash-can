import { Component } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tc-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [LogoComponent, RouterModule],
})
export class NavigationComponent {}
