import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {tap, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // url='https://cors-anywhere.herokuapp.com/http://103.109.6.71/~miscprojects/';
  url='http://103.109.6.71/~miscprojects/'
  constructor(private http: HttpClient) { }

  userRes;
  user_token;
  user_id;

  isAuthenticated():any{
    let token = localStorage.getItem('token')
      if (token)
        {
          return true;
        } else {
          return false;
        }
  }
   firstReg(body:any): Observable<any>{
    let headers= new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post(this.url+ 'byahsagai/api/User/User', body, {headers:headers}).pipe(tap(res=>{
    console.log("res: "+JSON.stringify(res));
   
    }))
   }

   userLogin(body:any): Observable<any>{
    let headers= new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post(this.url+ 'byahsagai/api/User/login', body, {headers:headers}).pipe(tap(res=>{
    console.log(res);
    this.userRes=res;
    this.user_token=this.userRes.token;
    this.user_id=this.userRes.user_id;
    console.log(this.user_token)
    localStorage.setItem('token',this.user_token);
    localStorage.setItem('user_id', this.user_id);
    let ttn=localStorage.getItem('token');
    console.log(ttn)
    }))
   }

   getUserProfile(): Observable<any>{
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url+'byahsagai/api/User/userprofile/'+ user_id, { headers: headers}).pipe(tap(res=>{
  }))
   }
   updateBasicInfo(body){
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
 return this.http.put(this.url+ 'byahsagai/api/User/updateuser',body,{headers: headers})
   }
  
  postContactInfo(body){
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
 return this.http.post(this.url+ 'byahsagai/api/User/addcontact',body,{headers: headers})
   }

   updateContactInfo(body){
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
 return this.http.put(this.url+ 'byahsagai/api/User/changecontact',body,{headers: headers})
   }
  postCareerInfo(body){
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
 return this.http.post(this.url+ 'byahsagai/api/User/qualification',body,{headers: headers})
   }

   putCareerInfo(body){
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
 return this.http.put(this.url+ 'byahsagai/api/User/qualification',body,{headers: headers})
   }

   updateCareerInfo(body){
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
 return this.http.put(this.url+ 'byahsagai/api/User/changeuserqualification',body,{headers: headers})
   }
   addMoreImage(body){
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
 return this.http.post(this.url+ 'byahsagai/api/User/addiprofilemage',body,{headers: headers})
    // 
   }
  
  //***************** Master Apis *************************/ 
  getCollegeList(): Observable<any>{
    let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url+'byahsagai/api/Master/collegelist', { headers: headers}).pipe(tap(res=>{
  }))
   }  
   getDegreeList(): Observable<any>{
    let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url+'byahsagai/api/Master/degreegelist', { headers: headers}).pipe(tap(res=>{
  }))
   }  
   getProfessionList(): Observable<any>{
    let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url+'byahsagai/api/Master/professionm', { headers: headers}).pipe(tap(res=>{
  }))
   }  
     getCountryList(): Observable<any>{
    let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url+'byahsagai/api/Master/country', { headers: headers}).pipe(tap(res=>{
  }))
   }  
   getState(countryId): Observable<any>{
    let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url+'byahsagai/api/Master/state/'+ countryId, { headers: headers}).pipe(tap(res=>{
  }))
   }
      getCity(stateId): Observable<any>{
    let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url+'byahsagai/api/Master/city/'+ stateId, { headers: headers}).pipe(tap(res=>{
  }))
   }
    getReligion(): Observable<any>{
    let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url+'byahsagai/api/Master/religion', { headers: headers}).pipe(tap(res=>{
  }))
   }
  getComunity(): Observable<any>{
    let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url+'byahsagai/api/Master/comunity', { headers: headers}).pipe(tap(res=>{
  }))
   }
   getGotraList(): Observable<any>{
    let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url+'byahsagai/api/Master/gotra', { headers: headers}).pipe(tap(res=>{
  }))
   }
   getHeightList(): Observable<any>{
    let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url+'byahsagai/api/Master/heightlist', { headers: headers}).pipe(tap(res=>{
  }))
   }
   getAgeList(): Observable<any>{
    let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url+'byahsagai/api/Master/agelist', { headers: headers}).pipe(tap(res=>{
  }))
   }
   getReligionList(): Observable<any>{
    let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url+'byahsagai/api/Master/religion', { headers: headers}).pipe(tap(res=>{
  }))
   }
   getComminityList(): Observable<any>{
    let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url+'byahsagai/api/Master/comunity', { headers: headers}).pipe(tap(res=>{
  }))
   }
 
   getUserImage(): Observable<any>{
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url+'byahsagai/assets/image/', { headers: headers}).pipe(tap(res=>{
  }))
   }
//*******************preferences Api ******************************/ 
getUserPreferences(): Observable<any>{
  let token = localStorage.getItem('token');
  let user_id = localStorage.getItem('user_id');
var headers = new HttpHeaders();
headers = headers.append('Content-Type', 'application/json ');
headers = headers.append('Authorization', 'Bearer' + ' ' + token);
return this.http.get(this.url+'byahsagai/api/User/preference/'+ user_id, { headers: headers}).pipe(tap(res=>{
}))
 }
 postPartnerPreferenceInfo(body){
  let token = localStorage.getItem('token');
  let user_id = localStorage.getItem('user_id');
var headers = new HttpHeaders();
headers = headers.append('Content-Type', 'application/json ');
headers = headers.append('Authorization', 'Bearer' + ' ' + token);
return this.http.post(this.url+ 'byahsagai/api/User/preference',body,{headers: headers})
 }
   updatePartnerbasicInfo(body){
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
 return this.http.put(this.url+ 'byahsagai/api/User/preferencebasic/',body,{headers: headers})
   }
   updatePartnerlocation(body){
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
 return this.http.put(this.url+ 'byahsagai/api/User/preferencelocation/',body,{headers: headers})
   }
   updatePartnerEducation(body){
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
 return this.http.put(this.url+ 'byahsagai/api/User/preferenceeducationnwork/',body,{headers: headers})
   }
    //************Profile Matching Apis **********/  
    getMatchedProfile(): Observable<any>{
      let token = localStorage.getItem('token');
      let user_id = localStorage.getItem('user_id');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.url+'byahsagai/api/User/matchprofile/'+ user_id, { headers: headers}).pipe(tap(res=>{
    }))
     }
     getDailyRecommended(): Observable<any>{
      let token = localStorage.getItem('token');
      let user_id = localStorage.getItem('user_id');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.url+'byahsagai/api/User/dailyrecommended/'+ user_id, { headers: headers}).pipe(tap(res=>{
    }))
     }
  //      
}
