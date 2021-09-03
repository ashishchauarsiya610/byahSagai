import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  contact_details;
  qualification_check;
  degreelist=false;
  collegelist=false;
  partnerbasic=false;
  partnercareer=false;
  partnerlocation=false;
  constructor(private toast: ToastController,
              private loadingController: LoadingController,
              private auth:AuthService) { }
  isLoading = false;
           
             async present( msg ) {
               this.isLoading = true;
               return await this.loadingController.create({
                message: msg,
                 // duration: 5000,
               }).then(a => {
                 a.present().then(() => {
                   console.log('presented');
                   if (!this.isLoading) {
                     a.dismiss().then(() => console.log('abort presenting'));
                   }
                 });
               });
             }          
             async dismiss() {
               this.isLoading = false;
               return await this.loadingController.dismiss().then(() => console.log('dismissed'));
             }
             async showToast(msg){
              let toast =await this.toast.create({
                message: msg,
                position: 'middle',
                duration: 3000
              });
              toast.present();
            }
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
professionData;
professionAllData;
searchTermProfession:any='';
filterTermProfession=[];

            getCollage(){
              this.present('');
              this.auth.getCollegeList().subscribe(col=>{
                this.dismiss();
            this.c_list=col;
            this.collageList=this.c_list.college;
             for (let i = 0; i < this.collageList.length; i++) {
                  this.filterTermCollegeList[i] = [{
                    "id": this.collageList[i].id,
                    "college_name": this.collageList[i].college_name,
                  }]
                }
            console.log('col: '+ JSON.stringify(this.c_list));
              },err=>{
                this.dismiss();
                console.log(err.error);
              })
            }
            filterItem() {
              this.filterTerms = [];
              this.filterTermss =  this.collageList.filter(item => item.college_name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
              console.log(this.filterTermss.length);
              console.log(this.filterTermss);
              for (let i = 0; i < this.filterTermss.length; i++) {
                this.filterTermCollegeList[i] = [{
                  "college_name": this.filterTermss[i].college_name,
                  'id': this.filterTermss[i].id
                }]
              }
            }
            getDegree(){
              this.present('');
              this.auth.getDegreeList().subscribe(degree=>{
                this.dismiss();
                this.degree1=degree;
                this.degreeList=this.degree1.degree;
                  for (let i = 0; i < this.degreeList.length; i++) {
                  this.filterTermDegreeList[i] = [{
                    "id": this.degreeList[i].id,
                    "name": this.degreeList[i].name,
                  }]
                }
              },err=>{
                this.dismiss();
                console.log(err.error);
              })
            }          
              filterItemdegree() {
              this.filterTerms = [];
              this.filterTermss =  this.degreeList.filter(item => item.name.toLowerCase().indexOf(this.searchTermdegree.toLowerCase()) > -1);
              console.log(this.filterTermss.length);
              console.log(this.filterTermss);
              for (let i = 0; i < this.filterTermss.length; i++) {
                this.filterTermDegreeList[i] = [{
                  // "id": this.filterTermss[i].id,
                  "name": this.filterTermss[i].name,
                  'id': this.filterTermss[i].id
                }]
              }
            }
            getProfessionListData(){
              this.present('');
              this.auth.getProfessionList().subscribe(res=>{
                this.professionData=res;
                this.professionAllData=this.professionData.profession;
                  for (let i = 0; i < this.professionAllData.length; i++) {
                  this.filterTermProfession[i] = [{
                    "id": this.professionAllData[i].id,
                    "name": this.professionAllData[i].name,
                  }]
                }
                this.dismiss();
                console.log(this.professionAllData);
              },err=>{
                this.dismiss();
              })
            }
            filterItemProfession() {
              this.filterTermProfession = [];
              this.filterTermss = this.professionAllData.filter(item => item.name.toLowerCase().indexOf(this.searchTermProfession.toLowerCase()) > -1);
              for (let i = 0; i < this.filterTermss.length; i++) {
                this.filterTermProfession[i] = [{
                  "id": this.filterTermss[i].id,
                  "name": this.filterTermss[i].name,
                }]
              }
            }



            filterTermCountry=[];
            filterTermState=[];
             filterTermCity=[];
             filterTermCommunity=[];

            searchCountry: any;
            searchState: any;
            searchCity: any;
            searchCommunity: any;
            countryData;
            stateData;
            cityData;
            country;
            state;
            city;
            community;
            countryget(){
              this.present('');
              this.auth.getCountryList().subscribe(country=>{
                this.dismiss();
                console.log(country);
                this.countryData=country.country;
                   for (let i = 0; i < this.countryData.length; i++) {
                  this.filterTermCountry[i] = [{
                    "id": this.countryData[i].id,
                    "name": this.countryData[i].name,
                  }]
                }
              },err=>{
                this.dismiss()
                console.log(err.error.message)
              })
            }

            filterCountry(){
              this.filterTermCountry = [];
              this.filterTermss = this.countryData.filter(item => item.name.toLowerCase().indexOf(this.searchCountry.toLowerCase()) > -1);
              console.log(this.filterTermss.length);
              console.log(this.filterTermss);
              for (let i = 0; i < this.filterTermss.length; i++) {
                this.filterTermCountry[i] = [{
                    'id': this.filterTermss[i].id,
                    'name': this.filterTermss[i].name
                }]
              }
            }

            stateget(id){
              this.present('');
              this.auth.getState(id).subscribe(state=>{
                this.dismiss();
                console.log(state);
               this.stateData=state.state;
                   for (let i = 0; i < this.stateData.length; i++) {
                  this.filterTermState[i] = [{
                    "id": this.stateData[i].id,
                    "name": this.stateData[i].name,
                  }]
                }
              },err=>{
                this.dismiss();
                console.log(err.error.message);
              })
            }
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


            cityget(id){
              this.present('');
              this.auth.getCity(id).subscribe(city1=>{
                this.dismiss();
                this.cityData=city1.city;
                   for (let i = 0; i < this.cityData.length; i++) {
                  this.filterTermCity[i] = [{
                    "id": this.cityData[i].id,
                    "name": this.cityData[i].name,
                  }]
                }
                console.log(city1);
              },err=>{
                this.dismiss();
                console.log(err.error.message);
              })
            }
            filterCity(){
              this.filterTermCity = [];
              this.filterTermss = this.cityData.filter(item => item.name.toLowerCase().indexOf(this.searchCity.toLowerCase()) > -1);
              for (let i = 0; i < this.filterTermss.length; i++) {
                this.filterTermCity[i] = [{
                    'id': this.filterTermss[i].id,
                    'name': this.filterTermss[i].name
                }]
              }
            }
            communityData
            communityget(){
              this.present('');
              this.auth.getComminityList().subscribe(community=>{
                this.dismiss();
                this.communityData=community.community;
                   for (let i = 0; i < this.communityData.length; i++) {
                  this.filterTermCommunity[i] = [{
                    "id": this.communityData[i].id,
                    "name": this.communityData[i].name,
                  }]
                }
 
              },err=>{
                this.dismiss();
                console.log(err.error.message);
              })
            }
            filterCommunity(){
              this.filterTermCommunity = [];
              this.filterTermss = this.communityData.filter(item => item.name.toLowerCase().indexOf(this.searchCommunity.toLowerCase()) > -1);
              for (let i = 0; i < this.filterTermss.length; i++) {
                this.filterTermCommunity[i] = [{
                    'id': this.filterTermss[i].id,
                    'name': this.filterTermss[i].name
                }]
              }
            }


            ageList;
            heightList;
            ageAll(){
              this.auth.getAgeList().subscribe(agelist=>{
                this.ageList=agelist.age;
                console.log(this.ageList);
              },err=>{
                this.showToast(''+ err.error.message)
              })
            }
            heightAll(){
              this.auth.getHeightList().subscribe(height=>{
              this.heightList=height.height;
              console.log(this.heightList)
              },err=>{
                console.log(err.error.message)
              })
            }
            religionList;
            religionData(){
              this.present('');
              this.auth.getReligionList().subscribe(res=>{
                this.dismiss();
             this.religionList=res.religion;
              },err=>{
                this.dismiss();
                console.log(err.error)
              })
            }
            motherTongue=[
              {id:1,name:'Hindi'},
              {id:2,name:'English'},
              {id:3,name:'Punjabi'},
              {id:4,name:'Bhojpuri'},
              {id:5,name:'Urdu'},
              {id:6,name:'Haryanvi'},
              {id:7,name:'Gujrati'}
            ]
            marriedStatusList=[
              {id:1,name:'Married'},
              {id:2,name:'Never Married'}
            ]
            workingStatusList=[
              {id:1,name:'Yes'},
              {id:0,name:'No'}
            ]
            dietStatusList=[
              {id:1,diet:'Veg'},
              {id:2,diet:'Non-Veg'}
            ]
            annualIncomeList=[
              {id:1,income:'0L-2L'},
              {id:2,income:'2L-6L'},
              {id:3,income:'6L-10L'},
              {id:4,income:'10L-15L'},
              {id:5,income:'15L-20L'},
              {id:6,income:'20L-30L'},
              {id:7,income:'30L-50L'}
            ]
           
}
