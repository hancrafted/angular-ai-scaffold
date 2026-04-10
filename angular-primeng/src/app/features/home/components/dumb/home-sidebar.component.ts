import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';

const SIDEBAR_BASE_CLASS = 'flex h-full flex-col border-r border-surface-200 bg-surface-0 p-4 transition-[width] duration-200 ease-in-out';
const SIDEBAR_EXPANDED_CLASS = 'w-60';
const SIDEBAR_COLLAPSED_CLASS = 'w-16';
const NAV_ITEM_BASE_CLASS = 'flex items-center rounded-lg py-2 text-surface-700 transition-colors hover:bg-surface-100 hover:text-surface-900';
const NAV_ITEM_EXPANDED_CLASS = 'gap-3 px-3 justify-start';
const NAV_ITEM_COLLAPSED_CLASS = 'justify-center px-2';
const COLLAPSE_SIDEBAR_LABEL = 'Collapse sidebar';
const EXPAND_SIDEBAR_LABEL = 'Expand sidebar';
const EXPANDED_SIDEBAR_STATE = 'expanded';
const COLLAPSED_SIDEBAR_STATE = 'collapsed';
const COLLAPSE_ICON_CLASS = 'pi pi-angle-left';
const EXPAND_ICON_CLASS = 'pi pi-angle-right';

export interface HomeNavItem {
	readonly exact: boolean;
	readonly icon: string;
	readonly label: string;
	readonly routerLink: string;
}

@Component({
	selector: 'app-home-sidebar',
	imports: [RouterLink, RouterLinkActive, ButtonDirective, Tooltip],
	standalone: true,
	templateUrl: './home-sidebar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSidebarComponent {
	public readonly collapsed = input(false);
	public readonly items = input.required<readonly HomeNavItem[]>();
	public readonly showToggle = input(true);
	public readonly itemSelected = output();
	public readonly toggled = output();

	protected readonly navItemClass = computed(() => {
		const sidebarSizeClass = this.collapsed() ? NAV_ITEM_COLLAPSED_CLASS : NAV_ITEM_EXPANDED_CLASS;

		return `${NAV_ITEM_BASE_CLASS} ${sidebarSizeClass}`;
	});

	protected readonly sidebarClass = computed(() => {
		const sidebarSizeClass = this.collapsed() ? SIDEBAR_COLLAPSED_CLASS : SIDEBAR_EXPANDED_CLASS;

		return `${SIDEBAR_BASE_CLASS} ${sidebarSizeClass}`;
	});

	protected readonly sidebarState = computed(() => (this.collapsed() ? COLLAPSED_SIDEBAR_STATE : EXPANDED_SIDEBAR_STATE));
	protected readonly toggleIcon = computed(() => (this.collapsed() ? EXPAND_ICON_CLASS : COLLAPSE_ICON_CLASS));
	protected readonly toggleLabel = computed(() => (this.collapsed() ? EXPAND_SIDEBAR_LABEL : COLLAPSE_SIDEBAR_LABEL));
}
