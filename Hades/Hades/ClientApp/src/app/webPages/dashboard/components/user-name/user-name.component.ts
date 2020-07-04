import { Component, OnInit } from '@angular/core';
import { BackendcallService } from 'src/app/core/httpsCalls/backendcall.service';
import { Title } from '@angular/platform-browser';
import { ToastrServiceService } from 'src/app/core/notifications/toastr-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.scss']
})
export class UserNameComponent implements OnInit {

  inputText = "Zadej jméno: ";  
  userName: string;
  send = "Vstoupit";
  titleVar = "Hades - nastav jméno";

  constructor(
    private backendCall: BackendcallService,
    private title: Title,
    private toust: ToastrServiceService,
    private cookie: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.title.setTitle(this.titleVar);
  }

  onSubmit(){
    console.log(this.userName);

    //tohle pak půdje co backendCallu
    
    if(this.cookie.check("groupNameCookie")){
      var groupName = this.cookie.get("groupNameCookie");
    }
    this.cookie.set("userNameCookie", this.userName);

    this.toust.showSuccess();
    this.backendCall.setUserName(this.userName, groupName).subscribe(res => {
      console.log(res);
      this.cookie.set("userNameCookie", this.userName);

      this.router.navigate(['mainRoom']);
    },
    (error) => {
      console.log(error);
    });

  }

}
