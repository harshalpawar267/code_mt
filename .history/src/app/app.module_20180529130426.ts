import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UserInfoService } from './user-info.service';
import { AppComponent } from './app.component';
import { OrderByPipe } from './share/user.pipe';
import { FilterData } from './share/username.pipe';
import { AvatarModule } from 'ngx-avatar';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'app', component: AppComponent}
];
 

@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe,
    FilterData
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AvatarModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    OrderByPipe,
    FilterData
  ],
  providers: [UserInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
