import { Component, OnInit } from '@angular/core';
import { BackendcallService } from 'src/app/core/httpsCalls/backendcall.service';
import { Title } from '@angular/platform-browser';
import { ToastrServiceService } from 'src/app/core/notifications/toastr-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.scss']
})
export class JoinGroupComponent implements OnInit {

  inputText = "Zadej název místnosti: ";  
  groupName: string;
  send = "Připojit se";
  titleVar = " Hades - připojit se"

  constructor(
    private backendCall: BackendcallService,
    private title: Title,
    private toust: ToastrServiceService,
    private router: Router,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.title.setTitle(this.titleVar);
  }

  onSubmit(){

    this.backendCall.joinGroup(this.groupName).subscribe(res => {
      if(res.result){
        this.cookie.set("groupNameCookie", this.groupName);
        this.toust.showSuccess("Skupina existuje!", " ");
        this.router.navigate(["main/userName"]);
      }else{
        this.toust.showError("Skupina neexistuje!", "Zadej platný název skupiny");
      }
    },
    (error) => {
      console.log(error);
      this.toust.showError("An error!", "Be kind and try again later!");
    });

  }
}
