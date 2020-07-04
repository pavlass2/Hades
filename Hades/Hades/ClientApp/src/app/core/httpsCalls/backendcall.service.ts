import { Injectable } from '@angular/core';
import { apiUrl } from '../models/url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendcallService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  createGroup(userName: string, groupName: string , groupDescription: string){
    return this.httpClient.post(apiUrl + '/api/Group/CreateGroup', {userName, groupName , groupDescription})
  }

  joinGroup(groupName: string){
    return this.httpClient.post(apiUrl + '/api/Group/JoinGroup', {groupName})
  }

  setUserName(userName: string, groupName: string){
    return this.httpClient.post(apiUrl + '/api/Group/SetUsernameForGroup', {userName, groupName})
  }


}
