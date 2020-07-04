import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  groupText = "Místnost: ";
  userText = "Uživatel:  ";

  groupName: string;
  userName: string;

  constructor(
    private cookie: CookieService
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

}
