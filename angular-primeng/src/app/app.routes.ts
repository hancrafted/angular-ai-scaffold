import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home',
	},
	{
		path: 'home',
		loadChildren: () => import('./features/home').then((feature) => feature.HOME_ROUTES),
	},
];
