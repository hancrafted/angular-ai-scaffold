import { Routes } from '@angular/router';

import { DashboardPageComponent } from './pages/dashboard.page';
import { SettingsPageComponent } from './pages/settings.page';
import { HomeLayoutComponent } from './components/smart/home-layout.component';

export const HOME_ROUTES: Routes = [
	{
		path: '',
		component: HomeLayoutComponent,
		children: [
			{
				path: '',
				component: DashboardPageComponent,
			},
			{
				path: 'settings',
				component: SettingsPageComponent,
			},
		],
	},
];
