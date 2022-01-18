import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  date: string = '';
  currentLocale: any;
  isTwelveHrFormat:boolean = false;

  constructor() { 
    setInterval(() =>{
      const currentDate = new Date();
      this.date = currentDate.toLocaleTimeString();
       }, 1000);
  }

  ngOnInit(): void {
  }

  getSeconds(){
    const [hours, min, sec] = this.date.split(':');
    return sec;
  }

}
