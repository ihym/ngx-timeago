import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { TimeagoDirective, TimeagoPipe } from 'ngx-timeago';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatCardModule, MatCheckboxModule, FormsModule, TimeagoPipe],
  templateUrl: './app.component.html',
})
export class StandaloneComponent {
  date = Date.now() - 55000;
  live = true;
}
