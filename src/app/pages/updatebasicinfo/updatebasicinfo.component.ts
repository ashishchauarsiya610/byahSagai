import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-updatebasicinfo',
  templateUrl: './updatebasicinfo.component.html',
  styleUrls: ['./updatebasicinfo.component.scss'],
})
export class UpdatebasicinfoComponent implements OnInit {
@Input() first_name:any;
@Input() last_name:any;
@Input() height:any;
@Input() place_of_birth:any;
@Input() contact_address:any;
@Input() native_address:any;
@Input() profile_image:any;
@Input() profile_for:any;
dType;
countrycondition=false;
statecondition=false;
citycondition=false;
 filterTermCountry=[];
 filterTermState=[];
  filterTermCity=[];
 filterTermss=[];
  constructor(private auth: AuthService,
              private user: UserService,
              private viewCtrl: ModalController) { 
                console.log(this.first_name);
              this.getComunityData();
              }

  ngOnInit() {}

  dismiss(){
this.viewCtrl.dismiss();
  }
  checkChecked(e) {
    this.dType = e.currentTarget.value;
    console.log('type' + this.dType)
  }
  success;
  updateBasic(){
    console.log(this.first_name);
    console.log(this.last_name);
    console.log(this.height);
    console.log(this.place_of_birth);
    console.log(this.contact_address);
    console.log(this.native_address);
    let body={
      id:'12',
      first_name: this.first_name,
      last_name : this.last_name,
      profile_for: this.profile_for,
      contact_address: this.contact_address,
      native_address: this.native_address,
      place_of_birth: this.place_of_birth
    }
    this.user.present('')
  this.auth.updateBasicInfo(body).subscribe(res=>{
    this.user.dismiss();
    this.dismiss();
    this.success=res;
   console.log(this.success.message);
  },err=>{
    this.dismiss();
    this.user.dismiss();
    console.log(err.error.message);
  })
  }
  countryShow(){
      this.user.countryget();
  this.countrycondition=true;
  }
  countryData;
  stateData;
  cityData;
  country;
  state;
  city;

  countryId;
  countrySelect(cid,cname){
    console.log(cid+""+ cname);
    this.country=cname;
    this.countryId=cid;
    this.countrycondition=false;
  }

  stateShow(){
      this.stateget(this.countryId);
  this.statecondition=true;
  }
  stateget(id){
    this.auth.getState(id).subscribe(state=>{
      console.log(state);
     this.stateData=state.state;
         for (let i = 0; i < this.stateData.length; i++) {
        this.filterTermState[i] = [{
          "id": this.stateData[i].id,
          "name": this.stateData[i].name,
        }]
      }
    },err=>{
      console.log(err.error.message);
    })
  }
  stateId;
  stateSelect(sid,sname){
    this.stateId=sid;
    this.state=sname;
   this.statecondition=false;
    console.log(this.stateId  +"" + this.state);
  }
  cityShow(){
    this.cityget(this.stateId);
    this.citycondition=true;
  }
  cityget(id){
    this.user.present('loading..');
    this.auth.getCity(id).subscribe(city1=>{
      this.user.dismiss();
      this.cityData=city1.city;
         for (let i = 0; i < this.cityData.length; i++) {
        this.filterTermCity[i] = [{
          "id": this.cityData[i].id,
          "name": this.cityData[i].name,
        }]
      }
      console.log(city1);
    },err=>{
      this.user.dismiss();
      console.log(err.error.message);
    })
  }
  citySelect(cityId,cityName){
    this.city=cityName;
    this.citycondition=false;
  }
religionData;
  getReligionData(){
    this.auth.getReligion().subscribe(rel=>{
      console.log(rel);
      this.religionData=rel.religion;
    },err=>{
      console.log(err.error.message);
    })
  }
  religionSelect;
  motherTongueSelect;
  religionChecked(event){
    this.religionSelect=event.currentTarget.value;
    console.log(event.currentTarget.value);
  }
  motherToungueChecked(mt){
 this.motherTongueSelect=mt.currentTarget.value;
 console.log(this.motherTongueSelect);
  }

  getComunityData(){
    this.auth.getComunity().subscribe(comunity=>{
      console.log(comunity)
    },err=>{
      console.log(err.error.message);
    })
  }
  gender:any="M";
genderChecked(e){
  this.gender = e.currentTarget.value;
  if(this.gender==undefined){
    console.log('please select gender..')
  }
  else{
    console.log(this.gender)
  }
  
}
m_status;
maritalChecked(event){
this.m_status=event.currentTarget.value;
if(this.m_status==undefined){
  console.log('not selected..');
}else{
  console.log(this.m_status)
}
}
  motherTongue: any[]=[
    {
      id:1,
      name:'Hindi'
    },
    {
      id:2,
      name:'Punjabi'
      },
    {
      id:3,
      name:'Marathi'
      },
    {
      id:4,
      name:'Telagu'
      },
    {
      id:5,
      name:'Urdu'
      },
    {
      id:6,
      name:'Tamil'
      },
    {
      id:7,
      name:'English'
      },
    {
      id:8,
      name:'Bhojpuri'
      }
  ]
 
  searchState: any;
  searchCity: any;

     filterState(){
    this.filterTermState = [];
    this.filterTermss = this.stateData.filter(item => item.name.toLowerCase().indexOf(this.searchState.toLowerCase()) > -1);
    console.log(this.filterTermss.length);
    console.log(this.filterTermss);
    for (let i = 0; i < this.filterTermss.length; i++) {
      this.filterTermState[i] = [{
          'id': this.filterTermss[i].id,
          'name': this.filterTermss[i].name
      }]
    }
  }
     filterCity(){
    this.filterTermCity = [];
    this.filterTermss = this.cityData.filter(item => item.name.toLowerCase().indexOf(this.searchCity.toLowerCase()) > -1);
    // console.log(this.filterTermss.length);
    // console.log(this.filterTermss);
    for (let i = 0; i < this.filterTermss.length; i++) {
      this.filterTermCity[i] = [{
          'id': this.filterTermss[i].id,
          'name': this.filterTermss[i].name
      }]
    }
  }


}
