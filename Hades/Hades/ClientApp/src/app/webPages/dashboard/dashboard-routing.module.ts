import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { JoinGroupComponent } from './components/join-group/join-group.component';
import { UserNameComponent } from './components/user-name/user-name.component';
import { MainRoomComponent } from '../groupRoom/components/main-room/main-room.component';


const routes: Routes = [
  { path: "main", component:  MainMenuComponent},
  { path: "main/createGroup", component:  CreateGroupComponent},
  { path: "main/joinGroup", component:  JoinGroupComponent},
  { path: "main/userName", component:  UserNameComponent},
  { path: "mainRoom", component: MainRoomComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
