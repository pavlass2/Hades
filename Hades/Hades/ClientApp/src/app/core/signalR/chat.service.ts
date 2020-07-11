import { EventEmitter, Injectable } from '@angular/core';  
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';  
import { Message } from '../models/chatModel'; 
import { apiUrl } from '../models/url';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messageReceived = new EventEmitter<Message>();  
  connectionEstablished = new EventEmitter<Boolean>();  
  
  private connectionIsEstablished = false;  
  private _hubConnection: HubConnection;  
  
  constructor() {  
    this.createConnection();  
    this.registerOnServerEvents();  
    this.startConnection();  
  }  
  
  sendMessage(message: Message) {  
    this._hubConnection.invoke('SendMessage', message);  
  }  
  
  private createConnection() {   
    this._hubConnection = new HubConnectionBuilder()  
      .withUrl(apiUrl + '/ChatHub', {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    }).build();
    console.log("Created!");  

  }  
  
  private startConnection(): void {  
    this._hubConnection  
      .start()  
      .then(() => {  
        this.connectionIsEstablished = true;  
        console.log('Hub connection started');  
        this.connectionEstablished.emit(true);  
      })  
      .catch(err => {  
        console.log('Error while establishing connection, retrying...');  
      });  
  }  
  
  private registerOnServerEvents(): void {  
    this._hubConnection.on('RecieveMessage', (data: any) => {  
      this.messageReceived.emit(data);  
    });  
    console.log("Registered!");
  }  
}
