import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-preferencelist',
  templateUrl: './preferencelist.component.html',
  styleUrls: ['./preferencelist.component.scss'],
})
export class PreferencelistComponent implements OnInit {
  postData = false;
  editIcon=true;
  constructor(private auth: AuthService,
    private user: UserService,
    private navCtrl: NavController,
    public modalCtrl: ModalController) {
    this.preferenceAllData();
  }

  ngOnInit() { }

  preferenceAllData() {
    this.user.present('loading..')
    this.auth.getUserPreferences().subscribe(pref => {
      this.user.dismiss();
      console.log(pref)
    }, err => {
      this.user.dismiss();
      console.log(err.error.message);
      if (err.error.message == "oops!!! This user preference data not exists") {
        this.postData = true;
        this.editIcon=false;
        this.user.showToast('' + err.error.message);
      }
      else if (err.error.status == "0") {
        console.log('zero status');
        this.postData = true;
        this.editIcon=false;
      }
    })
  }

  testList: any = [
    { testID: 1, testName: " test1", },
    { testID: 2, testName: " test2", },
    { testID: 3, testName: "dgdfgd", },
    { testID: 4, testName: "UricAcid", }
  ]

  selectedArray: any = [];

  checkAll() {
    for (let i = 0; i <= this.testList.length; i++) {
      this.testList[i].checked = true;
    }
    console.log(this.testList);
  }

  selectMember(e, data) {
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
  partnerBasic() {

  }
  partnerLocation() {

  }
  partnerEducation() {

  }
}
