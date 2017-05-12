import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpService } from "../../../../../providers/http-service";

/*
  Generated class for the ChangePassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage {

  formData = {
    old_password: '',
    new_password: '',
    con_password: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public toastCtrl: ToastController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  onsubmit() {
    this.httpService.editPwd(this.formData).then((res) => {
      if (res.status == 1) {
        this.toastCtrl.create({
          message: '修改成功',
          duration: 2000,
          position: 'top',
          showCloseButton: false
        }).present().then(()=>{
          this.navCtrl.pop();
        });
      }
    })
  }
}
