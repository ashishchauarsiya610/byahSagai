import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-updatepreference',
  templateUrl: './updatepreference.component.html',
  styleUrls: ['./updatepreference.component.scss'],
})
export class UpdatepreferenceComponent implements OnInit {
@Input() basic_data;
@Input() user_id;
  constructor(private auth:AuthService,
              private user:UserService,
              public modalCtrl: ModalController,
              private navCtrl:NavController,) {
                console.log(this.basic_data)
               }

  ngOnInit() {}


  agecard = false;
  minheightcard = false;
  maxheightcard = false;
  ageGet() {
    this.agecard = true;
    this.user.ageAll();
  }
  minHeightShow() {
    this.minheightcard = true;
    this.user.heightAll();
  }
  maxHeightShow() {
    this.maxheightcard = true;
    this.user.heightAll();
  }
  religioncard=false;
  religionShow() {
    this.user.religionData();
  this.religioncard=true;
  }
  mothercard = false;
  motherShow() {
    this.mothercard = true;
    console.log('mothertongue')
  }
  marriedcard=false;
  marriedShow() {
     this.marriedcard=true;
  }
  dietcard=false;
  dietShow() {
  this.dietcard=true;
  }
  educationcard=false;
  educationShow() {
        this.educationcard=true;
        this.user.getDegree();
  }
  professioncard=false;
  professionShow() {
      this.professioncard=true;
      this.user.getProfessionListData();
  }
  annualcard=false;
  annualShow(){
   this.annualcard=true;
  }
  workingcard=false;
  workingShow(){
      this.workingcard=true;
  }
  countrycard=false;
  countryShow() {
    this.countrycard=true;
    this.user.countryget();
  }
  statecard=false;
  stateShow() {
 this.statecard=true;
      this.user.stateget(this.countryId)
  }
  citycard=false;
  city:any;
  cityId:any;
  cityShow() {
       this.citycard=true;
       this.user.cityget(this.stateId);
  }

  selectedAge;
  selectedAgeId;
  selectAge(e) {
    console.log(e.currentTarget.value);
    this.selectedAge = e.currentTarget.value.val;
    this.selectedAgeId = e.currentTarget.value.id;
    this.agecard = false;
  }
  selectedMinHeight;
  selectedMinHeightId;
  selectMinHeightCm;
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
  selectedMaxHeight;
  selectedMaxHeightId;
  selectMaxHeightCm;
  total_maxHeight;
  selectMaxHeight(e) {
    console.log(e.currentTarget.value);
    this.selectedMaxHeight = e.currentTarget.value.ft.split(" ")[0];
    this.selectMaxHeightCm=e.currentTarget.value.cm;
    this.total_maxHeight=this.selectedMaxHeight+"-"+this.selectMaxHeightCm;
    console.log(this.total_maxHeight)
    this.selectedMaxHeightId = e.currentTarget.value.id;
    this.maxheightcard = false;
  }
  selectedReligion;
  selectedReligionId;
  selectReligion(e){
    console.log(e.currentTarget.value);
    this.selectedReligion=e.currentTarget.value.name;
    this.selectedReligionId=e.currentTarget.value.id;
    this.religioncard=false;
  }
  selectedArrayMother=[];
  selectMotherTongue(e, mt) {
    console.log(e.target.checked);
    if (this.selectedArrayMother.indexOf(mt.name) == -1) {
      this.selectedArrayMother.push(mt.name);
      console.log(this.selectedArrayMother);
    }
    else if (this.selectedArrayMother.indexOf(mt.name) != -1) {
      const index = this.selectedArrayMother.indexOf(mt.name);
      if (index > -1) {
        this.selectedArrayMother.splice(index, 1);
      }
      console.log(this.selectedArrayMother);
    }
  }
  selectedMarried;
  selectMarried(e){
    console.log(e.currentTarget.value);
    this.selectedMarried=e.currentTarget.value.name;
    this.marriedcard=false;
  }
  selectedDiet;
  selectDiet(e){
    console.log(e.currentTarget.value);
    this.selectedDiet=e.currentTarget.value.diet;
    this.dietcard=false;
  }


