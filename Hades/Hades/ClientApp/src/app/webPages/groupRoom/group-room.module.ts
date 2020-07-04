import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoomRoutingModule } from './group-room-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainRoomComponent } from './components/main-room/main-room.component';
import { WorkingSpaceComponent } from './components/working-space/working-space.component';


@NgModule({
  declarations: [
    MainRoomComponent, 
    NavbarComponent, 
    FooterComponent, WorkingSpaceComponent
  ],
  imports: [
    CommonModule,
    GroupRoomRoutingModule
  ]
})
export class GroupRoomModule { }
