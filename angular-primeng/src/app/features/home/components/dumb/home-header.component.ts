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
	imports: [Avatar, ButtonDirective, IconField, InputIcon, InputText, Menu],
	standalone: true,
	templateUrl: './home-header.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeaderComponent {
	public readonly logoText = input.required<string>();
	public readonly mobileNavigationOpen = input(false);
	public readonly mobileNavigationToggled = output();
	protected readonly isProfileMenuOpen = signal(false);
	protected readonly mobileMenuIcon = MOBILE_MENU_ICON_CLASS;
	protected readonly mobileMenuLabel = computed(() => (this.mobileNavigationOpen() ? CLOSE_MOBILE_MENU_LABEL : OPEN_MOBILE_MENU_LABEL));
	protected readonly profileAvatarLabel = PROFILE_AVATAR_LABEL;
	protected readonly profileDisplayName = PROFILE_DISPLAY_NAME;
	protected readonly profileMenuId = PROFILE_MENU_ID;
	protected readonly profileMenuItems = PROFILE_MENU_ITEMS;
	protected readonly profileTriggerLabel = PROFILE_TRIGGER_LABEL;
	protected readonly searchPlaceholder = HEADER_SEARCH_PLACEHOLDER;
}
