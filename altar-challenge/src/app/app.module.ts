import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';

import { GeneratorComponent } from './components/generator/generator.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ClockComponent } from './components/clock/clock.component';
import { PaymentsFormComponent } from './components/payments-form/payments-form.component';
import { PaymentsTableComponent } from './components/payments-table/payments-table.component';
import { LiveCodeComponent } from './components/live-code/live-code.component';

import { CodeService } from './services/code.service';

@NgModule({
  declarations: [
    AppComponent,
    GeneratorComponent,
    PaymentsComponent,
    ClockComponent,
    PaymentsFormComponent,
    PaymentsTableComponent,
    LiveCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [CodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
