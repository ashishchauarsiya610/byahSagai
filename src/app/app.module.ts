import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { SearchlistComponent } from './pages/searchlist/searchlist.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { PublicprofileComponent } from './pages/publicprofile/publicprofile.component';

@NgModule({
  declarations: [AppComponent,
                 MainpageComponent,
                SearchlistComponent,
                MyprofileComponent,
                PublicprofileComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
