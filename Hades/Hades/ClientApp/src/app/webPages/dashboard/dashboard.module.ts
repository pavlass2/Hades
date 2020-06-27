import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestComponent } from './components/test/test.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
