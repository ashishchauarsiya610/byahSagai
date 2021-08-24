import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AlertController , IonRouterOutlet, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, {static: true}) routeroutlet: IonRouterOutlet;
  constructor(private alertController: AlertController,
              private location: Location,
              private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private router : Router,
              private network: Network) {
               this.initializeApp();
               this.backButtonEvent();
               window.addEventListener('offline',()=>{
                 this.openAlert();
               })
              }
              initializeApp(){
                this.platform.ready().then(()=>{
                this.statusBar.styleDefault();
                this.splashScreen.hide();
                })
              }
              backButtonEvent(){
                this.platform.backButton.subscribeWithPriority(10,()=>{
                  this.router.navigate([''])
                })
              }
             async openAlert(){
            const alert=await this.alertController.create({
              header: 'Check Network Connection',
              message: 'You do not have Internet Connection',
              buttons:[{
                text:'ok',
                handler:()=>{
                  navigator['app'].exitApp();
                }
              }]
            });
            await alert.present();
              }
}
