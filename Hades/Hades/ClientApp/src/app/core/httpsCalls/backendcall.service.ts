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

  getAdd(input1: number, input2:number){
    console.log(input1);
    console.log(input2);
    return this.httpClient.post<number>(apiUrl + '/api/Sum/Add', {input1, input2});
  }

  testCall(){
    return this.httpClient.get(apiUrl + '/api/Sum/Index', {responseType: 'text'});
  }


}
