import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { JoinGroupComponent } from './components/join-group/join-group.component';
import { UserNameComponent } from './components/user-name/user-name.component';
import { MainRoomComponent } from '../groupRoom/components/main-room/main-room.component';
import { InfoSetGuard } from 'src/app/core/guards/info-set.guard';
import { NameSetGuard } from 'src/app/core/guards/name-set.guard';




const routes: Routes = [
  { path: "main", component:  MainMenuComponent},
  { path: "main/createGroup", component:  CreateGroupComponent},
  { path: "main/joinGroup", component:  JoinGroupComponent},
  { path: "main/userName", component:  UserNameComponent, canActivate: [NameSetGuard]},

   
  { path: "mainRoom", component: MainRoomComponent, canActivate: [InfoSetGuard]},
  { path: '',   redirectTo: '/main', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
