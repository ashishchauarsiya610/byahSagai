import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UpdateeducationComponent } from '../updateeducation/updateeducation.component';

@Component({
  selector: 'app-professionlist',
  templateUrl: './professionlist.component.html',
  styleUrls: ['./professionlist.component.scss'],
})
export class ProfessionlistComponent implements OnInit {

  constructor(private auth: AuthService,
              private user: UserService,
              private modalCtrl: ModalController) { }
             
  ngOnInit() {
    this.user.getProfessionListData();
  }

 

  async professionClick(pro_name,pro_id){
    console.log(pro_name);
    console.log(pro_id);
    const modal= await this.modalCtrl.create({
      component: UpdateeducationComponent,
      componentProps:{ profession_id:pro_id,
                      profession_name:pro_name
      }  
    })
    return await modal.present();   
  }


  dismiss(){
    this.modalCtrl.dismiss();
  }
}
