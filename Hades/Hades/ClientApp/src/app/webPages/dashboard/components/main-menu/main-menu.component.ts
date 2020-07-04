import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor() { }

  joinButton: string;
  createButton: string;

  ngOnInit(): void {
    this.joinButton = "Připojit do skupiny";
    this.createButton = "Vytvořit skupinu";
  }

}
