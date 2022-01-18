import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { ClockComponent } from '../clock/clock.component';
import { LiveCodeComponent } from '../live-code/live-code.component';

import { CodeService } from 'src/app/services/code.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css'],
  providers: [ClockComponent]
})
export class GeneratorComponent implements OnInit {
  cells: string[][]=[] ;
  headers: number[] = [];
  charForm = new FormGroup({
    userChar: new FormControl('')
  });
  code : string ='';

  constructor(private clock: ClockComponent, private codeService: CodeService) {

   }

  async ngOnInit() {

    this.headers= this.getHeaders(this.codeService.getMaxMatrixSize());
    await this.generate2DGrid();
    
  }

  getHeaders(maxNumber: number){
    let headerArray=[];
    for(let i=0; i<maxNumber; i++){
      headerArray.push(i);
    }
    return headerArray;

  }

  async generate2DGrid(){
    //get instant seconds
    //TODO: Client Validation
    const seconds: string = this.clock.getSeconds();
    //optional user Input
    //TODO: Client Validation
    let userCharacter = this.charForm.value.userChar.toLowerCase();
    //get matrix of random chars and generate code
    this.cells = this.codeService.setLiveCode(seconds, userCharacter).cells;
    this.code = this.codeService.setLiveCode(seconds, userCharacter).code;
  }

}
