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
    if(this.cookie.check("groupNameCookie")){
      var groupName = this.cookie.get("groupNameCookie");
    }
    

    this.backendCall.setUserName(this.userName, groupName).subscribe(res => {
      if(res.result){
        this.cookie.delete("userNameCookie");
        this.cookie.set("userNameCookie", this.userName);
        this.cookie.delete("userId");
        this.cookie.set("userId", res.userId);
        this.toust.showSuccess("Vítejte", "Aktuální místnost: " + groupName);
        this.router.navigate(['mainRoom']);
      }else{
        this.toust.showError("An error!", "Be kind and try again laler!");
      }
    },
    (error) => {
      console.log(error);
      this.toust.showError("An error!", "Be kind and try again later!");
    });

  }

}
