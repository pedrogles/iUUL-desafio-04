import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoinsListComponent } from './pages/coins-list/coins-list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'listagem-de-moedas', component: CoinsListComponent},
];
