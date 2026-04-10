import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HomeHeaderComponent } from '../dumb/home-header.component';
import { HomeNavItem, HomeSidebarComponent } from '../dumb/home-sidebar.component';

const HOME_LOGO_TEXT = 'Frontend';
const INITIAL_SIDEBAR_COLLAPSED_STATE = false;
const HOME_NAV_ITEMS: ReadonlyArray<HomeNavItem> = [
	{
		exact: true,
		icon: 'pi pi-home',
		label: 'Dashboard',
		routerLink: '/home',
	},
	{
		exact: false,
		icon: 'pi pi-cog',
		label: 'Settings',
		routerLink: '/home/settings',
	},
];

@Component({
	selector: 'app-home-layout',
	standalone: true,
	imports: [RouterOutlet, HomeHeaderComponent, HomeSidebarComponent],
	template: `
		<div class="flex min-h-screen flex-col bg-surface-50">
			<app-home-header [logoText]="logoText" />
			<div class="flex min-h-0 flex-1">
				<app-home-sidebar [collapsed]="isSidebarCollapsed()" [items]="navItems" (toggled)="toggleSidebar()" />
				<main class="flex-1 overflow-y-auto p-6">
					<router-outlet />
				</main>
			</div>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeLayoutComponent {
	protected readonly logoText = HOME_LOGO_TEXT;
	protected readonly navItems = HOME_NAV_ITEMS;
	protected readonly isSidebarCollapsed = signal(INITIAL_SIDEBAR_COLLAPSED_STATE);

	protected toggleSidebar(): void {
		this.isSidebarCollapsed.update((isCollapsed) => !isCollapsed);
	}
}