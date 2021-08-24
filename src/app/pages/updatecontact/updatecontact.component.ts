import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-updatecontact',
  templateUrl: './updatecontact.component.html',
  styleUrls: ['./updatecontact.component.scss'],
})
export class UpdatecontactComponent implements OnInit {
@Input() user_id;
@Input() person_name:any;
@Input() mobile:any;
@Input() r_member:any;
@Input() time:any;
timeValue;
  constructor(private auth: AuthService,
              private user: UserService,
              private viewCtrl: ModalController) { }

  ngOnInit() {}
 

  dismiss(){
    this.viewCtrl.dismiss();
      }

      checkChecked(e) {
        this.timeValue = e.currentTarget.value;
        console.log('time:  ' + this.timeValue)
      }
      onSubmit(contactForm){
        
         if(this.user.contact_details==null){
          let body={
            user_register_id: this.user_id,
            person_name:contactForm.value.person,
            mobile: contactForm.value.mobile,
            relationship_with_member: contactForm.value.relation,
            convenient_time:this.timeValue
          }
            console.log('jkhhkjhdj');
            this.user.present('please wait..');
            this.auth.postContactInfo(body).subscribe(responce=>{
              this.user.dismiss();
              this.dismiss();
           console.log(responce);
            },err=>{
              this.user.dismiss();
              this.dismiss();
              console.log(err.error.message);
            })
         }
         else{
          let body={
            rowid: this.user_id,
            person_name:contactForm.value.person,
            mobile: contactForm.value.mobile,
            relationship_with_member: contactForm.value.relation,
            convenient_time:this.timeValue
          }
           this.user.present('updating..');
         this.auth.updateContactInfo(body).subscribe(data=>{
         this.user.dismiss();
         this.dismiss();
         },err=>{
          this.user.dismiss();
          this.dismiss();
           console.log(err.error.message);
         })
         }
        console.log(contactForm.value)
      }

}
