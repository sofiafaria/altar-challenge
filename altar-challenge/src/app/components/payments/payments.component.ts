import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LiveCodeComponent } from '../live-code/live-code.component';
import { CodeService } from 'src/app/services/code.service';
import { PaymentsService } from 'src/app/services/payments.service';
import Payments from 'src/app/models/Payments';
import CodeMatrix from 'src/app/models/CodeMatrix';
import paymentsData from '../../db.json';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  generate$ = this.codeService.generate$;
  currentCodeMatrix$ = this.codeService.currentCodeMatrix$;

  paymentsForm = new FormGroup({
    payment: new FormControl(''),
    amount: new FormControl('')
  });

  payments: Array<Payments> = paymentsData;

  newPayment: Payments={
    id : 0,
    payment :'',
    amount : 0,
    code : '',
    matrix : []
  };
  currentCodeMatrix: CodeMatrix | null = null;

  constructor(private codeService: CodeService, private paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.currentCodeMatrix$.subscribe(currentCodeMatrix => this.currentCodeMatrix = currentCodeMatrix);
    this.showPayments();
  }

    onAddPayment(){
      this.newPayment.id = 1;
      this.newPayment.payment = this.paymentsForm.value.payment;
      this.newPayment.amount = this.paymentsForm.value.amount;
      this.newPayment.code = this.currentCodeMatrix?.code;
      this.newPayment.matrix = this.currentCodeMatrix?.matrix;

    }

    showPayments(){
      //this.paymentsService.getPayments().subscribe( (payments : Payments[] | null) => {payments ? this.payments = payments : null})
    }

}
