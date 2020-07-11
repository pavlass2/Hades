import { Component, NgZone, OnInit } from '@angular/core';  
import { Message } from '../../../../core/models/chatModel';  
import { ChatService } from '../../../../core/signalR/chat.service';  
import { MessageStorageService } from 'src/app/core/services/messageArray/message-storage.service';
import { Router, NavigationEnd } from '@angular/router';

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



  constructor(
    private chatService: ChatService,  
    private _ngZone: NgZone,
    private messageAry: MessageStorageService
  ) {
    this.subscribeToEvents();
  }

  ngOnInit(){
    this.messages = this.messageAry.get();
    console.log(this.messages);
    console.log("init");
  }


  private subscribeToEvents(): void {  
    this.chatService.messageReceived.subscribe((message: Message) => {  
      console.log(message);
      this._ngZone.run(() => {  
          message.type = "received";  
          message.date = Date();
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
