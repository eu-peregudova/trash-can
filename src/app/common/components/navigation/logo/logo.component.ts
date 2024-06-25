import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tc-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class LogoComponent {
}
