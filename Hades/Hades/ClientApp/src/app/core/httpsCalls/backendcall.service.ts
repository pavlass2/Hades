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
    console.log(apiUrl);
    return this.httpClient.post<number>(apiUrl + 'sum/post', {input1, input2});
  }


}
