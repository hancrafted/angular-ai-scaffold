import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import type { MenuItem } from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { ButtonDirective } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Menu } from 'primeng/menu';

const HEADER_SEARCH_PLACEHOLDER = 'Search';
const MOBILE_MENU_ICON_CLASS = 'pi pi-bars';
const OPEN_MOBILE_MENU_LABEL = 'Open navigation menu';
const CLOSE_MOBILE_MENU_LABEL = 'Close navigation menu';
const PROFILE_MENU_ID = 'home-header-profile-menu';
const PROFILE_DISPLAY_NAME = 'Alex Morgan';
const PROFILE_AVATAR_LABEL = 'AM';
const PROFILE_TRIGGER_LABEL = 'Open profile menu';
const PROFILE_MENU_ITEMS: MenuItem[] = [
	{ icon: 'pi pi-user', label: 'My Profile' },
	{ icon: 'pi pi-cog', label: 'Settings' },
	{ icon: 'pi pi-sign-out', label: 'Logout' },
];

@Component({
	selector: 'app-home-header',
	standalone: true,
	imports: [Avatar, ButtonDirective, IconField, InputIcon, InputText, Menu],
	template: `
		<header class="flex h-14 items-center gap-4 border-b border-surface-200 bg-surface-0 px-4 shadow-sm lg:px-6">
			<div class="flex min-w-0 items-center gap-2">
				<button
					pButton
					type="button"
					[text]="true"
					[rounded]="true"
					[icon]="mobileMenuIcon"
					class="lg:hidden"
					[attr.aria-expanded]="mobileNavigationOpen()"
					[attr.aria-label]="mobileMenuLabel()"
					data-mobile-menu-trigger="true"
					(click)="mobileNavigationToggled.emit()"
				></button>
				<span class="text-lg font-semibold text-surface-900">{{ logoText() }}</span>
			</div>
			<div class="flex min-w-0 flex-1 justify-center">
				<label class="sr-only" for="home-header-search">Search</label>
				<p-iconfield class="w-full max-w-md" iconPosition="left">
					<p-inputicon class="pi pi-search" />
					<input
						id="home-header-search"
						data-header-search="true"
						pInputText
						type="search"
						class="w-full"
						[placeholder]="searchPlaceholder"
					/>
				</p-iconfield>
			</div>
			<div class="flex items-center justify-end">
				<button
					type="button"
					class="flex items-center gap-3 rounded-full px-2 py-1 text-surface-700 transition-colors hover:bg-surface-100 hover:text-surface-900"
					[attr.aria-controls]="profileMenuId"
					[attr.aria-expanded]="isProfileMenuOpen()"
					aria-haspopup="true"
					[attr.aria-label]="profileTriggerLabel"
					data-profile-trigger="true"
					(click)="profileMenu.toggle($event)"
				>
					<p-avatar [label]="profileAvatarLabel" shape="circle" />
					<span class="text-sm font-medium text-surface-900">{{ profileDisplayName }}</span>
					<span class="pi pi-chevron-down text-xs text-surface-500" aria-hidden="true"></span>
				</button>
				<p-menu
					#profileMenu
					[id]="profileMenuId"
					[model]="profileMenuItems"
					[popup]="true"
					(onHide)="isProfileMenuOpen.set(false)"
					(onShow)="isProfileMenuOpen.set(true)"
				/>
			</div>
		</header>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeaderComponent {
	public readonly logoText = input.required<string>();
	public readonly mobileNavigationOpen = input(false);
	public readonly mobileNavigationToggled = output<void>();
	protected readonly isProfileMenuOpen = signal(false);
	protected readonly mobileMenuIcon = MOBILE_MENU_ICON_CLASS;
	protected readonly mobileMenuLabel = computed(() =>
		this.mobileNavigationOpen() ? CLOSE_MOBILE_MENU_LABEL : OPEN_MOBILE_MENU_LABEL,
	);
	protected readonly profileAvatarLabel = PROFILE_AVATAR_LABEL;
	protected readonly profileDisplayName = PROFILE_DISPLAY_NAME;
	protected readonly profileMenuId = PROFILE_MENU_ID;
	protected readonly profileMenuItems = PROFILE_MENU_ITEMS;
	protected readonly profileTriggerLabel = PROFILE_TRIGGER_LABEL;
	protected readonly searchPlaceholder = HEADER_SEARCH_PLACEHOLDER;
}