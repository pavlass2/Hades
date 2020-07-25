import { Component, OnInit, NgZone } from '@angular/core';
import { BackendcallService } from 'src/app/core/httpsCalls/backendcall.service';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from 'src/app/core/signalR/chat.service';
import { NewUser } from "../../../../core/models/newUser";

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userListName: any;
  randomVals: any;
  show = false;
  color: boolean = true;
  numberOfUsers: number = -1;

  constructor(
    private backendcall: BackendcallService,
    private cookie: CookieService,
    private chatService: ChatService,
    private _ngZone: NgZone
  ) {
    this.subscribeToUserConnection();
  }

  ngOnInit(): void {

    this.getData(this.color);
    //setInterval(data => {
    //  this.getData(this.color);
    //}, 1000);
    

  }

  private subscribeToUserConnection(): void {  
    console.log("USER?")
    this.chatService.newUserConnected.subscribe((connUser: NewUser) => {  
      console.log(connUser.value.userName);
      this._ngZone.run(() => {  
        this.color = true;
        this.getData(this.color);
      });  
    }, error => {
      console.log(error);
    });  
  }  

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomClass(){
    return ( "gd-" + this.randomIntFromInterval(1,10));
  }

  getData(color){
    this.backendcall.getListOfUsers(this.cookie.get("groupNameCookie")).subscribe( users => {
      this.userListName = JSON.parse(users);
      

      if(!color && this.numberOfUsers < this.userListName.length){
        this.color = true;
      }
    
      if(color){
        this.numberOfUsers = this.userListName.length;
        this.randomVals = Array.apply(null, Array(this.userListName.length)).map(String.prototype.valueOf, "");
        for (let index = 0; index < this.userListName.length; index++) {
          this.randomVals[index] = this.getRandomClass();
        }
        this.color = false;
      }
      
    })
  }

}
