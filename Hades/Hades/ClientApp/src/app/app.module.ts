import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { DashboardModule } from './webPages/dashboard/dashboard.module';

 
import { ToastrModule } from 'ngx-toastr';
import { GroupRoomModule } from './webPages/groupRoom/group-room.module';

import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),  // ToastrModule added
    GroupRoomModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
