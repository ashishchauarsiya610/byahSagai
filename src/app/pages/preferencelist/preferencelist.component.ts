import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UpdatepreferenceComponent } from '../updatepreference/updatepreference.component';

@Component({
  selector: 'app-preferencelist',
  templateUrl: './preferencelist.component.html',
  styleUrls: ['./preferencelist.component.scss'],
})
export class PreferencelistComponent implements OnInit {
  postData = false;
  editIcon = true;
  constructor(private auth: AuthService,
    private user: UserService,
    private navCtrl: NavController,
    public modalCtrl: ModalController,) {
    this.preferenceAllData();
  }

  ngOnInit() { }
preferenceList;
locationData=[];
  preferenceAllData() {
    this.user.present('loading..')
    this.auth.getUserPreferences().subscribe(pref => {
      this.preferenceList=pref;
      this.user.dismiss();
      console.log(this.preferenceList);
      let city=this.preferenceList.city;
      for(var i=0;i<city.length;i++){
        this.locationData.push(city[i].name)
      }
      let dd=this.locationData;
    console.log(this.locationData)
    }, err => {
      this.user.dismiss();
      console.log(err.error.message);
      if (err.error.message == "oops!!! This user preference data not exists") {
        this.postData = true;
        this.editIcon = false;
        this.user.showToast('' + err.error.message);
      }
      else if (err.error.status == "0") {
        console.log('zero status');
        this.postData = true;
        this.editIcon = false;
      }
      else if(err.error.message==undefined){
        console.log('undefined status');
        this.postData = true;
        this.editIcon = false;
      }
      else if(err.error.message=="Your preference already added"){
        this.postData = true;
        this.editIcon = false;
      }
    })
  }

  testList: any = [
    { testID: 1, testName: " test1", },
    { testID: 2, testName: " test2", },
    { testID: 3, testName: "dgdfgd", },
    { testID: 4, testName: "UricAcid", },
    { testID: 5, testName: " test5", },
    { testID: 6, testName: " test6", },
    { testID: 7, testName: "dgdfgd7", },
    { testID: 8, testName: "UricAcid8", }
  ]

  selectedArray: any = [];

  checkAll() {
    for (let i = 0; i <= this.testList.length; i++) {
      this.testList[i].checked = true;
    }
    console.log(this.testList);
  }

  selectMember(e, data) {
    this.selectedArray=[];
    console.log(e.target.checked);
    if (this.selectedArray.indexOf(data.testID) == -1) {
      this.selectedArray.push(data.testID);
      console.log(this.selectedArray);
    }
    else if (this.selectedArray.indexOf(data.testID) != -1) {
      const index = this.selectedArray.indexOf(data.testID);
      if (index > -1) {
        this.selectedArray.splice(index, 1);
      }
      console.log(this.selectedArray);
    }
  }
 async partnerBasic() {
  this.user.partnerbasic=true;
  const modal = await this.modalCtrl.create({
    component: UpdatepreferenceComponent,
    componentProps: {
      user_id: "12",
      basic_data:this.basic
    }

  })
  return await modal.present();
  }
 async partnerLocation() {
   this.user.partnerlocation=true;
    const modal = await this.modalCtrl.create({
      component: UpdatepreferenceComponent,
      componentProps: {
        user_id: "12"
      }

    })
    return await modal.present();
  }
  basic=[
    {id:1,name:'ashish',caste:'bh'},
    {id:2,name:'ashjhsjj',caste:'lkll'},
    {id:3,name:'ash2',caste:'kill'},
    {id:3,name:'kumar',caste:'k2'},
    {id:2,name:'aswewew',caste:'jhjsujhjk'},
    {id:2,name:'akjhkjhk',caste:'lolp'}
  ]
  async partnerEducation() {
    this.user.partnercareer=true;
    const modal = await this.modalCtrl.create({
      component: UpdatepreferenceComponent,
      componentProps: {
        user_id: localStorage.getItem('user_id')
      }

    })
    return await modal.present();
  }
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
  mothercard = false;
  motherShow() {
    this.mothercard = true;
    console.log('mothertongue')
  }
      marriedcard=false;
      marriedShow() {
         this.marriedcard=true;
      }
      religioncard=false;
  religionShow() {
    this.user.religionData();
  this.religioncard=true;
  }
 
