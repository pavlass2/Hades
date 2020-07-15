import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor(
    private cookie: CookieService
  ) { }

  joinButton: string;
  createButton: string;
  activeRoom: string;
  isActive: boolean = false;
  nameRoom: string;

  ngOnInit(): void {
    this.joinButton = "Připojit do skupiny";
    this.createButton = "Vytvořit skupinu";

    this.overCookies();
  }

  overCookies(){
    if(this.cookie.check("groupNameCookie") && this.cookie.check("userId") && this.cookie.check("userNameCookie")){
      this.nameRoom = this.cookie.get("groupNameCookie");
      this.isActive = true;

    }
    console.log(this.cookie.getAll());
  }
}
