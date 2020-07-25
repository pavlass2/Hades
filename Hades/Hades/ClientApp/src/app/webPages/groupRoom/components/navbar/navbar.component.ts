import { Component, OnInit, Testability } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BackendcallService } from 'src/app/core/httpsCalls/backendcall.service';

import { ToastrServiceService } from 'src/app/core/notifications/toastr-service.service';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog.service';
import { exit } from 'process';

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
  intervalId;


  constructor(
    private cookie: CookieService,
    private router: Router,
    private backendcall: BackendcallService,
    private toust: ToastrServiceService,
    private confirmDialogService: ConfirmDialogService
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
    localStorage.removeItem("deleteBoolConfirm");


  }

  closeGroup(){



    this.confirmDialogService.confirmThis("Are you sure to close group?", function () {  
      localStorage.setItem("deleteBoolConfirm", "true");
    }, function () {  
      localStorage.setItem("deleteBoolConfirm", "false");
    }).subscribe(res => {    
    });

    this.intervalId = setInterval(data => {
      if(localStorage.getItem("deleteBoolConfirm") == null){
      }else{
        if(localStorage.getItem("deleteBoolConfirm") == "true"){
          clearInterval(this.intervalId);
          this.closeIt();
          exit;
        }
        
      }
      }, 100);


    
    

  }

  closeIt(){
    
    console.log("ZAVIRAM")
    if(this.cookie.check("founder")){
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
      this.backendcall.deteleUser(this.cookie.get("userId"), this.cookie.get("groupNameCookie")).subscribe( res => {
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

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
