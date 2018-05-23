import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';
import { preApplyParams } from '../preApplyParams';
import { Native } from '../../../providers/native';

/**
 * Generated class for the EnterpriseInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'BT/EnterpriseInfoPage',
  name: 'BTEnterpriseInfoPage'
})
@Component({
  selector: 'page-enterprise-info',
  templateUrl: 'enterprise-info.html',
})
export class EnterpriseInfoPage {
  cityData: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpServ: HttpService,
    private preApplyParams: preApplyParams,
    private native: Native,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnterpriseInfoPage');
  }
  ngOnInit() {
    this.httpServ.FileJsonRegion().then(data => {
      this.cityData = JSON.parse(data.data);
    });
  }
  timer: number;
  ionViewDidEnter() {
    this.timer = setInterval(() => {
      this.preApplyParams.setStorage()
    }, 5000)
  }
  ionViewDidLeave() {
    clearInterval(this.timer)
  }
  cityChange(event) {
    this.preApplyParams.params.business_area = event.city.text + '-' + event.province.text + '-' + event.region.text;
  }
  submit() {
    this.httpServ.Shd_preApply(this.preApplyParams.params).then(res => {
      if (res.status == 1) {
        this.native.showToast(res.info);
        this.navCtrl.setPages([{ page: 'NewMyPage' }, { page: 'BTIndexPage' }],{direction:"forward",animate:true}).then(res => {
          this.preApplyParams.setStorage()
        });
      }
    })
  }
}
