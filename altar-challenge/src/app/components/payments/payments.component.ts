import { Component, OnInit } from '@angular/core';
import { PaymentsFormComponent } from '../payments-form/payments-form.component';
import { LiveCodeComponent } from '../live-code/live-code.component';
import { CodeService } from 'src/app/services/code.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  code : string ='';

  constructor(private codeService: CodeService) { }

  ngOnInit(): void {
  }

}
