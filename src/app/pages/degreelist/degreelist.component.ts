import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UpdateeducationComponent } from '../updateeducation/updateeducation.component';

@Component({
  selector: 'app-degreelist',
  templateUrl: './degreelist.component.html',
  styleUrls: ['./degreelist.component.scss'],
})
export class DegreelistComponent implements OnInit {
degreeList;
collageList;
searchTerm:any='';
searchTermdegree:any='';
filterTerms=[];
filterTermCollegeList=[];
filterTermDegreeList=[];
filterTermss=[];
degree1;
c_list;

  constructor(private auth: AuthService,
              private user: UserService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
            }

 

 

 async collegeClick(c_name,c_id){
     localStorage.setItem('college_name',c_name);
     localStorage.setItem('college_id',c_id);
    const modal= await this.modalCtrl.create({
      component: UpdateeducationComponent,
      componentProps:{college_id:c_id,
                      college_name:c_name
      }  
    })
    return await modal.present();      
  }
 async degreeClick(d_name,d_id){
  localStorage.setItem('degree_name',d_name);
  localStorage.setItem('degree_id',d_id);
    const modal= await this.modalCtrl.create({
      component: UpdateeducationComponent,
      componentProps:{degree_id:d_id,
                      degree_name:d_name
      }  
    })
    return await modal.present();   
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }
}