  selectedArrayDegree=[];
  selectDegree(e, mt) {
    console.log(e.target.checked);
    if (this.selectedArrayDegree.indexOf(mt.id) == -1) {
      this.selectedArrayDegree.push(mt.id);
      console.log(this.selectedArrayDegree);
    }
    else if (this.selectedArrayDegree.indexOf(mt.id) != -1) {
      const index = this.selectedArrayDegree.indexOf(mt.id);
      if (index > -1) {
        this.selectedArrayDegree.splice(index, 1);
      }
      console.log(this.selectedArrayDegree);
    }
  }
  education:any;
  degreeClick(){
    this.educationcard=false;
  this.education=this.selectedArrayDegree;
  }

  selectedArrayProfession=[];
  selectProfession(e, mt) {
    console.log(e.target.checked);
    if (this.selectedArrayProfession.indexOf(mt.id) == -1) {
      this.selectedArrayProfession.push(mt.id);
      console.log(this.selectedArrayProfession);
    }
    else if (this.selectedArrayProfession.indexOf(mt.id) != -1) {
      const index = this.selectedArrayProfession.indexOf(mt.id);
      if (index > -1) {
        this.selectedArrayProfession.splice(index, 1);
      }
      console.log(this.selectedArrayProfession);
    }
  }
  selectedIncome;
  selectIncome(e){
    console.log(e.currentTarget.value);
    this.selectedIncome=e.currentTarget.value.income;
    this.annualcard=false;
  }
  selectedWorkingStatus;
  selectWorkingStatus(e){
    console.log(e.currentTarget.value);
    this.selectedWorkingStatus=e.currentTarget.value.name;
    this.workingcard=false;
  }
  countryId=[];
  countryname;
  selectCountry(e){
    console.log(e.currentTarget.value);
    this.countryname=e.currentTarget.value.name;
    // this.countryId=e.currentTarget.value.id;
    this.countryId.push(e.currentTarget.value.id);
    this.countrycard=false;
  }
  stateId=[];
  stateName;
  selectState(e){
    console.log(e.currentTarget.value);
    this.stateName=e.currentTarget.value.name;
    // this.stateId=e.currentTarget.value.id;
    this.stateId.push(e.currentTarget.value.id)
    this.statecard=false;
    console.log(this.stateId);
  }

  selectedArrayCity=[];
  selectCity(e, mt) {
    console.log(e.target.checked);
    if (this.selectedArrayCity.indexOf(mt.id) == -1) {
      this.selectedArrayCity.push(mt.id);
      console.log(this.selectedArrayCity);
    }
    else if (this.selectedArrayCity.indexOf(mt.id) != -1) {
      const index = this.selectedArrayCity.indexOf(mt.id);
      if (index > -1) {
        this.selectedArrayCity.splice(index, 1);
      }
      console.log(this.selectedArrayCity);
    }
  }
  cityClick(){
    this.citycard=false;
    this.cityId=this.selectedArrayCity;
  }
  basicUpdate(){
    let basicBody ={
      user_register_id:localStorage.getItem('user_id'),
      age:this.selectedAge,
      min_height:this.total_minHeight,
      max_height:this.total_maxHeight,
      mothertongue:"Hindi",
      marriedstatus:'never married',
      religion:this.selectedReligionId,
      diet:this.selectedDiet,
    }
  }
  educationUpdate(){
    let educationBody={
      user_register_id:localStorage.getItem('user_id'),
      education:this.education,
      working:this.selectedWorkingStatus,
      profession:'profession',
      annualincome:'5L-10L'
    }
  }
  locationUpdate(){
    let locationBody={
      user_register_id:localStorage.getItem('user_id'),
      country: this.countryId,
      state: this.stateId,
      city:this.cityId,
    }
    this.user.present('');
    this.auth.updatePartnerlocation(locationBody).subscribe(res=>{
      this.dismiss();
      this.navCtrl.navigateRoot('/myProfile');
      this.user.dismiss();
     console.log(res);
    },err=>{
      this.dismiss();
      console.log(err.error.message)
    })
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }
}
