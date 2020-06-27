import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './components/test/test.component';


const routes: Routes = [
  { path: "dashboard", component: TestComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full', }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
