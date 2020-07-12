import { Component, OnInit } from '@angular/core';
import { BackendcallService } from 'src/app/core/httpsCalls/backendcall.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userListName = ["Petr", "Pavel", "Jiří", "Max", "Pavel", "Jiří", "Max", "Pavel", "Jiří", "Max", "Pavel", "Jiří", "Max", "Pavel", "Jiří", "Max", "Pavel", "Jiří", "Max", "Pavel", "Jiří", "Max", "Pavel", "Jiří", "Max"];
  randomVals = Array.apply(null, Array(this.userListName.length)).map(String.prototype.valueOf, "");
  show = false

  constructor(
    private backendcall: BackendcallService,
    private cookie: CookieService
  ) {}

  ngOnInit(): void {
    
    this.backendcall.getListOfUsers(this.cookie.get("groupNameCookie")).subscribe( users => {
      console.log(users);
    })
    
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
