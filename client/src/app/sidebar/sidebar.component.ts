import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  roles: any;
  children?: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
  { path: '/manager-dashboard', title: 'Nomination Form Demo', icon: 'nc-paper', class: '', roles: ['ROLE_MANAGER'] },
  { path: '/form', title: 'Nomination Form', icon: 'nc-paper', class: '', roles: ['ROLE_MANAGER'] },
  { path: '/hr-dashboard', title: 'Nominee List', icon: 'nc-paper', class: '', roles: ['ROLE_HR'] },
  { path: '/icons', title: 'Icons', icon: 'nc-diamond', class: '', roles: ['ROLE_MANAGER'] },
  { path: '/maps', title: 'Maps', icon: 'nc-pin-3', class: '', roles: ['ROLE_MANAGER'] },
  { path: '/notifications', title: 'Notifications', icon: 'nc-bell-55', class: '', roles: ['ROLE_MANAGER'] },
  { path: '/user', title: 'User Profile', icon: 'nc-single-02', class: '', roles: ['ROLE_MANAGER'] },
  { path: '/table', title: 'Table List', icon: 'nc-tile-56', class: '', roles: ['ROLE_USER'] },
  // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
  // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ngOnInit() {
    const userRole = localStorage.getItem("role");
    this.menuItems = ROUTES.filter(menuItem => this.filterRoutesByRole(menuItem, userRole));
  }

  private filterRoutesByRole(route: RouteInfo, userRole: string): boolean {
    // If the route has children, filter the children based on the user's role
    if (route.children) {
      route.children = route.children.filter(child => this.filterRoutesByRole(child, userRole));
    }

    // Return true if the route is allowed for the user's role, or if it has children after filtering
    return !route.roles || route.roles.includes(userRole) || (route.children && route.children.length > 0);
  }

  toggleDropdown(menuItem) {
    if (menuItem.children) {
      menuItem.active = !menuItem.active;
      // Reset the active state for other items
      this.menuItems.forEach(item => {
        if (item !== menuItem && item.children) {
          item.active = false;
        }
      });
    } else {
      // When a leaf menu item is clicked, reset the active state for all items
      this.menuItems.forEach(item => {
        item.active = false;
        if (item.children) {
          item.children.forEach(childItem => {
            childItem.active = false;
          });
        }
      });
      menuItem.active = true;
    }
  }

}
