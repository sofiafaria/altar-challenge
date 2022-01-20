import { Component, Input, OnInit } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap'; 
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { CodeService } from 'src/app/services/code.service';

@Component({
  selector: 'app-matrix-popover',
  templateUrl: './matrix-popover.component.html',
  styleUrls: ['./matrix-popover.component.css']
})
export class MatrixPopoverComponent implements OnInit {

  @Input() matrix: string[][] = [];
  headers: number[]=[];

  constructor(config: NgbPopoverConfig, private codeService: CodeService) {
    // customize default values of popovers used by this component tree
    config.placement = 'right';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
    this.headers= this.getHeaders(this.codeService.getMaxMatrixSize());
  }

  getHeaders(maxNumber: number){
    let headerArray=[];
    for(let i=0; i<maxNumber; i++){
      headerArray.push(i);
    }
    return headerArray;

  }

}
