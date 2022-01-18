import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payments-form',
  templateUrl: './payments-form.component.html',
  styleUrls: ['./payments-form.component.css']
})
export class PaymentsFormComponent implements OnInit {

  paymentsForm = new FormGroup({
    payment: new FormControl(''),
    amount: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  onAddPayment(){}

}
