import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { InvalidLinkComponent } from './components/invalid-link/invalid-link.component';
import { EntryComponent } from './components/entry/entry.component';
import { FillInComponent } from './components/fill-in/fill-in.component';
import { PaymentSlipComponent } from './components/payment-slip/payment-slip.component';
import { ValidationGuard } from './guards/validation.guard';
import { PriceGuard } from './guards/price.guard';

const routerRoutes: Routes = [
    { path: '', component: EntryComponent },
    { path: 'form', component: FillInComponent, canActivate: [PriceGuard] },
    { path: 'payment-slip', component: PaymentSlipComponent, canActivate: [ValidationGuard] },
    { path: '**', component: InvalidLinkComponent }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(routerRoutes);