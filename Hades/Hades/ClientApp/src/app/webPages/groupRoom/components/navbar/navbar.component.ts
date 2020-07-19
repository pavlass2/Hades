import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BackendcallService } from 'src/app/core/httpsCalls/backendcall.service';

import { ToastrServiceService } from 'src/app/core/notifications/toastr-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  groupText = "Místnost: ";
  userText = "Uživatel:  ";
  close = "Odejít";

  groupName: string;
  userName: string;

  constructor(
    private cookie: CookieService,
    private router: Router,
    private backendcall: BackendcallService,
    private toust: ToastrServiceService
  ) { }


  ngOnInit(): void {
    if(this.cookie.check("groupNameCookie")){
      this.groupName = this.groupText + this.cookie.get("groupNameCookie");
    }else{
      this.groupName = this.groupText + "DEFAULT";
    }

    if(this.cookie.check("userNameCookie")){
      this.userName = this.userText + this.cookie.get("userNameCookie");
    }else{
      this.userName = this.userText + "ERROR";
    }


  }

  closeGroup(){
    if(this.cookie.check("founder")){
      console.log(this.cookie.get("groupNameCookie"));
      this.backendcall.deteleGroup(this.cookie.get("groupNameCookie")).subscribe( res => {
        console.log(res);
        if(res.result){
          this.toust.showSuccessDeleteGroup("Success", res.resultText);
          this.cookie.deleteAll();
          this.router.navigate(["/main"]);
        }else{
          this.toust.showError("Error",res.resultText);
        }
  
      }, error => {
        console.log(error);
        this.toust.showError("An error!", "Be kind and try again later!");
      });

    }else{
      this.backendcall.deteleUser(this.cookie.get("userId")).subscribe( res => {
        console.log(res);
        if(res.result){
          this.toust.showSuccess("Success", res.resultText);
          this.cookie.deleteAll();
          this.router.navigate(["/main"]);
        }else{
          this.toust.showError("Error",res.resultText);
        }
  
      }, error => {
        console.log(error);
        this.toust.showError("An error!", "Be kind and try again later!");
      });
    }
    

  }

}
