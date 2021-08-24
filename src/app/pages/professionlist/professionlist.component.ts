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
professionData;
professionAllData;
searchTerm:any='';
filterTerms=[];
filterTermss=[];
  constructor(private auth: AuthService,
              private user: UserService,
              private modalCtrl: ModalController) { }
             
  ngOnInit() {
    this.getProfessionListData();
  }

  getProfessionListData(){
    this.user.present('');
    this.auth.getProfessionList().subscribe(res=>{
      this.professionData=res;
      this.professionAllData=this.professionData.profession;
        for (let i = 0; i < this.professionAllData.length; i++) {
        this.filterTerms[i] = [{
          "id": this.professionAllData[i].id,
          "name": this.professionAllData[i].name,
        }]
      }
      this.user.dismiss();
      console.log(this.professionAllData);
    },err=>{
      this.user.dismiss();
    })
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

  filterItem() {
    this.filterTerms = [];
    this.filterTermss = this.professionAllData.filter(item => item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
    // console.log(this.filterTermss.length);
    // console.log(this.filterTermss);
    for (let i = 0; i < this.filterTermss.length; i++) {
      this.filterTerms[i] = [{
        "id": this.filterTermss[i].id,
        "name": this.filterTermss[i].name,
      }]
    }
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
}
