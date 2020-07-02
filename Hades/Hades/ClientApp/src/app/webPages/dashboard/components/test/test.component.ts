import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { BackendcallService } from '../../../../core/httpsCalls/backendcall.service'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {


  constructor( 
    private titleService: Title,
    private backendcall: BackendcallService
    ) { }

  soucetFrontend :number;
  soucetBackend: number;
  testVar: string;
  
  inputField = {
    input1: 2,
    input2:  1
  };

  ngOnInit(): void {
    this.titleService.setTitle("TEST");
  }

  onSubmit(){
    this.soucetFrontend = this.inputField.input1 + this.inputField.input2;

    this.backendcall.getAdd(this.inputField.input1, this.inputField.input2).subscribe( sum => {
      console.log(sum);
    },
    (error) => {
      console.log(error);
    })

    this.backendcall.testCall().subscribe( res => {
      this.testVar = res;
    },
    (error) => {
      console.log(error);
    })

  }

}


