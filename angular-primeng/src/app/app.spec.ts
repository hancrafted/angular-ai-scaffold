import { provideLocationMocks } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { Drawer } from 'primeng/drawer';
import { Menu } from 'primeng/menu';

import { AppComponent } from './app';
import { routes } from './app.routes';

interface AppHarness {
	readonly compiled: HTMLElement;
	readonly fixture: ComponentFixture<AppComponent>;
	readonly router: Router;
}

interface ProfileMenuModelItem {
	readonly command?: unknown;
	readonly label?: string;
	readonly routerLink?: string | ReadonlyArray<string>;
	readonly url?: string;
}

const createAppHarness = async (): Promise<AppHarness> => {
	const fixture = TestBed.createComponent(AppComponent);
	const router = TestBed.inject(Router);

	fixture.detectChanges();
	await fixture.whenStable();

	return {
		compiled: fixture.nativeElement as HTMLElement,
		fixture,
		router,
	};
};

const navigateTo = async (harness: AppHarness, url: string): Promise<void> => {
	await harness.router.navigateByUrl(url);
	await harness.fixture.whenStable();
	harness.fixture.detectChanges();
};

const getDesktopNavLinks = (compiled: HTMLElement): HTMLAnchorElement[] =>
	Array.from(compiled.querySelectorAll('[data-desktop-sidebar="true"] nav a'));
const getMobileDrawer = (fixture: ComponentFixture<AppComponent>): Drawer =>
	fixture.debugElement.query(By.directive(Drawer)).componentInstance as Drawer;
const getMobileDrawerNavLinks = (compiled: HTMLElement): HTMLAnchorElement[] =>
	Array.from(compiled.ownerDocument.body.querySelectorAll('[data-mobile-drawer-content="true"] nav a'));
const getMobileMenuTrigger = (compiled: HTMLElement): HTMLButtonElement | null =>
	compiled.querySelector('button[data-mobile-menu-trigger="true"]');
