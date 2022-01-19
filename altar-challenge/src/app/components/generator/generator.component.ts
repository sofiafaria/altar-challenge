import { Component, OnInit } from '@angular/core';
import CodeMatrix from 'src/app/models/CodeMatrix';
import { CodeService } from 'src/app/services/code.service';
import { ClockComponent } from '../clock/clock.component';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css'],
  providers:[ClockComponent]
})
export class GeneratorComponent implements OnInit {
  headers: number[] = [];
  userChar: string ='';
  generate$ = this.codeService.generate$;
  currentCodeMatrix$ = this.codeService.currentCodeMatrix$;
  currentCodeMatrix: CodeMatrix | null = null;

  constructor(public clock: ClockComponent, private codeService: CodeService) {

   }

  ngOnInit() {
    //gets size of matrix for headers
    this.headers= this.getHeaders(this.codeService.getMaxMatrixSize());
    //gets the matrix and code
    this.currentCodeMatrix$.subscribe(currentCodeMatrix => this.currentCodeMatrix = currentCodeMatrix);
    
  }

  getHeaders(maxNumber: number){
    let headerArray=[];
    for(let i=0; i<maxNumber; i++){
      headerArray.push(i);
    }
    return headerArray;

  }

  onToggleGenerator(){
    this.codeService.setGenerator(!this.generate$.value)

  }

  onCharInput(e: any){
    this.codeService.setUserChar(e.key);
  }

}
