import { ChangeDetectionStrategy, Component } from '@angular/core';

const DASHBOARD_HEADING = 'Dashboard';
const DASHBOARD_MESSAGE = 'Welcome to the default dashboard.';

@Component({
	selector: 'app-dashboard-page',
	standalone: true,
	template: `
		<section class="flex flex-col gap-3">
			<h1 class="text-3xl font-semibold text-surface-900">{{ heading }}</h1>
			<p class="text-base text-surface-700">{{ message }}</p>
		</section>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
	protected readonly heading = DASHBOARD_HEADING;
	protected readonly message = DASHBOARD_MESSAGE;
}