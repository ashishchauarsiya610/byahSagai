import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm, FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ProfessionlistComponent } from '../professionlist/professionlist.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  responce;
  dob;
  profession_id;
  profession_name;
  formData: FormData = new FormData();

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  constructor(private navCtrl: NavController,
    private formbuilder: FormBuilder,
    private auth: AuthService,
    private user: UserService,
    private camera: Camera,
    private file: File,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() { }
  showErrors() {

  }
  register = this.formbuilder.group({
    email: [
      '',
      [
        Validators.required,
      ]
    ],
    mobile: [
      '',
      [
        Validators.required,
      ]
    ],
    password: [
      '',
      [
        Validators.required,
      ]
    ],
    fname: [
      '',
      [
        Validators.required,
      ]
    ],
    lname: [
      '',
      [
        Validators.required,
      ]
    ],
    profilefor: [
      '',
      [
        Validators.required,
      ]
    ]

  })

  get email() {
    return this.register.get('email');
  }
  get mobile() {
    return this.register.get('email');
  }
  get password() {
    return this.register.get('email');
  }
  get fname() {
    return this.register.get('email');
  }
  get lname() {
    return this.register.get('email');
  }
  get profilefor() {
    return this.register.get('email');
  }

  public errorMessages = {
    email: [
      {
        type: 'required', message: 'you have to enter email'
      }
    ],
    mobile: [
      {
        type: 'required', message: 'you have to enter mobile'
      }
    ],
    password: [
      {
        type: 'required', message: 'you have to enter password'
      }
    ],
    fname: [
      {
        type: 'required', message: 'you have to enter first name'
      }
    ],
    lname: [
      {
        type: 'required', message: 'you have to enter last name'
      }
    ],
    profilefor: [
      {
        type: 'required', message: 'you have to select profile'
      }
    ]
  }


  imageFile: any;
  gender;
  profile;
  selectedReligion;
  selectedReligionId;
  selectReligion(e) {
    console.log(e.currentTarget.value);
    this.selectedReligion = e.currentTarget.value.name;
    this.selectedReligionId = e.currentTarget.value.id;
    this.religioncard = false;
  }
 
  genderChecked(e) {
    this.gender = e.currentTarget.value;
    if (this.gender == undefined) {
      console.log('please select gender..')
    }
    else {
      console.log(this.gender)
    }

  }

  profileChecked(e) {
    this.profile = e.currentTarget.value;
    if (this.profile == undefined) {
      console.log('you did not selected profile for')
    } else {
      console.log(this.profile);
    }
  }
  onSubmit(data) {
    // console.log(data);
    // const date = new Date().valueOf();

    // Replace extension according to your media type
    // var imageName = date+ '.jpeg';
    // call method that creates a blob from dataUri
    // var imageBlob = this.dataURItoBlob(this.imageData);

    let body = {
      key: "a26fw3y25fd3gde53fe43e3e",
      first_name: data.fname,
      last_name: data.lname,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
      gender: this.gender,
      profile_for: this.profile,
      dob: this.dob,
      religion: this.selectedReligionId,
      profession_name: this.profession_id,
      country:"101",
      state:this.stateId,
      city:this.cityId,
      mother_tongue: this.motherTongueSelect,
      height:this.total_minHeight,
      community: this.communityId,
      profile_image: this.image,
    }
    console.log(body);
    if(body.email==""){
      console.log('please enter emailID..');
    }
    else if(body.mobile==""){
      console.log('please enter Mobile..');
    }
    else if(body.password==""){
      console.log('please enter Password..');
    }
    else if(body.first_name=="" || body.last_name==""){
      console.log('please enter Name..');
    }
    else if(body.profile_for==undefined){
      console.log('please enter Profile for ');
    }
    else if(body.gender==undefined){
      console.log('please enter gender');
    }
    else if(body.dob==undefined){
      console.log('please enter DOB'); 
    }
    else if(body.religion==undefined){
      console.log('please select religion ');
    }
    else if(body.profession_name==undefined){
      console.log('please enter Profession ');
    }
   
    else if(body.religion==undefined){
      console.log('please select religion:');
    }
    else if(body.state==undefined){
      console.log('please select State:');
    }
    else if(body.city==undefined){
      console.log('please select city name:');
    }
    else if(body.community==undefined){
      console.log('please select community :');
    }
    else if(body.height==undefined){
      console.log('please select height:');
    }
    else if(body.mother_tongue==undefined){
      console.log('please select Mother Tongue :');
    }
    else{
      console.log('Good');
      this.user.present('wait');
      this.auth.firstReg(body).subscribe(res => {
        this.responce = res;
        console.log(this.responce.message);
        // alert(JSON.stringify(this.responce.message));
        this.navCtrl.navigateRoot('/login');
        this.user.dismiss();
      }, err => {
        this.user.dismiss();
        alert(JSON.stringify(err.error));
        console.log(err.error.message);
      })
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
  date(e){
    console.log(e.detail.value);
    this.dob=e.detail.value
  }
  mothercard = false;
  motherShow() {
    this.mothercard = true;
    console.log('mothertongue')
  }
  motherTongueSelect;
  selectMotherTongue(mt){
    this.motherTongueSelect=mt.currentTarget.value.name;
    console.log(this.motherTongueSelect);
    this.mothercard=false;
     }
  photoData;
  image;
  imageData;
  currentImage;
  cameraClick() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.currentImage = imageData;
      this.image = (<any>window).Ionic.WebView.convertFileSrc(this.currentImage);
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = base64Image;
      // this.photoData=this.dataURItoBlob(this.image);
      alert("image:" + this.image);
      alert('encode' + this.photoData);
    }, (err) => {
      // Handle error
    });
  }
  mobileNumber;
  getNumber(e) {
    console.log(e);

  }
  onCountryChange(ev) {
    console.log(ev.dialCode)
  }
  telInputObject(event) {
    console.log(event.s.dialCode);
  }
  hasError(e) {
    // console.log(e)
  }
  religioncard = false;
  religionShow() {
    this.user.religionData();
    this.religioncard = true;
  }
        professionCard = false;
          async professionSelect() {
          this.professionCard = true;
          this.user.getProfessionListData();
       }
  async professionClick(pro_name, pro_id) {
    this.profession_id = pro_id;
    this.profession_name = pro_name;
    console.log(this.profession_id+""+this.profession_name)
    this.professionCard=false;
  }
  statecondition=false;
  stateShow(){
    this.user.stateget("101");
this.statecondition=true;
}
stateId;
state;
stateSelect(sid,sname){
  this.stateId=sid;
  this.state=sname;
 this.statecondition=false;
  console.log(this.stateId  +"" + this.state);
}
citycondition=false;
cityShow(){
  this.user.cityget(this.stateId);
  this.citycondition=true;
}
communitycondition=false;
communityShow(){
  this.user.communityget();
  this.communitycondition=true;
}
cityId;
city;
citySelect(cityId,cityName){
  this.city=cityName;
  this.cityId=cityId;
  this.citycondition=false;
}
communityId;
community;
communitySelect(communityId,communityName){
  this.community=communityName;
  this.communityId=communityId;
  console.log(this.community);
  console.log(this.communityId)
  this.communitycondition=false;
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
