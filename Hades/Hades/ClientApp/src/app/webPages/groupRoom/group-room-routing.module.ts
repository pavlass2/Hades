import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkingSpaceComponent } from './components/working-space/working-space.component';


const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoomRoutingModule { }
