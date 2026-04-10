import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Drawer } from 'primeng/drawer';

import { HomeHeaderComponent } from '../dumb/home-header.component';
import { HomeNavItem, HomeSidebarComponent } from '../dumb/home-sidebar.component';

const HOME_LOGO_TEXT = 'Frontend';
const INITIAL_SIDEBAR_COLLAPSED_STATE = false;
const MOBILE_DRAWER_HEADER = 'Navigation';
const MOBILE_DRAWER_POSITION = 'left';
const MOBILE_DRAWER_STYLE = { width: '15rem' };
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
	imports: [RouterOutlet, Drawer, HomeHeaderComponent, HomeSidebarComponent],
	template: `
		<div class="flex min-h-screen flex-col bg-surface-50">
			<app-home-header
				[logoText]="logoText"
				[mobileNavigationOpen]="isMobileDrawerVisible()"
				(mobileNavigationToggled)="toggleMobileDrawer()"
			/>
			<div class="flex min-h-0 flex-1">
				<div class="hidden lg:block" data-desktop-sidebar="true">
					<app-home-sidebar [collapsed]="isSidebarCollapsed()" [items]="navItems" (toggled)="toggleSidebar()" />
				</div>
				<p-drawer
					[visible]="isMobileDrawerVisible()"
					[position]="mobileDrawerPosition"
					[style]="mobileDrawerStyle"
					[modal]="true"
					[dismissible]="true"
					[appendTo]="'body'"
					[header]="mobileDrawerHeader"
					(visibleChange)="setMobileDrawerVisible($event)"
				>
					<div class="h-full" data-mobile-drawer-content="true">
						<app-home-sidebar
							[collapsed]="false"
							[items]="navItems"
							[showToggle]="false"
							(itemSelected)="closeMobileDrawer()"
						/>
					</div>
				</p-drawer>
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
	protected readonly mobileDrawerHeader = MOBILE_DRAWER_HEADER;
	protected readonly mobileDrawerPosition = MOBILE_DRAWER_POSITION;
	protected readonly mobileDrawerStyle = MOBILE_DRAWER_STYLE;
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