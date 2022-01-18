import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  RANDOM_CHARS: string = 'abcdefghijklmnopqrstuvwxyz';
  MAX_SIZE: number = 10;
  WEIGHT: number = 0.2;
  TIMEOUT: number = 4000;
  code: string = '';

  constructor() { 
  }


  getMaxMatrixSize(){
    return this.MAX_SIZE;
  }

  getRandomChar(){
    const result = this.RANDOM_CHARS.charAt(Math.floor(Math.random() * this.RANDOM_CHARS.length));
    return result;
  }

  getRandomCharMatrix(){
    let charMatrix = [];
    for(let i=0; i<this.MAX_SIZE; i++){
      let cellRow=[];
      for(let j=0; j<this.MAX_SIZE; j++){
        let cell = this.getRandomChar();
        cellRow.push(cell);
      }
      charMatrix.push(cellRow);
    }
    return charMatrix;
  }

  setLiveCode(seconds: string, userCharacter? : string){
    
    //set Random Characters Matrix 
    let charMatrix = [];
    for(let i=0; i<this.MAX_SIZE; i++){
      let cellRow =[];
      for(let j=0; j<this.MAX_SIZE; j++){
        let cell = this.getRandomChar();
        cellRow.push(cell);
      }
      charMatrix.push(cellRow);
    }
    if(userCharacter){
      if(this.RANDOM_CHARS.includes(userCharacter)){

        //calculate weight
        const countWeigthedCells = Math.floor(this.WEIGHT * this.MAX_SIZE * this.MAX_SIZE);

        //randomly choose values to change to user input's value
        for(let countChanges = 1 ; countChanges<= countWeigthedCells; countChanges++){
          let randomRow = Math.floor(Math.random() * 10);
          let randomColumn = Math.floor(Math.random() * 10);
          charMatrix[randomRow][randomColumn] = userCharacter.toLowerCase(); 
        }

      }

    }

    if(seconds){
      const secretPosition = [parseInt(seconds.charAt(0)), parseInt(seconds.charAt(1))]; 
      const [secretCharLeft, secretCharRight] =[ charMatrix[secretPosition[0]][secretPosition[1]], charMatrix[secretPosition[1]][secretPosition[0]]];

      const codeLeft = this.convertArrayIntoCode(secretCharLeft, charMatrix);
      const codeRight = this.convertArrayIntoCode(secretCharRight, charMatrix);

      this.code = `${codeLeft}${codeRight}`;

      return { cells: charMatrix ,
               code: this.code};
    }
    this.code = '';
    return { cells: charMatrix ,
      code: this.code};

  }

  convertArrayIntoCode(secretChar: string, cells: any[]){
    const secretCharArray = cells.map((array: string[]) => array.map((value: string) => value === secretChar ? 1 : 0));

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
