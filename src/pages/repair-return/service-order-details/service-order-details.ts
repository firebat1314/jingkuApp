import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from '../../../providers/native';

/**
 * Generated class for the ServiceOrderDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment:'service-order-details/:return_id'
})
@Component({
  selector: 'page-service-order-details',
  templateUrl: 'service-order-details.html',
})
export class ServiceOrderDetailsPage {
  returnState: any;
  returnType: any;
  data: any;
  return_id = this.navParams.get('return_id');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
    public events: Events,
  ) {}
  ngOnInit() {
    this.getData();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceOrderDetailsPage');
  }
  getData() {
    this.httpService.repairInfo({id:this.return_id}).then((res) => {
      if (res.status == 1) {
        this.data = res;
        this.returnState = res.repair_info.return_status
        this.returnType = res.repair_info.return_type
      }
    })
  }
  cancelApply(id) {
    this.native.openAlertBox('确认取消本次售后申请吗？', () => {
      this.httpService.cancelReturn({ id: id }).then((res) => {
        if (res.status == 1) {
          this.native.showToast('取消成功');
          this.navCtrl.pop().catch(res => { history.back() });
          this.events.publish('repair-return:update');
        }
      })
    })
  }
}
