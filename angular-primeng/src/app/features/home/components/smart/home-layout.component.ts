import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Drawer } from 'primeng/drawer';

import { HomeHeaderComponent } from '../dumb/home-header.component';
import { HomeNavItem, HomeSidebarComponent } from '../dumb/home-sidebar.component';

const HOME_LOGO_TEXT = 'Frontend';
const INITIAL_SIDEBAR_COLLAPSED_STATE = false;
const MOBILE_DRAWER_APPEND_TO = 'body';
const MOBILE_DRAWER_HEADER = 'Navigation';
const MOBILE_DRAWER_POSITION = 'left';
const MOBILE_DRAWER_STYLE_CLASS = 'w-60';
const HOME_NAV_ITEMS: readonly HomeNavItem[] = [
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
	imports: [RouterOutlet, Drawer, HomeHeaderComponent, HomeSidebarComponent],
	standalone: true,
	templateUrl: './home-layout.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeLayoutComponent {
	protected readonly mobileDrawerAppendTo = MOBILE_DRAWER_APPEND_TO;
	protected readonly logoText = HOME_LOGO_TEXT;
	protected readonly mobileDrawerHeader = MOBILE_DRAWER_HEADER;
	protected readonly mobileDrawerPosition = MOBILE_DRAWER_POSITION;
	protected readonly mobileDrawerStyleClass = MOBILE_DRAWER_STYLE_CLASS;
	protected readonly navItems = HOME_NAV_ITEMS;
	protected readonly isMobileDrawerVisible = signal(false);
	protected readonly isSidebarCollapsed = signal(INITIAL_SIDEBAR_COLLAPSED_STATE);

	protected closeMobileDrawer(): void {
		this.isMobileDrawerVisible.set(false);
	}

	protected setMobileDrawerVisible(isVisible: boolean): void {
		this.isMobileDrawerVisible.set(isVisible);
	}

	protected toggleMobileDrawer(): void {
		this.isMobileDrawerVisible.update((isVisible) => !isVisible);
	}

	protected toggleSidebar(): void {
		this.isSidebarCollapsed.update((isCollapsed) => !isCollapsed);
	}
}