  dietcard=false;
  dietShow() {
  this.dietcard=true;
  }
  countrycard=false;
  countryShow() {
    this.countrycard=true;
    this.user.countryget();
  }
  countryId=[];
  countryname;
  selectCountry(e){
    console.log(e.currentTarget.value);
    this.countryname=e.currentTarget.value.name;
    // this.countryId=e.currentTarget.value.id;
    // this.countryname.push(e.currentTarget.value.name);
    this.countryId.push(e.currentTarget.value.id);
    this.countrycard=false;
  }
  
  statecard=false;
  stateShow() {
 this.statecard=true;
 this.user.stateget(this.countryId)
  }
  stateId=[];
  stateName;
  selectState(e){
    console.log(e.currentTarget.value);
    this.stateName=e.currentTarget.value.name;
    // this.stateId=e.currentTarget.value.id;
    this.stateId.push(e.currentTarget.value.id);
    // this.stateName.push(e.currentTarget.value.name);
    this.statecard=false;
    console.log(this.stateId);
  }
  // state:any;
  // stateClick(){
  //   this.statecard=false;
  //   this.state=this.selectedArrayState;
  // }
  citycard=false;
  city:any;
  cityId:any;
  cityShow() {
  this.citycard=true;
  this.user.cityget(this.stateId);
  }
  educationcard=false;
  educationShow() {
this.educationcard=true;
this.user.getDegree();
  }
  education:any;
  degreeClick(){
    this.educationcard=false;
  this.education=this.selectedArrayDegree;
  }
  professioncard=false;
  professionShow() {
 this.professioncard=true;
 this.user.getProfessionListData();
  }
  profession:any;
  professionClick(){
    this.professioncard=false;
  this.profession=this.selectedArrayProfession;
  }
  annualcard=false;
  annualShow(){
   this.annualcard=true;
  }
  workingcard=false;
  workingShow(){
  this.workingcard=true;
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
  // selectedArrayState=[];
  // selectState(e, mt) {
  //   console.log(e.target.checked);
  //   if (this.selectedArrayState.indexOf(mt.name) == -1) {
  //     this.selectedArrayState.push(mt.name);
  //     console.log(this.selectedArray);
  //   }
  //   else if (this.selectedArrayState.indexOf(mt.name) != -1) {
  //     const index = this.selectedArrayState.indexOf(mt.name);
  //     if (index > -1) {
  //       this.selectedArrayState.splice(index, 1);
  //     }
  //     console.log(this.selectedArrayState);
  //   }
  // }
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
  mothertongue:any;
  motherClick() {
    this.mothertongue=this.selectedArrayMother;
    this.mothercard = false;
  }
  maxHeightShow() {
    this.maxheightcard = true;
    this.user.heightAll();
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
  selectedMarried;
  selectMarried(e){
    console.log(e.currentTarget.value);
    this.selectedMarried=e.currentTarget.value.name;
    this.marriedcard=false;
  }
  selectedWorkingStatus;
  selectWorkingStatus(e){
    console.log(e.currentTarget.value);
    this.selectedWorkingStatus=e.currentTarget.value.name;
    this.workingcard=false;
  }
  selectedDiet;
  selectDiet(e){
    console.log(e.currentTarget.value);
    this.selectedDiet=e.currentTarget.value.diet;
    this.dietcard=false;
  }
  selectedIncome;
  selectIncome(e){
    console.log(e.currentTarget.value);
    this.selectedIncome=e.currentTarget.value.income;
    this.annualcard=false;
  }
  selectedReligion;
  selectedReligionId;
  selectReligion(e){
    console.log(e.currentTarget.value);
    this.selectedReligion=e.currentTarget.value.name;
    this.selectedReligionId=e.currentTarget.value.id;
    this.religioncard=false;
  }



  postAllData(){
    let body={
      user_register_id:localStorage.getItem('user_id'),
      // user_register_id:"2",
      age:this.selectedAge,
      min_height:this.total_minHeight,
      max_height:this.total_maxHeight,
      religion:this.selectedReligionId,
      mothertongue:this.mothertongue,
      country: this.countryId,
      state: this.stateId,
      city:this.cityId,
      education:this.education,
      working:this.selectedWorkingStatus,
      profession:this.profession,
      annualincome:this.selectedIncome,
      diet:this.selectedDiet
    }
    this.user.present('');
    this.auth.postPartnerPreferenceInfo(body).subscribe(res=>{
      this.navCtrl.navigateRoot('/myProfile');
      this.user.dismiss();
      console.log(res);
    },err=>{
      this.user.dismiss();
      console.log(err.error.message);
    })
  }
}
