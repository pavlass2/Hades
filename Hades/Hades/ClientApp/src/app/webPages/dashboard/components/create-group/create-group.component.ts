import { Component, OnInit } from '@angular/core';
import { BackendcallService } from '../../../../core/httpsCalls/backendcall.service'
import { Title } from '@angular/platform-browser';
import { ToastrServiceService } from "../../../../core/notifications/toastr-service.service"
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  //text
  user = "Uživatelské jméno: ";
  group = "Jméno skupiny: ";
  description = "Popisek: ";
  newGroupTitle = "Hades - nová skupina";
  send = "Odeslat";


  inputField = {
    userName: "",
    groupName: "",
    groupDescription: ""
  };


  constructor(
    private backendCall: BackendcallService,
    private title: Title,
    private toastr: ToastrServiceService,
    private router: Router,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.title.setTitle(this.newGroupTitle);
  }



  onSubmit(){
    console.log(this.inputField);
    this.backendCall.createGroup(this.inputField.userName, this.inputField.groupName, this.inputField.groupDescription).subscribe( res => {
      if(res.result){
        this.toastr.showSuccess("Skupina vytvořena!", "Nyní můžete využívat všechny možnosti!");
        this.cookie.set("userNameCookie", this.inputField.userName);
        this.cookie.set("groupNameCookie", this.inputField.groupName);
        this.cookie.delete("userId");
        this.cookie.set("userId", res.userId);
        this.router.navigate(['mainRoom']);
      }else{
        this.toastr.showError("Chyba!", res.message);
      }
    },
    (error) => {
      console.log(error);
      this.toastr.showError("An error!", "Be kind and try again later!");
    });
  }

}