const getProfileMenu = (fixture: ComponentFixture<AppComponent>): Menu => fixture.debugElement.query(By.directive(Menu)).componentInstance as Menu;
const getProfileMenuText = (compiled: HTMLElement): string => compiled.ownerDocument.body.textContent?.replace(/\s+/g, ' ').trim() ?? '';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [provideRouter(routes), provideLocationMocks(), providePrimeNG({ theme: { preset: Aura } })],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it('should redirect / to /home and render the home shell with the dashboard by default', async () => {
		const harness = await createAppHarness();

		await navigateTo(harness, '/');

		const navLinks = getDesktopNavLinks(harness.compiled);
		const navLabels = navLinks.map((link) => link.textContent?.replace(/\s+/g, ' ').trim());

		expect(harness.router.url).toBe('/home');
		expect(harness.compiled.querySelector('header')?.textContent).toContain('Frontend');
		expect(getMobileMenuTrigger(harness.compiled)).not.toBeNull();
		expect(navLabels).toEqual(['Dashboard', 'Settings']);
		expect(navLinks[0]?.className).toContain('bg-primary-50');
		expect(navLinks[0]?.querySelector('.pi')?.className).toContain('pi-home');
		expect(navLinks[1]?.querySelector('.pi')?.className).toContain('pi-cog');
		expect((harness.compiled.querySelector('input[data-header-search="true"]') as HTMLInputElement | null)?.placeholder).toBe('Search');
		expect(harness.compiled.querySelector('button[data-profile-trigger="true"]')?.textContent).toContain('Alex Morgan');
		expect(harness.compiled.querySelector('h1')?.textContent).toContain('Dashboard');
		expect(harness.compiled.querySelector('p')?.textContent).toContain('Welcome to the default dashboard.');
	});

	it('should render the header profile trigger and open a popup menu with non-functional placeholder items', async () => {
		const harness = await createAppHarness();

		await navigateTo(harness, '/home');

		const profileMenu = getProfileMenu(harness.fixture);
		const menuModel = (profileMenu.model ?? []) as ReadonlyArray<ProfileMenuModelItem>;
		const initialTriggerButton = harness.compiled.querySelector('button[data-profile-trigger="true"]') as HTMLButtonElement | null;

		expect((harness.compiled.querySelector('input[data-header-search="true"]') as HTMLInputElement | null)?.placeholder).toBe('Search');
		expect(initialTriggerButton?.getAttribute('aria-haspopup')).toBe('true');
		expect(initialTriggerButton?.getAttribute('aria-expanded')).toBe('false');
		expect(menuModel.map((item) => item.label)).toEqual(['My Profile', 'Settings', 'Logout']);
		expect(menuModel.every((item) => item.command === undefined && item.routerLink === undefined && item.url === undefined)).toBe(true);

		initialTriggerButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		await harness.fixture.whenStable();
		harness.fixture.detectChanges();

		const expandedTriggerButton = harness.compiled.querySelector('button[data-profile-trigger="true"]') as HTMLButtonElement | null;
		const profileMenuText = getProfileMenuText(harness.compiled);

		expect(expandedTriggerButton?.textContent).toContain('Alex Morgan');
		expect(expandedTriggerButton?.getAttribute('aria-expanded')).toBe('true');
		expect(profileMenuText).toContain('My Profile');
		expect(profileMenuText).toContain('Settings');
		expect(profileMenuText).toContain('Logout');
	});

	it('should render the settings page and update active-route highlighting', async () => {
		const harness = await createAppHarness();

		await navigateTo(harness, '/home/settings');

		const navLinks = getDesktopNavLinks(harness.compiled);

		expect(harness.router.url).toBe('/home/settings');
		expect(harness.compiled.querySelector('h1')?.textContent).toContain('Settings');
		expect(harness.compiled.querySelector('p')).toBeNull();
		expect(navLinks[0]?.className).not.toContain('bg-primary-50');
		expect(navLinks[1]?.className).toContain('bg-primary-50');
	});

	it('should open the mobile drawer from the hamburger trigger and close it on outside click', async () => {
		const harness = await createAppHarness();

		await navigateTo(harness, '/home');

		const mobileMenuTrigger = getMobileMenuTrigger(harness.compiled);
		mobileMenuTrigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		await harness.fixture.whenStable();
		harness.fixture.detectChanges();

		const drawer = getMobileDrawer(harness.fixture);
		const mobileDrawerText = harness.compiled.ownerDocument.body.textContent ?? '';

		expect(mobileMenuTrigger?.className).toContain('lg:hidden');
		expect(harness.compiled.querySelector('[data-desktop-sidebar="true"]')?.className).toContain('hidden');
		expect(drawer.visible).toBe(true);
		expect(mobileDrawerText).toContain('Navigation');
		expect(mobileDrawerText).toContain('Dashboard');

		const drawerMask = harness.compiled.ownerDocument.body.querySelector('.p-drawer-mask') as HTMLElement | null;
		drawerMask?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		await harness.fixture.whenStable();
		harness.fixture.detectChanges();

		expect(getMobileDrawer(harness.fixture).visible).toBe(false);
		expect(harness.compiled.ownerDocument.body.querySelector('[data-mobile-drawer-content="true"]')).toBeNull();
		expect(getMobileMenuTrigger(harness.compiled)?.getAttribute('aria-expanded')).toBe('false');
	});

	it('should close the mobile drawer after selecting a navigation item', async () => {
		const harness = await createAppHarness();

		await navigateTo(harness, '/home');

		getMobileMenuTrigger(harness.compiled)?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		await harness.fixture.whenStable();
		harness.fixture.detectChanges();

		const mobileNavLinks = getMobileDrawerNavLinks(harness.compiled);
		mobileNavLinks[1]?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
		await harness.fixture.whenStable();
		harness.fixture.detectChanges();

		expect(harness.router.url).toBe('/home/settings');
		expect(getMobileDrawer(harness.fixture).visible).toBe(false);
		expect(harness.compiled.ownerDocument.body.querySelector('[data-mobile-drawer-content="true"]')).toBeNull();
	});

	it('should collapse the sidebar to icon-only mode and keep collapsed icons navigable', async () => {
		const harness = await createAppHarness();

		await navigateTo(harness, '/home');

		const initialToggleButton = harness.compiled.querySelector('[data-desktop-sidebar="true"] button[data-sidebar-toggle="true"]');
		initialToggleButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		await harness.fixture.whenStable();
		harness.fixture.detectChanges();
		const collapsedToggleButton = harness.compiled.querySelector('[data-desktop-sidebar="true"] button[data-sidebar-toggle="true"]');

		expect(collapsedToggleButton?.getAttribute('aria-expanded')).toBe('false');
		expect(collapsedToggleButton?.getAttribute('aria-label')).toBe('Expand sidebar');
		expect(harness.compiled.querySelector('[data-desktop-sidebar="true"] [data-sidebar-state]')?.getAttribute('data-sidebar-state')).toBe('collapsed');
		expect(harness.compiled.querySelectorAll('[data-desktop-sidebar="true"] [data-nav-label]')).toHaveLength(0);

		const collapsedNavLinks = getDesktopNavLinks(harness.compiled);
		collapsedNavLinks[1]?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
		await harness.fixture.whenStable();
		harness.fixture.detectChanges();

		const expandedToggleButton = harness.compiled.querySelector('[data-desktop-sidebar="true"] button[data-sidebar-toggle="true"]');
		expect(harness.router.url).toBe('/home/settings');
		expect(getDesktopNavLinks(harness.compiled)[1]?.className).toContain('bg-primary-50');

		expandedToggleButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		await harness.fixture.whenStable();
		harness.fixture.detectChanges();

		expect(expandedToggleButton?.getAttribute('aria-expanded')).toBe('true');
		expect(expandedToggleButton?.getAttribute('aria-label')).toBe('Collapse sidebar');
		expect(harness.compiled.querySelector('[data-desktop-sidebar="true"] [data-sidebar-state]')?.getAttribute('data-sidebar-state')).toBe('expanded');
		expect(harness.compiled.querySelectorAll('[data-desktop-sidebar="true"] [data-nav-label]')).toHaveLength(2);
	});
});
