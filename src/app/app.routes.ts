import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoinsListComponent } from './pages/coins-list/coins-list.component';
import { CurrencyConverterComponent } from './pages/currency-converter/currency-converter.component';
import { ConversionsHistoryComponent } from './pages/conversions-history/conversions-history.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'listagem-de-moedas', component: CoinsListComponent},
    { path: 'conversao-de-moedas', component: CurrencyConverterComponent},
    { path: 'historico-de-conversoes', component: ConversionsHistoryComponent},
];
