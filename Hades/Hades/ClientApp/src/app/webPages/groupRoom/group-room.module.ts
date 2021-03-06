import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoomRoutingModule } from './group-room-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainRoomComponent } from './components/main-room/main-room.component';
import { WorkingSpaceComponent } from './components/working-space/working-space.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { FormsModule } from '@angular/forms';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component'
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog.service';


@NgModule({
  declarations: [
    MainRoomComponent, 
    NavbarComponent, 
    FooterComponent, WorkingSpaceComponent, UserListComponent, MessageInputComponent, ChatWindowComponent, ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    GroupRoomRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers:[  
    ConfirmDialogService  
 ]  
})
export class GroupRoomModule { 
}
