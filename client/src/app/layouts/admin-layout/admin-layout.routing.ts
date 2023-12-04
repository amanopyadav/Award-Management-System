import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/manager-dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { AddAssetComponent } from 'app/pages/addasset/addasset.component';
import { HrDashboardComponent } from 'app/pages/hr-dashboard/hr-dashboard.component';
import { FormComponent } from 'app/pages/form/form.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'manager-dashboard',        component: DashboardComponent               },
    { path: 'hr-dashboard',             component: HrDashboardComponent             },
    { path: 'user',                     component: UserComponent                    },
    { path: 'table',                    component: TableComponent                   }, 
    { path: 'typography',               component: TypographyComponent              },
    { path: 'icons',                    component: IconsComponent                   },
    { path: 'maps',                     component: MapsComponent                    },
    { path: 'notifications',            component: NotificationsComponent           },
    { path: 'upgrade',                  component: UpgradeComponent                 },
    { path: 'addasset',                 component: AddAssetComponent                },
    { path: 'form',                       component: FormComponent                    }
];
