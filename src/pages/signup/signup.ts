import { Component } from '@angular/core';
import { NavController, NavParams, Events, IonicPage, AlertController } from 'ionic-angular';

import { HttpService } from "../../providers/http-service";

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage({ segment: 'signup/:sharing' })
@Component({
   selector: 'page-signup',
   templateUrl: 'signup.html'
})
export class SignupPage {
   sharing = this.navParams.get('sharing') != ":sharing" ? this.navParams.get('sharing') : null;
   private signupInfo = {
      true_name: '',
      user_name: '',
      qq: '',
      step: 'one',
      mobile_phone: '',
      password: '',
      cpassword: '',
      phone_code: '',
      str_verify: '',
      signup: this.sharing
   };
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private events: Events,
      private alertCtrl: AlertController,
      public httpService: HttpService
   ) {
   }
   ngOnInit() {
      this.getSkey();
   }
   ionViewDidLoad() {
      console.log('ionViewDidLoad SignupPage');
   }
   logForm(signupForm) {
      console.log(signupForm)
   }
   private verifyImg;
   private skey;
   private getSkey() {
      this.httpService.getVerificationImg({
         fontSize: 14,
         length: 4,
         useNoise: 0,
         codeSet: 0,
      }).then(
         data => {
            // console.log(data);
            if (data.status == 1) {
               this.skey = data.data.skey;
               this.getImg()
            }
         })
   }
   private getImg() {
      this.signupInfo.str_verify = '';//清空验证码数字
      this.httpService.getVerificationImg({
         fontSize: 14,
         length: 4,
         useNoise: 0,
         codeSet: 0,
         skey: this.skey
      }).then(
         data => {
            // console.log(data);
            if (data.status == 1) {
               this.verifyImg = data.data.captcha + '?' + Math.random();
               this.skey = data.data.skey
            }
         },
         error => {
            // console.log(error);
         }
      );
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
         this.value = "(" + this.wait + ")秒后重新发送";
         let self = this;
         this.timer = setTimeout(function () {
            self.wait--;
            self.time();
         }, 1000)
      }
   }

   getMobileCode() {
      this.httpService.getMobileCode({
         type: 'reg',
         mobile: this.signupInfo.mobile_phone,
         verify: this.signupInfo.str_verify,
         skey: this.skey
      }).then(data => {
         // console.log(data)
         if (data.status) {
            this.time();
         } else {
            this.getImg();
         }
      })
   }
   toLoginPage() {
      this.navCtrl.pop().catch(res => { 
         this.navCtrl.push('LoginPage')
       });
   }
   goHelperDetailsPage() {
      this.navCtrl.push('HelperDetailsPage', { article_id: 35 })
   }
   registerBtn() {
      this.httpService.signupFirst(this.signupInfo).then(
         data => {
            if (data.status == 1) {
               this.httpService.setUsername(this.signupInfo.user_name)
               this.alertCtrl.create({
                  title: '提示',
                  message: data.info,
                  enableBackdropDismiss: false,
                  buttons: [
                     {
                        text: '立即认证',
                        handler: () => {
                           this.navCtrl.push('SignupSecondPage', { user_id: data.data.user_id })
                        }
                     },
                     {
                        text: '取消',
                        handler: () => {
                           this.navCtrl.push('SignupThirdPage');
                        }
                     }
                  ]
               }).present();
               // this.httpService.setToken(data.data.token);
            }
         },
         error => {
            console.log('注册出错')
         }
      );
   }
}
