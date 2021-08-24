import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule,NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], 
})
export class LoginComponent implements OnInit {

  usermail;
  userPass;
  loginRes;
  constructor(private navCtrl: NavController,
              private auth: AuthService,
              private user: UserService) { }
  ngOnInit() {}

  signUpClick(){
  this.navCtrl.navigateRoot('/register')
  }
  onSubmit(contactForm){
    console.log(contactForm.value);
 this.usermail=contactForm.value.email;
 this.userPass=contactForm.value.password;
 console.log(this.usermail);
 console.log(this.userPass);
 let body={
  userid: this.usermail,
  password: this.userPass
 }
 this.user.present('');
 this.auth.userLogin(body).subscribe(res=>{
   console.log(JSON.stringify(res));
   this.navCtrl.navigateRoot('/matches');
   this.user.dismiss();
 },err=>{
   this.user.dismiss();
   console.log(err.error.error);
   if(err.error.error=="Invalid API key "){
     console.log('please enter valid pass..');
     this.user.showToast('please enter valid pass');
   }
   else if(err.error.message=="Email id not exists"){
   console.log('user Id does not exists');
   this.user.showToast('user Id does not exists');
   }
 })
  }

  forgetPass(){
    this.navCtrl.navigateRoot('/forgetpass')
  }

}
