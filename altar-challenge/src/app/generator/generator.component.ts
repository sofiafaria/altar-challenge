import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClockComponent } from '../clock/clock.component';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css'],
  providers: [ClockComponent]
})
export class GeneratorComponent implements OnInit {

  RANDOM_CHARS: string = 'abcdefghijklmnopqrstuvwxyz';
  MAX_SIZE: number = 10;
  WEIGHT: number = 0.2;
  TIMEOUT: number = 4000;
  cells: any[]=[] ;
  headers: number[] = [];
  charForm = new FormGroup({
    userChar: new FormControl('')
  });
  code: string ='';

  constructor(private clock: ClockComponent) {

   }

  async ngOnInit() {

    this.headers= this.getHeaders(this.MAX_SIZE);
    await this.generate2DGrid();
    
  }

  getRandomChar(){
    const result = this.RANDOM_CHARS.charAt(Math.floor(Math.random() * this.RANDOM_CHARS.length));
    return result;
  }

  getHeaders(maxNumber: number){
    let headerArray=[];
    for(let i=0; i<maxNumber; i++){
      headerArray.push(i);
    }
    return headerArray;

  }

  async generate2DGrid(){
    //reset cells array
    this.cells = [];

    for(let i=0; i<this.MAX_SIZE; i++){
      let cellRow=[];
      for(let j=0; j<this.MAX_SIZE; j++){
        let cell = this.getRandomChar();
        cellRow.push(cell);
      }
      this.cells.push(cellRow);
    }

    //optional user Input
    let userCharacter = this.charForm.value.userChar;
    if(userCharacter){
      if(this.RANDOM_CHARS.includes(userCharacter.toLowerCase())){

        //calculate weight
        const countWeigthedCells = Math.floor(this.WEIGHT * this.MAX_SIZE * this.MAX_SIZE);

        //randomly choose values to change to user input's value
        for(let countChanges = 1 ; countChanges<= countWeigthedCells; countChanges++){
          let randomRow = Math.floor(Math.random() * 10);
          let randomColumn = Math.floor(Math.random() * 10);
          this.cells[randomRow][randomColumn] = userCharacter.toLowerCase(); 
        }

      }
      

    }

    this.setCode();
  }

  setCode(){
    const seconds: string = this.clock.getSeconds();
    if(seconds){
      const secretPosition = [parseInt(seconds.charAt(0)), parseInt(seconds.charAt(1))]; 
      const [secretCharLeft, secretCharRight] =[ this.cells[secretPosition[0]][secretPosition[1]], this.cells[secretPosition[1]][secretPosition[0]]];

      const codeLeft = this.convertArrayIntoCode(secretCharLeft);
      const codeRight = this.convertArrayIntoCode(secretCharRight);

      this.code = `${codeLeft}${codeRight}`;
    }

  }

  convertArrayIntoCode(secretChar: string){
    const secretCharArray = this.cells.map((array: string[]) => array.map((value: string) => value === secretChar ? 1 : 0));

    const secretCharSumArray = secretCharArray.map((array: number[]) => {
      const sum = array.reduce( (acc, curr ) => acc + curr, 0);
      return sum;
     });

     let code = secretCharSumArray.reduce((acc, curr ) => acc + curr, 0);

     if(code>9){
       for(let divisor = 2; divisor<=9; divisor++ ){
         let divCode = Math.round(code/divisor);
         if(divCode <=9){
           return divCode;
         }
       }
     }

     return code;

  }

}
