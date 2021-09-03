import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './routes';
import {
  MatIconModule,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatButtonModule,
  MatInputModule,
  MatTooltipModule,
  MatSidenavModule,
  MatMenuModule,
  MatToolbarModule,
  MatCardModule,
  MatRadioModule,
  MatTabsModule,
  MatProgressBarModule
} from '@angular/material';
import { EntryComponent } from './components/entry/entry.component';
import { InvalidLinkComponent } from './components/invalid-link/invalid-link.component';
import { ValidInvalidComponent } from './components/valid-invalid/valid-invalid.component';
import { FillInComponent } from './components/fill-in/fill-in.component';
import { PaymentSlipComponent } from './components/payment-slip/payment-slip.component';
import { DataService } from './services/data.service';
import { LanguageService } from './services/language.service';
import { ValidationGuard } from './guards/validation.guard';
import { PriceGuard } from './guards/price.guard';
@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    InvalidLinkComponent,
    ValidInvalidComponent,
    FillInComponent,
    PaymentSlipComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routes,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatRadioModule,
    MatTabsModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    LanguageService,
    ValidationGuard,
    PriceGuard,
    { provide: MAT_DIALOG_DATA, useValue: {}}, 
    { provide: MatDialogRef, useValue: {}}
  ],
  entryComponents: [
    ValidInvalidComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);