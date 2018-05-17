import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController, AlertController } from 'ionic-angular';
import { HttpService } from '../../providers/http-service';

/**
 * Generated class for the LoginByPhonePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-by-phone',
  templateUrl: 'login-by-phone.html',
})
export class LoginByPhonePage {

  access: any;
  loginInfo = {
    userphone: '',
    mobile_code: '',
    type: 'phone'
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginByPhonePage');
  }

  private wait: number = 60;
  private disabled: Boolean = false;
  private value: String = '发送验证码';
  private timer: any;
  private time() {
    if (this.wait == 0) {
      this.disabled = false;
      this.timer = null;
      this.value = "发送验证码";
      this.wait = 60;
      return;
    } else {
      this.disabled = true;
      this.value = "" + this.wait + " 秒后重新发送";
      let self = this;
      this.timer = setTimeout(function () {
        self.wait--;
        self.time();
      }, 1000)
    }
  }

  getMobileCode() {
    this.httpService.getMobileCode({
      mobile: this.loginInfo.userphone,
      type: 'member',
      is_verify: 1,
    }).then(data => {
      // console.log(data)
      if (data.status) {
        this.time();
      }
    })
  }
  login() {
    this.httpService.loginCompany(this.loginInfo).then(res => {
      if (res.status == 1) {
        if(res.company&&res.company.length==1){
					this.loginByCid(res.company[0].cid);
					return false;
				}
        let alert = this.alertCtrl.create();
        alert.setTitle('请选择公司');
        let arr = res.company;
        for (let i = 0; i < arr.length; i++) {
          const item = arr[i];
          alert.addInput({
            type: 'radio',
            label: item.cname,
            value: item.cid,
            checked: this.access == item.cid
          });
        }
        alert.addButton('取消');
        alert.addButton({
          text: '确定',
          handler: cid => {
            this.access = cid;
						if (!cid) {
							this.toastCtrl.create({
								message: '请选择公司',
								duration: 2000,
								position: "top"
              }).present();
							return false;
            }
            this.loginByCid(cid);
          }
        });
        alert.present();
      } else if (res.status == -2) {
        this.alertCtrl.create({
          title: '请绑定企业信息',
          message: res.info,
          buttons: [
            {
              text: '绑定',
              handler: () => {
                this.navCtrl.push('SignupSecondPage')
              }
            },
            {
              text: '取消',
            }
          ]
        }).present();
      }
    })
  }
  loginByCid(cid){
    this.httpService.login(Object.assign({ cid: cid }, this.loginInfo)).then(data => {
      if (data.status == 1) {
        this.httpService.setStorage('hasLoggedIn', true);
        this.httpService.setStorage('username', data.data.user_name);
        this.httpService.setStorage('login_info', data);
        this.httpService.setStorage('token', data.data.token).then(res => {
          this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' }).then(() => {
            this.toastCtrl.create({
              message: "欢迎回来，" + data.data.user_name || this.loginInfo.userphone,
              duration: 2000,
              position: "top"
            }).present();
          });
        });
      } else if (data.status == -1) {
        this.alertCtrl.create({
          title: '镜库科技',
          message: data.info,
          buttons: [
            {
              text: '拨打电话',
              handler: () => {
                location.href = "tel:" + data.phone;
              }
            },
            {
              text: '确定',
            }
          ]
        }).present();
      }
    })
  }
}
