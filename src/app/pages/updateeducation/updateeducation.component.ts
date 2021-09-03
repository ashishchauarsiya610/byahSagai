import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { DegreelistComponent } from '../degreelist/degreelist.component';
import { ProfessionlistComponent } from '../professionlist/professionlist.component';

@Component({
  selector: 'app-updateeducation',
  templateUrl: './updateeducation.component.html',
  styleUrls: ['./updateeducation.component.scss'],
})
export class UpdateeducationComponent implements OnInit {
@Input() user_id;
@Input() degree_name;
@Input() degree_id;
@Input() college_name;
@Input() college_id;
@Input() profession_name;
@Input() profession_id;
@Input() annual_income;
@Input() employer_name;
@Input() current_working_status;
@Input() total_exp;
  constructor(private auth: AuthService,
    private user: UserService,
    private navCtrl: NavController,
    public modalCtrl: ModalController) { 
      this.user_id=localStorage.getItem('user_id');
    this.degree_name=localStorage.getItem('degree_name');
    this.degree_id=localStorage.getItem('degree_id');
    this.college_name=localStorage.getItem('college_name');
    this.college_id=localStorage.getItem('college_id');  
    this.profession_name=localStorage.getItem('profession_name');
    this.profession_id=localStorage.getItem('profession_id');
    }

  ngOnInit() {  }

 
  onSubmit(data){
    console.log(this.user_id);
    console.log(this.college_name);
    console.log(this.degree_name);
    if( this.user.qualification_check==null){
      console.log('qualification not found..post method call');
      let body={
        user_register_id: this.user_id,
        degree_name: this.degree_id,
        collage_name: this.college_id,
        profession_name: this.profession_id,
        annual_income: this.annual_income,
        employer_name: data.value.employer_name,
        current_working_status: this.current_working_status,
        total_exp: this.total_exp
      }
      if(this.degree_id==undefined || this.degree_id==""){
      console.log('degre')
      }
      else if(this.college_id==undefined || this.college_id==""){
        console.log('college')
      }
      else if(this.profession_id==undefined || this.profession_id==""){
        console.log('profession')
      }
      else if(this.annual_income==undefined || this.annual_income==""){
        console.log('annual')
      }
      else if(this.employer_name==undefined || this.employer_name==""){
        console.log('employer')
      }
      else if(this.current_working_status==undefined || this.current_working_status==""){
        console.log('current status')
      }
      else if(this.total_exp==undefined || this.total_exp==""){
        console.log('exp')
      }
      else{
        this.auth.postCareerInfo(body).subscribe(postData=>{
          console.log(postData);
          this.dismiss();
          },err=>{
            console.log(err.error)
          })
      }
 
    } 
    else{
      console.log('put method called');
      let body={
        user_register_id: this.user_id,
        degree_name: this.degree_id,
        collage_name: this.college_id,
        profesion_name: this.profession_id,
        annual_income: this.annual_income,
        employer_name: data.value.employer_name,
        current_working_status: this.current_working_status,
        total_exp: this.total_exp
      }
      this.auth.updateCareerInfo(body).subscribe(res=>{
        this.dismiss();
        console.log('update:'+ JSON.stringify(res));
      },err=>{
        console.log(err.error.message)
      })
    }
  }

 async degreeSelect(){
  this.user.getDegree();
  this.user.degreelist=true;
  this.user.collegelist=false;
    const modal= await this.modalCtrl.create({
      component: DegreelistComponent,
      componentProps:{
      }  
    })
    return await modal.present();      
  }

  
 async collegeSelect(){
  this.user.getCollage();
   this.user.collegelist=true;
   this.user.degreelist=false;
  const modal= await this.modalCtrl.create({
    component: DegreelistComponent,
    componentProps:{
      
    }  
  })
  return await modal.present();      
}
async  professionSelect(){
  const modal= await this.modalCtrl.create({
    component: ProfessionlistComponent,
    componentProps:{
      
    }  
  })
  return await modal.present();  
}
checkAnnual(e) {
  this.annual_income = e.currentTarget.value;
  console.log('annualIncome:  ' + this.annual_income)
}
workingStatus(w_status){
this.current_working_status=w_status.currentTarget.value;
console.log('work:'+ this.current_working_status);
}
workingExp(exp){
  this.total_exp=exp.currentTarget.value;
  console.log('exp:'+ this.total_exp);
}
  dismiss(){
    this.modalCtrl.dismiss();
  }

}
