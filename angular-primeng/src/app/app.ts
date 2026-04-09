import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, ButtonModule],
	templateUrl: './app.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	protected readonly title = signal('frontend');
}
