import { Component, OnInit } from '@angular/core';
import { BackendcallService } from '../../../../core/httpsCalls/backendcall.service'
import { Title } from '@angular/platform-browser';
import { ToastrServiceService } from "../../../../core/notifications/toastr-service.service"

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  //text
  user = "Uživatelské jméno: ";
  group = "Jméno skupiny: ";
  description = "Popisek: ";
  newGroupTitle = "Hades - nová skupina";
  send = "Odeslat";


  inputField = {
    userName: "",
    groupName: "",
    groupDescription: ""
  };


  constructor(
    private backendCall: BackendcallService,
    private title: Title,
    private toastr: ToastrServiceService
  ) { }

  ngOnInit(): void {
    this.title.setTitle(this.newGroupTitle);
  }



  onSubmit(){
    this.toastr.showSuccess();
    console.log(this.inputField);
    this.backendCall.createGroup(this.inputField.userName, this.inputField.groupName, this.inputField.groupDescription).subscribe( res => {
      console.log(res)
    },
    (error) => {
      console.log(error);
    });
  }

}
