import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userListName = ["Petr", "Pavel", "Jiří", "Max", "Pavel", "Jiří", "Max", "Pavel", "Jiří", "Max", "Pavel", "Jiří", "Max", "Pavel", "Jiří", "Max", "Pavel", "Jiří", "Max", "Pavel", "Jiří", "Max", "Pavel", "Jiří", "Max"];
  randomVals = Array.apply(null, Array(this.userListName.length)).map(String.prototype.valueOf, "");
  show = false

  constructor() {}

  ngOnInit(): void {
    for (let index = 0; index < this.userListName.length; index++) {
      this.randomVals[index] = this.getRandomClass();
    }
  }

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomClass(){
    return ( "gd-" + this.randomIntFromInterval(1,10));
  }

}
