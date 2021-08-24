import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule,NgForm, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  responce;
formData: FormData=new FormData();

options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
};
  constructor(private navCtrl:NavController,
             private formbuilder: FormBuilder,
             private auth:AuthService,
             private user: UserService,
             private camera: Camera,
             private file: File,
             ) { }

  ngOnInit() {}
  showErrors(){

  }
register=this.formbuilder.group({
  email:[
    '',
    [
      Validators.required,
    ]
  ],
  mobile:[
    '',
    [
      Validators.required,
    ]
  ],
  password:[
    '',
    [
      Validators.required,
    ]
  ],
  fname:[
    '',
    [
      Validators.required,
    ]
  ],
  lname:[
    '',
    [
      Validators.required,
    ]
  ],
  profilefor:[
    '',
    [
      Validators.required,
    ]
  ]

})

get email(){
  return this.register.get('email');
}
get mobile(){
  return this.register.get('email');
}
get password(){
  return this.register.get('email');
}
get fname(){
  return this.register.get('email');
}
get lname(){
  return this.register.get('email');
}
get profilefor(){
  return this.register.get('email');
}

public errorMessages={
  email:[
    {
      type:'required', message:'you have to enter email'
    }
  ],
  mobile:[
    {
      type:'required', message:'you have to enter mobile'
    }
  ],
  password:[
    {
      type:'required', message:'you have to enter password'
    }
  ],
  fname:[
    {
      type:'required', message:'you have to enter first name'
    }
  ],
  lname:[
    {
      type:'required', message:'you have to enter last name'
    }
  ],
  profilefor:[
    {
      type:'required', message:'you have to select profile'
    }
  ]
}


imageFile:any;
gender:any="M";
profile;
genderChecked(e){
  this.gender = e.currentTarget.value;
  if(this.gender==undefined){
    console.log('please select gender..')
  }
  else{
    console.log(this.gender)
  }
  
}

profileChecked(e){
this.profile=e.currentTarget.value;
if(this.profile==undefined){
  console.log('you did not selected profile for')
}else{
  console.log(this.profile);
}
}
onSubmit(data){
  console.log(data);
    const date = new Date().valueOf();

    // Replace extension according to your media type
    var imageName = date+ '.jpeg';
    // call method that creates a blob from dataUri
    var imageBlob = this.dataURItoBlob(this.imageData);
 
  let body={
    key : "a26fw3y25fd3gde53fe43e3e",
    first_name: data.fname,
    last_name: data.lname,
    email: data.email,
    mobile: data.mobile,
    password: data.password,
    gender: this.gender,
    profile_for: data.profilefor,
    profile_image: this.image,
  }
  console.log(body);
  this.user.present('wait');
  this.auth.firstReg(body).subscribe(res=>{
    this.responce=res;
    console.log(this.responce.message);
    alert(JSON.stringify(this.responce.message));
    this.navCtrl.navigateRoot('/login');
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    alert(JSON.stringify(err.error));
    console.log(err.error.message);
  })
}
photoData;
image;
imageData;
currentImage;
cameraClick(){
  this.camera.getPicture(this.options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    this.currentImage=imageData;
    this.image=(<any>window).Ionic.WebView.convertFileSrc(this.currentImage);
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.image=base64Image;
    // this.photoData=this.dataURItoBlob(this.image);
    alert("image:"+ this.image);
    alert('encode'+ this.photoData);
   }, (err) => {
    // Handle error
   });
}
mobileNumber;
getNumber(e){
  console.log(e);
  
}
onCountryChange(ev){
  console.log(ev.dialCode)
}
telInputObject(event){
  console.log(event.s.dialCode);
}
hasError(e){
  // console.log(e)
}
dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
   const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
     }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });    
   return blob;
  }
}
