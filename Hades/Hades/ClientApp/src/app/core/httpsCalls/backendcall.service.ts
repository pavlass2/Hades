import { Injectable } from '@angular/core';
import { apiUrl } from '../models/url';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class BackendcallService {

  constructor(
    private httpClient: HttpClient,
  ) { }



  createGroup(userName: string, groupName: string , groupDescription: string){
    return this.httpClient.post<UserModel>(apiUrl + '/api/Group/CreateGroup', {userName, groupName , groupDescription})
  }

  joinGroup(groupName: string){
    return this.httpClient.post<UserModel>(apiUrl + '/api/Group/IsGroupNameValid', {groupName})
  }

  setUserName(userName: string, groupName: string){
    return this.httpClient.post<UserModel>(apiUrl + '/api/Group/AddStudentToGroup', {userName, groupName})
  }

  getListOfUsers(groupName: string){
    return this.httpClient.post(apiUrl + '/api/Group/GetGroupMembers', {groupName})
  }

}
