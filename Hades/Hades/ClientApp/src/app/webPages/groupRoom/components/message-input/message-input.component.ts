import { Component, OnInit } from '@angular/core';
import { Message } from '../../../../core/models/chatModel';  
import { ChatService } from '../../../../core/signalR/chat.service';  


@Component({
  selector: 'message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {

  send: string = "Odeslat";
  inputMessage: string;

  txtMessage: string = '';  
  messages = new Array<Message>();  
  message = new Message(); 

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(f){
    console.log(this.inputMessage);
    f.resetForm();
    //this.sendMessage(this.inputMessage);
    
  }

  sendMessage(message, userId, groupName): void {  
    if (this.txtMessage) {  
      this.message = new Message();  
      this.message.message = this.txtMessage;  
      this.messages.push(this.message);  
      this.chatService.sendMessage(this.message);  
      this.txtMessage = '';  
    }  
  }  

}
