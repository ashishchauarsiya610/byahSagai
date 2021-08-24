import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DegreelistComponent } from './pages/degreelist/degreelist.component';
import { ForgetpassComponent } from './pages/forgetpass/forgetpass.component';
import { LoginComponent } from './pages/login/login.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { MatchesnewComponent } from './pages/matchesnew/matchesnew.component';
import { MatchesviewmeComponent } from './pages/matchesviewme/matchesviewme.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { PreferencelistComponent } from './pages/preferencelist/preferencelist.component';
import { ProfessionlistComponent } from './pages/professionlist/professionlist.component';
import { PublicprofileComponent } from './pages/publicprofile/publicprofile.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchlistComponent } from './pages/searchlist/searchlist.component';
import { UpdatebasicinfoComponent } from './pages/updatebasicinfo/updatebasicinfo.component';
import { UpdatecontactComponent } from './pages/updatecontact/updatecontact.component';
import { UpdateeducationComponent } from './pages/updateeducation/updateeducation.component';
import { UpdatepreferenceComponent } from './pages/updatepreference/updatepreference.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'matches',
    pathMatch: 'full'
  },
  {
    path: "search",
    component: SearchlistComponent
  },
  {
    path: "myProfile",
    component: MyprofileComponent
  },
  // {
  //   path:"matches/myProfile",
  //   component: MyprofileComponent
  // },
  {
    path: "matches/publicProfile",
    component: PublicprofileComponent
  },
  {
    path: "publicProfile",
    component: PublicprofileComponent
  },
  {
    path: "myProfile/publicProfile",
    component: PublicprofileComponent
  },
  {
    path: "mainpage",
    component: MainpageComponent
  },
  {
    path: "matches",
    component: MatchesComponent
  },
  {
    path: "myProfile/matches",
    component: MatchesComponent
  },
  // matches
  {
    path: "matchesnew",
    component: MatchesnewComponent
  },
  {
    path: "matchesviewme",
    component: MatchesviewmeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "forgetpass",
    component: ForgetpassComponent
  },
  {
    path: "updatebasic",
    component: UpdatebasicinfoComponent
  },
  {
    path: "updateeducation",
    component: UpdateeducationComponent
  },
  {
    path: "updatecontact",
    component: UpdatecontactComponent
  },
  {
    path: "degreelist",
    component: DegreelistComponent
  },
  {
    path: "professionlist",
    component: ProfessionlistComponent
  },
  {
    path: "preferencelist",
    component: PreferencelistComponent
  },
  {
    path: "updatepreference",
    component: UpdatepreferenceComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
