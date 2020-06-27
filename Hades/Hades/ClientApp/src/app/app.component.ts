import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hades';
  constructor(
    private router: Router,
  ) {}

  routeToDashboard(){
    this.router.navigate(['dashboard']);
  }

}
