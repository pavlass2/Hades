import { Injectable } from '@angular/core';
import { apiUrl } from '../models/url';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserModel } from '../models/userModel';
import { HttpHeaders } from '@angular/common/http';
import { DeleteModel } from '../models/deleteModel';

@Injectable({
  providedIn: 'root'
})
export class BackendcallService {

  constructor(
    private httpClient: HttpClient,
  ) { }



  createGroup(userName: string, groupName: string , groupDescription: string){
    return this.httpClient.post<UserModel>(apiUrl + '/api/Group/CreateGroup', {userName, groupName , groupDescription});
  }

  joinGroup(groupName: string){
    return this.httpClient.post<UserModel>(apiUrl + '/api/Group/IsGroupNameValid', {groupName});
  }

  setUserName(userName: string, groupName: string){
    return this.httpClient.post<UserModel>(apiUrl + '/api/Group/AddStudentToGroup', {userName, groupName});
  }

  getListOfUsers(groupName: string){
    return this.httpClient.post<any>(apiUrl + '/api/Group/GetGroupMembers', {groupName});
  }

  getMessagesHistory(groupName: string){
    return this.httpClient.post<any>(apiUrl + '/api/Group/GetGroupMessages', {groupName});
  }

  deteleUser(userId: string, groupName: string){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        userId: userId,
        groupName: groupName
      }
    }
  
    return this.httpClient.delete<DeleteModel>(apiUrl + '/api/Group/DeleteUser', options);
  }

  deteleGroup(groupName: string){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        groupName: groupName
      }
    }
  
    return this.httpClient.delete<DeleteModel>(apiUrl + '/api/Group/DeleteGroup', options);
  }

}
