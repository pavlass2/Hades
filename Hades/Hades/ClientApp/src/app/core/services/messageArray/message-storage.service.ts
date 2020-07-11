import { Injectable } from '@angular/core';
import { Message } from '../../models/chatModel';

@Injectable({
  providedIn: 'root'
})
export class MessageStorageService {

  constructor() { }

  messages = new Array<Message>();  

  get(){
    return this.messages;
  }

  write(message: Message){
    this.messages.push(message);
    return this.messages;
  }
}
