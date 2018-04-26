import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController, ToastController } from 'ionic-angular';
import { HttpService } from '../../providers/http-service';

/**
 * Generated class for the AnyLinkPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  segment: 'any-link/:anyparams'
})
@Component({
  selector: 'page-any-link',
  templateUrl: 'any-link.html',
})
export class AnyLinkPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) {
    // alert(navParams.get('anyparams'))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnyLinkPage');
  }

  ngOnInit() {
    this.httpService.fastLogin({ fastToken: this.navParams.get('anyparams') }).then(data => {
      // console.log(data)
      if (data.status == 1) {
        this.httpService.setStorage('token', data.data.token);
        this.httpService.setStorage('hasLoggedIn', true);
        this.httpService.setStorage('username', data.data.user_name);
        this.httpService.setStorage('login_info', data);

        let toast = this.toastCtrl.create({
          message: "欢迎回来，" + data.data.user_name,
          duration: 2000,
          position: "top"
        });
        setTimeout(() => {
          this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' }).then(() => {
            toast.present();
          });
        }, 100);
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
