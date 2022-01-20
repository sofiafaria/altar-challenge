import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';

import { GeneratorComponent } from './components/generator/generator.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { LiveCodeComponent } from './components/live-code/live-code.component';
import { ClockComponent } from './components/clock/clock.component';

import { CodeService } from './services/code.service';
import { PaymentsService } from './services/payments.service';
import { MatrixPopoverComponent } from './components/matrix-popover/matrix-popover.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    GeneratorComponent,
    PaymentsComponent,
    ClockComponent,
    LiveCodeComponent,
    MatrixPopoverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [CodeService, PaymentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
