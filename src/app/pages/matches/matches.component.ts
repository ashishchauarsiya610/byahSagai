import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
    @ViewChild('slides', {static: true}) slides: IonSlides;
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
//   this.matchedProfileGetData();

  }

  ngOnInit() {}
  matchedProfileGetData(){
    this.user.present('');
this.auth.getMatchedProfile().subscribe(mData=>{
  this.user.dismiss();
  console.log(mData);
},err=>{
    this.user.dismiss();
  console.log(err.error.message)

})
  }
  dailyAllData=[];
  dailyAllData1;
  data;
  slider(event){
      this.slides.getActiveIndex().then((index: number) => {
        // console.log(index);
     
    });
  }
index;;
onSlideTapped(event: any) {
    console.log("tap"+event.target.swiper.clickedIndex);
    this.index=event.clickedIndex;
    if(this.index==0){
        console.log('zero');
    }
    else if(this.index==1){
        console.log('one');
      
    }
    else if(this.index==2){
        console.log('two');
        this.getDailyRec();
    }
    else if(this.index==3){
        console.log('three')
    }
    else if(this.index==4){
        console.log('four')
    }
    else if(this.index==5){
        console.log('five')
    }
    else if(this.index==6){
        console.log('six')
    }
    else if(this.index==7){
        console.log('seven')
    }
  
}
  slider2(ev){
    //   console.log(ev.type)
  }
  initialSlide(i){
    //   console.log("ab"+i.type)
  }
  getDailyRec(){
    this.auth.getDailyRecommended().subscribe(daily=>{
      this.data=daily.data;
      this.dailyAllData1=this.data;
      console.log(this.dailyAllData1.length)
      for(var i=0;i<this.dailyAllData1.length;i++){
    this.dailyAllData.push(this.dailyAllData1[i].user)
      }
    //   console.log(JSON.stringify(this.dailyAllData));
    },err=>{
      console.log(err.error);
    })
  }

  myProfile(){
    this.navCtrl.navigateRoot('/myProfile');
  }

}
