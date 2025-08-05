import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent {
  date = Date.now() - 55000;
  live = true;
}
