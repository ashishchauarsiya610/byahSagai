import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController) {}
  registerClick(){
 console.log('register click...');
 this.navCtrl.navigateRoot('/register');

  }
loginClick(){
  console.log("login click...");
  this.navCtrl.navigateRoot('/login')
}
}
