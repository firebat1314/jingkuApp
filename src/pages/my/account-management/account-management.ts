import { Component } from '@angular/core';
import { NavController, NavParams, Events, IonicPage, App } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";
/*
  Generated class for the AccountManagement page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-account-management',
  templateUrl: 'account-management.html'
})
export class AccountManagementPage {
  AccountSecurityPage: any = 'AccountSecurityPage';
  AccountInfoPage: any = 'AccountInfoPage';
  ShippingAddressPage: any = 'ShippingAddressPage';
  MemberCenterPage: any = 'MemberCenterPage';

  avatar: any = this.navParams.get('avatar');
  username: any = this.navParams.get('username');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public httpService: HttpService,
    public app: App,
    public native: Native,
  ) {
    this.events.subscribe('my:update', res => {
      this.avatar = res;
    })
    this.httpService.userInfo().then((res) => {
      if (res.status == 1) {
        this.avatar = res.data.avatar;
        this.username = res.data.username;
      }
    })
  }
  ngOnDestroy() {
    this.events.unsubscribe('my:update');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountManagementPage');
  }
  signOut() {
    this.native.openAlertBox('确定退出登陆？', () => {
      this.httpService.logout().then((res) => {
        this.httpService.removeStorage('hasLoggedIn');
        this.httpService.removeStorage("token");
        this.httpService.removeStorage("username");
        this.httpService.removeStorage("login_info");
        
        if (this.native.isMobile()) {
          this.app.getRootNav().setRoot('LoginPage', {}, { animate: true });
        } else {
          this.app.getRootNav().setRoot('WellcomeNewmPage', {}, { animate: true });
        }
      })
    })
  }
}
