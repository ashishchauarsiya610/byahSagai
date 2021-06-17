import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { PublicprofileComponent } from './pages/publicprofile/publicprofile.component';
import { SearchlistComponent } from './pages/searchlist/searchlist.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
      path:"search",
      component: SearchlistComponent
  },
  {
    path:"myProfile",
    component: MyprofileComponent
},
{
  path:"publicProfile",
  component: PublicprofileComponent
},
{
  path:"mainpage",
  component: MainpageComponent
},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
