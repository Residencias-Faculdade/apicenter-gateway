import { Routes } from '@angular/router';
import { GatewayList } from './gateway-list/gateway-list';

export const routes: Routes = [
    {path: 'gateways', component: GatewayList},
    {path: '', redirectTo: '/gateways', pathMatch: 'full'}
];
