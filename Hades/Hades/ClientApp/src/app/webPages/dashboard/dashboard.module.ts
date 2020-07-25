import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { JoinGroupComponent } from './components/join-group/join-group.component';
import { UserNameComponent } from './components/user-name/user-name.component';
import { LanguageOptionsComponent } from './components/language-options/language-options.component';



@NgModule({
  declarations: [
  MainMenuComponent,
  CreateGroupComponent,
  JoinGroupComponent,
  UserNameComponent,
  LanguageOptionsComponent
],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
