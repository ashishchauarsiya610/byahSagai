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
            getCollage(){
              this.auth.getCollegeList().subscribe(col=>{
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
              this.auth.getDegreeList().subscribe(degree=>{
                this.degree1=degree;
                this.degreeList=this.degree1.degree;
                  for (let i = 0; i < this.degreeList.length; i++) {
                  this.filterTermDegreeList[i] = [{
                    "id": this.degreeList[i].id,
                    "name": this.degreeList[i].name,
                  }]
                }
              },err=>{
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
            filterTermCountry=[];
            filterTermState=[];
             filterTermCity=[];

            searchCountry: any;
            countryData;
            stateData;
            cityData;
            country;
            state;
            city;
            countryget(){
              this.auth.getCountryList().subscribe(country=>{
                console.log(country);
                this.countryData=country.country;
                   for (let i = 0; i < this.countryData.length; i++) {
                  this.filterTermCountry[i] = [{
                    "id": this.countryData[i].id,
                    "name": this.countryData[i].name,
                  }]
                }
              },err=>{
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
}
