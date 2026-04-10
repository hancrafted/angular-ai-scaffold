import { ChangeDetectionStrategy, Component } from '@angular/core';

const DASHBOARD_HEADING = 'Dashboard';
const DASHBOARD_MESSAGE = 'Welcome to the default dashboard.';

@Component({
	selector: 'app-dashboard-page',
	standalone: true,
	templateUrl: './dashboard.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
	protected readonly heading = DASHBOARD_HEADING;
	protected readonly message = DASHBOARD_MESSAGE;
}
