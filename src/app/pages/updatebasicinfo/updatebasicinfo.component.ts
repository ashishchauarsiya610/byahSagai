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
dob;
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
              // this.getComunityData();
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
    console.log(this.dob);
    let body={
      id: localStorage.getItem('user_id'),
      first_name: this.first_name,
      last_name : this.last_name,
      profile_for: this.profile_for,
      contact_address: this.contact_address,
      native_address: this.native_address,
      dob: this.dob,
      height: this.total_minHeight,
      religion: this.selectedReligionId,
      place_of_birth: this.place_of_birth,
      marital_status: this.m_status,
      diet_reference:this.selectedDiet,
      mother_tongue:this.motherTongueSelect,
      gender: this.gender,
      country:this.countryId,
      state: this.stateId,
      city: this.cityId,
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
      this.user.stateget(this.countryId);
  this.statecondition=true;
  }

  stateId;
  stateSelect(sid,sname){
    this.stateId=sid;
    this.state=sname;
   this.statecondition=false;
    console.log(this.stateId  +"" + this.state);
  }
  cityShow(){
    this.user.cityget(this.stateId);
    this.citycondition=true;
  }
cityId;
  citySelect(cityId,cityName){
    this.city=cityName;
    this.cityId=cityId;
    this.citycondition=false;
  }
  religioncard=false;
  religionShow() {
    this.user.religionData();
  this.religioncard=true;
  }
  selectedReligion;
  selectedReligionId;
  selectReligion(e){
    console.log(e.currentTarget.value);
    this.selectedReligion=e.currentTarget.value.name;
    this.selectedReligionId=e.currentTarget.value.id;
    this.religioncard=false;
  }
  dietcard=false;
  dietShow() {
  this.dietcard=true;
  }
  selectedDiet;
  selectDiet(e){
    console.log(e.currentTarget.value);
    this.selectedDiet=e.currentTarget.value.diet;
    this.dietcard=false;
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
  gender;
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
minheightcard = false;
minHeightShow() {
  this.minheightcard = true;
  this.user.heightAll();
}
selectedMinHeight;
selectMinHeightCm;
selectedMinHeightId;
total_minHeight;
selectMinHeight(e) {
  console.log(e.currentTarget.value);
  this.selectedMinHeight = e.currentTarget.value.ft.split(" ")[0];
  this.selectMinHeightCm=e.currentTarget.value.cm;
  this.selectedMinHeightId = e.currentTarget.value.id;
  this.total_minHeight=this.selectedMinHeight+"-"+this.selectMinHeightCm;
  console.log(this.total_minHeight)
  this.minheightcard = false;
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
 
 


  


}
