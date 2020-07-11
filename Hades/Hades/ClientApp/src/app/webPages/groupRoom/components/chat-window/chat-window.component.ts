import { Component, NgZone, OnInit  } from '@angular/core';  
import { Message } from '../../../../core/models/chatModel';  
import { ChatService } from '../../../../core/signalR/chat.service';  
import { MessageStorageService } from 'src/app/core/services/messageArray/message-storage.service';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit{

  messages = new Array<Message>();  
  message = new Message();  
  refreshIntervalId;
  container: HTMLElement; 


  constructor(
    private chatService: ChatService,  
    private _ngZone: NgZone,
    private messageAry: MessageStorageService
  ) {
    this.subscribeToEvents();

    this.message.nickName = "nickName odesílatele";
    this.message.message = " RANDOM TEST přijaté zprávy";
    this.message.type = "recieved";
    this.message.date = Date();
    this.messages.push(this.message);

    this.message = new Message();
    this.message.nickName = "TESTasdad";
    this.message.message = " RANDOM TEST odeslaná zpráva!!";
    this.message.type = "sent";
    this.message.date = Date();
    this.messages.push(this.message);

    console.log(this.messages);

  }

  ngOnInit(){
    // this.refreshIntervalId = setInterval(data => {
    //     this.messages = this.messageAry.get();
    //   }, 1000);
  }

  private subscribeToEvents(): void {  
    this.chatService.messageReceived.subscribe((message: Message) => {  
      this._ngZone.run(() => {  
          message.type = "received";  
          message.date = Date();
          this.messages = this.messageAry.write(message);
      });  
    });  
  }  

  ngOnDestroy(){
    clearInterval(this.refreshIntervalId);
  }
}
