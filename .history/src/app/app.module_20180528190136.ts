import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UserInfoService } from './user-info.service';
import { AppComponent } from './app.component';
import { OrderByPipe } from './share/user';

@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [
    OrderByPipe
],
  providers: [UserInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
