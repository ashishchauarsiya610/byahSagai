import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: 2,
    slidesPerView: 2.8,
    centeredSlide:true,
    // slidesPerColumn: 1,
  };
  constructor(private auth: AuthService,
    private user: UserService,
    private navCtrl: NavController,
    public modalCtrl: ModalController) { 
  //  let tkn= localStorage.getItem('token');
  //  console.log('match_page:'+ tkn)
  }

  ngOnInit() {}
  myProfile(){
    this.navCtrl.navigateRoot('/myProfile');
  }
}
