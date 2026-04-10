import { ChangeDetectionStrategy, Component } from '@angular/core';

const SETTINGS_HEADING = 'Settings';

@Component({
	selector: 'app-settings-page',
	standalone: true,
	template: `
		<section>
			<h1 class="text-3xl font-semibold text-surface-900">{{ heading }}</h1>
		</section>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {
	protected readonly heading = SETTINGS_HEADING;
}