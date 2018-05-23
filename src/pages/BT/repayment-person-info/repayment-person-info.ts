import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';
import { Native } from '../../../providers/native';
import { preApplyParams } from '../preApplyParams';

/**
 * Generated class for the RepaymentPersonInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'BT/RepaymentPersonInfoPage',
  name: 'BTRepaymentPersonInfoPage'
})
@Component({
  selector: 'page-repayment-person-info',
  templateUrl: 'repayment-person-info.html',
})
export class RepaymentPersonInfoPage {

  cityData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpServ: HttpService,
    private native: Native,
    private preApplyParams: preApplyParams,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepaymentPersonInfoPage');
  }

  ngOnInit() {
    this.httpServ.FileJsonRegion().then(data => {
      this.cityData = JSON.parse(data.data);
    });
  }
  timer: number;
  ionViewDidEnter() {
    this.timer = setInterval(()=>{
      this.preApplyParams.setStorage()
    }, 5000)
  }
  ionViewDidLeave() {
    clearInterval(this.timer)
  }
  
  /**
   * 城市选择器被改变时触发的事件
   * @param event
   */
  cityChange(event) {
    this.preApplyParams.params.residential_area = event.city.text + '-' + event.province.text + '-' + event.region.text;
  }
  addContact(index) {
    this.preApplyParams.params.contact_info.splice(index, 0, {
      contact_name: null,
      contact_relation: null,
      contact_mobile: null,
    })
  }
  rmContact(index) {
    if (this.preApplyParams.params.contact_info.length > 2) {
      this.preApplyParams.params.contact_info.splice(index, 1);
    } else {
      this.native.showToast('至少保留两条联系人信息！');
    }
  }
  submit() {
    this.navCtrl.push('BTEnterpriseInfoPage').then(res => {
      this.preApplyParams.setStorage()
    });
  }
}
