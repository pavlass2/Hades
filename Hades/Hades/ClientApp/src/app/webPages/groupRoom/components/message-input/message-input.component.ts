import { Component, OnInit } from '@angular/core';
import { Message } from '../../../../core/models/chatModel';  
import { ChatService } from '../../../../core/signalR/chat.service';  
import { CookieService } from 'ngx-cookie-service';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { MessageStorageService } from '../../../../core/services/messageArray/message-storage.service'


@Component({
  selector: 'message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {
  faPaperPlane =faPaperPlane;


  send: string = "Odeslat";
  inputMessage: string;
  userId: string;
  groupName: string;

  txtMessage: string = '';  
  messages = new Array<Message>();  
  message = new Message(); 

  constructor(
    private chatService: ChatService,
    private cookie: CookieService,
    private messageAry: MessageStorageService
  ) { }

  ngOnInit(): void {
    this.userId = this.cookie.get("userId");
    this.groupName = this.cookie.get("groupNameCookie");
  }

  onSubmit(f){
    console.log(this.inputMessage);
    
    this.sendMessageUser(this.inputMessage, this.userId, this.groupName);
    f.resetForm();
  }

  sendMessageUser(messageInput, userId, groupName): void {  
    console.log(messageInput);
    if (messageInput != null) {  
      this.message = new Message();  
      this.message.message = messageInput; 
      this.message.userId = userId;
      this.message.groupName = groupName; 
      this.message.date = Date();
      this.message.type = "sent";
      this.messages = this.messageAry.write(this.message); 
      this.chatService.sendMessage(this.message);   
    }else{
      console.log("Chyba!")
    }  
  }

}
