import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { SearchlistComponent } from './pages/searchlist/searchlist.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { PublicprofileComponent } from './pages/publicprofile/publicprofile.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { MatchesnewComponent } from './pages/matchesnew/matchesnew.component';
import { MatchesviewmeComponent } from './pages/matchesviewme/matchesviewme.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForgetpassComponent } from './pages/forgetpass/forgetpass.component';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { UpdatebasicinfoComponent } from './pages/updatebasicinfo/updatebasicinfo.component';
import { UpdateeducationComponent } from './pages/updateeducation/updateeducation.component';
import { UpdatecontactComponent } from './pages/updatecontact/updatecontact.component';
import { DegreelistComponent } from './pages/degreelist/degreelist.component';
import { Network } from '@ionic-native/network/ngx';
import { ProfessionlistComponent } from './pages/professionlist/professionlist.component';
import { UpdatepreferenceComponent } from './pages/updatepreference/updatepreference.component';
import { PreferencelistComponent } from './pages/preferencelist/preferencelist.component';

@NgModule({
  declarations: [AppComponent,
    MainpageComponent,
    SearchlistComponent,
    MyprofileComponent,
    PublicprofileComponent,
    MatchesComponent,
    MatchesnewComponent,
    MatchesviewmeComponent,
    LoginComponent,
    RegisterComponent,
    ForgetpassComponent,
    UpdatebasicinfoComponent,
    UpdateeducationComponent,
    UpdatecontactComponent,
    DegreelistComponent,
    ProfessionlistComponent,
    PreferencelistComponent,
    UpdatepreferenceComponent
  ],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2TelInputModule,
  ],
  providers: [
            StatusBar,
            SplashScreen,
            Network,
          { 
              provide: RouteReuseStrategy,
              useClass: IonicRouteStrategy 
          },
      NgForm,
      File,
      Camera,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
