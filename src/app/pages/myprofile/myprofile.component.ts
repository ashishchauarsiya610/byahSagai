import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UpdatebasicinfoComponent } from '../updatebasicinfo/updatebasicinfo.component';
import { UpdatecontactComponent } from '../updatecontact/updatecontact.component';
import { UpdateeducationComponent } from '../updateeducation/updateeducation.component';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {File, IWriteOptions, FileEntry} from '@ionic-native/file/ngx';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
})
export class MyprofileComponent implements OnInit {
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  allData;
  responseAll;
  user_id;
  first_name;
  last_name;
  email_id;
  mobile;
  profile_for;
  profile_image;
  create_date;
  contact_address;
  native_address;
  dob;
  height;
  religion;
  place_of_birth;
  marital_status;
  diet_reference;
  mother_tongue;
  edu;
  moreImage;
  moreImage1=[];
  //  contact_details;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: 10,
    slidesPerView: 4,
    // centeredSlide:true,
    // slidesPerColumn: 3,
  };
  constructor(private auth: AuthService,
    private user: UserService,
    private navCtrl: NavController,
    public modalCtrl: ModalController,
    private camera: Camera,
    private file: File,) {
    this.getMyData();
  }
imageShow=false;
imageServer=false;
qualification;
  getMyData() {
    this.user.present('');
    this.auth.getUserProfile().subscribe(res => {
      this.user.dismiss();
      this.responseAll = res;
      this.user.contact_details = this.responseAll.contact_detail;
      this.user.qualification_check = this.responseAll.profession;
      this.qualification=this.responseAll.qualification;
      this.moreImage = this.responseAll.image;
      console.log(this.responseAll);
      if(this.moreImage ==null){
        console.log('More Image details not found..')
      }else{
        for (let i = 0; i < this.moreImage.length; i++) {
          this.moreImage1[i] = {
            'image': "http://103.109.6.71/~miscprojects/byahsagai/assets/image/" + this.moreImage[i].image,
          }
       
        }
      }
   
      if (this.user.contact_details == null) {
        console.log('contact details not found..')
      }
      if (this.user.qualification_check == null) {
        console.log('qualification not found..')
      }
      this.allData = (this.responseAll.userdata);
      console.log(this.allData.id)
      this.user_id = this.allData.id;
      this.first_name = this.allData.first_name;
      this.last_name = this.allData.last_name;
      this.email_id = this.allData.email_id;
      this.mobile = this.allData.mobile;
      this.height = this.allData.height;
      this.profile_for = this.allData.profile_for;
      this.profile_image = "http://103.109.6.71/~miscprojects/byahsagai/assets/image/" + this.allData.profile_image;
      this.create_date = this.allData.create_date;
      this.contact_address = this.allData.contact_address;
      this.native_address = this.allData.native_address;
      this.dob = this.allData.dob;
      this.religion = this.allData.religion;
      this.place_of_birth = this.allData.place_of_birth;
      this.marital_status = this.allData.marital_status;
      this.diet_reference = this.allData.diet_reference;
      this.mother_tongue = this.allData.mother_tongue;
      if(this.allData.profile_image==null){
        console.log('profile image null')
        this.imageShow=true;
        this.imageServer=false;
      }
     else {
      this.imageShow=false;
      this.imageServer=true;
      }

    }, err => {
      this.user.dismiss();
    })
  }

  ngOnInit() { }

  async editBasic() {
    console.log(this.first_name);
    const modal = await this.modalCtrl.create({

      component: UpdatebasicinfoComponent,
      componentProps: {
        first_name: this.first_name,
        last_name: this.last_name,
        height: this.height,
        place_of_birth: this.place_of_birth,
        contact_address: this.contact_address,
        native_address: this.native_address,
        profile_image: this.profile_image,
        user_id: localStorage.getItem('user_id'),
        mobile: this.mobile
      }
    });
    return await modal.present();
  }
  async educationUpdate() {
    const modal = await this.modalCtrl.create({
      component: UpdateeducationComponent,
      componentProps: {
        user_id: localStorage.getItem('user_id'),
      }

    })
    return await modal.present();

  }

  async updateContact() {
    const modal = await this.modalCtrl.create({
      component: UpdatecontactComponent,
      componentProps: {
        user_id: localStorage.getItem('user_id'),
        person_name: this.user.contact_details[0].person_name,
        mobile: this.user.contact_details[0].mobile,
        r_member: this.user.contact_details[0].relationship_with_member,
        time: this.user.contact_details[0].convenient_time
      }

    });
    return await modal.present();
  }
  basic = [
    {
      name: "ashish chaurasiya",
      dob: '01 January 1997',
      height: "5ft 8",
      place: "Delhi",
      native_Address: "Pari chowk Greater Noida ,Uttar Pradesh"
    }
  ]
  prefClick() {
    this.navCtrl.navigateRoot('preferencelist')
  }
  logout(){
    localStorage.clear();
    this.navCtrl.navigateRoot('/home');
  }
  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      const formData = new FormData();
      formData.append('user_register_id', this.allData.id);
      formData.append('image', imgBlob, file.name);
      alert(this.allData.id);
      alert(JSON.stringify(formData));
      this.auth.addMoreImage(formData).subscribe(dataRes => {
        alert(JSON.stringify(dataRes));
      },err=>alert("Error:"+JSON.stringify(err.error)));
    };
    reader.readAsArrayBuffer(file);
  }
  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.file.resolveLocalFilesystemUrl(imageData).then((entry: FileEntry) => {
        entry.file(file => {
          console.log(file);
          this.readFile(file);
        });
      });
    }, (err) => {
      // Handle error
    });
  }
}
