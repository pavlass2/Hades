import { Component, OnInit } from '@angular/core';
import { BackendcallService } from 'src/app/core/httpsCalls/backendcall.service';
import { Title } from '@angular/platform-browser';
import { ToastrServiceService } from 'src/app/core/notifications/toastr-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
    this.toust.showSuccess();

    //tohle pak půdje do backendCallu
    this.cookie.set("groupNameCookie", this.groupName);
    
    console.log(this.groupName);
    this.backendCall.joinGroup(this.groupName).subscribe(res => {
      console.log(res);


      // pokud to dopadne, přesměruj se na zadání username
      this.router.navigate(["main/userName"]);
    },
    (error) => {
      console.log(error);
    });

  }
}
