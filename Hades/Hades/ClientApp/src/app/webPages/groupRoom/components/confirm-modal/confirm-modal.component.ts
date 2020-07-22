import { Component, Input } from '@angular/core';
import { ConfirmDialogService } from "../../../../core/services/confirm-dialog.service"

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  message: any;  
  constructor(  
      private confirmDialogService: ConfirmDialogService  
  ) { }  

  ngOnInit() {  
      //this function waits for a message from alert service, it gets   
      //triggered when we call this from any other component  
      this.confirmDialogService.getMessage().subscribe(message => {  
          this.message = message;  
      });  
  }  

}
