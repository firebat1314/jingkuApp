import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';

/**
 * Generated class for the CompanyListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-list',
  templateUrl: 'company-list.html',
})
export class CompanyListPage {

  companyList: any;
  cid: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpServ: HttpService,
    public app: App,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyListPage');
  }

  ngOnInit() {
    this.httpServ.getCompanyList().then(res => {
      if (res.status == 1) {
        this.companyList = res;
      }
    })
  }

  clickItem(cid) {
    this.httpServ.SwitchCompany({ cid: cid }).then(data => {
      if (data.status == 1) {
        this.httpServ.setStorage('hasLoggedIn', true);
        this.httpServ.setStorage('username', data.data.user_name);
        this.httpServ.setStorage('login_info', data);
        this.httpServ.setStorage('token', data.data.token).then(res => {
          this.app.getRootNav().setRoot('TabsPage', {}, { animate: true, direction: 'back' });
        });
      }else{
        this.httpServ.getCompanyList().then(res => {
          if (res.status == 1) {
            this.companyList = res;
          }
        })
      }
    })
  }
}
