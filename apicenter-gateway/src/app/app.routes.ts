import { Routes } from '@angular/router';
import { GatewayList } from './gateway-list/gateway-list';
import { BackendList } from './backend-list/backend-list';

export const routes: Routes = [
    {path: 'gateways', component: GatewayList},
    {path: 'backends', component: BackendList},
    {path: '', redirectTo: '/gateways', pathMatch: 'full'}
];
