import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms';
import { LiveCodeComponent } from '../live-code/live-code.component';
import { CodeService } from 'src/app/services/code.service';
import { PaymentsService } from 'src/app/services/payments.service';
import Payments from 'src/app/models/Payments';
import CodeMatrix from 'src/app/models/CodeMatrix';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  generate$ = this.codeService.generate$;
  currentCodeMatrix$ = this.codeService.currentCodeMatrix$;

  paymentsForm = new FormGroup({
    payment: new FormControl('', [Validators.required]),
    amount: new FormControl('',[Validators.required])
  });

  payments: Array<Payments> = [];

  currentCodeMatrix: CodeMatrix | null = null;

  constructor(private codeService: CodeService, private paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.generate$.subscribe(running => running ? this.paymentsForm.enable : this.paymentsForm.disable);
    this.currentCodeMatrix$.subscribe(currentCodeMatrix => this.currentCodeMatrix = currentCodeMatrix);
    this.showPayments();
  }

    onAddPayment(){

      let id = this.payments.length;
      const newPayment: Payments = {
        id: id +1,
        payment: this.paymentsForm.value.payment,
        amount: this.paymentsForm.value.amount,
        code: this.currentCodeMatrix$.value?.code,
        matrix: this.currentCodeMatrix$.value?.matrix
      }

      this.paymentsService.createPaymentApi(newPayment).subscribe((result: any) => console.log(result));
      this.showPayments();
    }

    showPayments(){
      this.paymentsService.getPaymentsApi().subscribe((payments: Payments[]) => this.payments = payments);
    }

}
