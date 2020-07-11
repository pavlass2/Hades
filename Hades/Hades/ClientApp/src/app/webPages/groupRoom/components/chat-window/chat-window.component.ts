import { Component, NgZone, OnInit } from '@angular/core';  
import { Message } from '../../../../core/models/chatModel';  
import { ChatService } from '../../../../core/signalR/chat.service';  
import { MessageStorageService } from 'src/app/core/services/messageArray/message-storage.service';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit{

  messages = new Array<Message>();  
  message = new Message();  
  refreshIntervalId;
  mySubscription: any;
  userId: string;



  constructor(
    private chatService: ChatService,  
    private _ngZone: NgZone,
    private messageAry: MessageStorageService,
    private cookie: CookieService
  ) {
    this.subscribeToEvents();
  }

  ngOnInit(){
    this.messages = this.messageAry.get();
    console.log(this.messages);
    this.userId = this.cookie.get("userId");

  }


  private subscribeToEvents(): void {  
    this.chatService.messageReceived.subscribe((message: Message) => {  
      console.log(message);
      this._ngZone.run(() => {  
          if(this.userId == message.value.userId){
            message.type = 'sent';
          }else{
            message.type = 'recieved';
          }
          message.date = Date();
          message.message = message.value.message;
          message.nickName = message.value.nickName;
          this.messages = this.messageAry.write(message);
          console.log(this.messages);

      });  
    }, error => {
      console.log(error);
    });  
  }  



  ngOnDestroy(){
    clearInterval(this.refreshIntervalId);
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
