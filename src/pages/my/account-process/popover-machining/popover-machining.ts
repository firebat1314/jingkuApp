import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';

/**
 * Generated class for the PopoverMachiningPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-machining',
  templateUrl: 'popover-machining.html',
})
export class PopoverMachiningPage {
  rec_id = this.navParams.get('rec_id');
  mach_type: any = this.navParams.get('mach_type');
  pinpai: any = this.navParams.get('pinpai');
  xinghao: any = this.navParams.get('xinghao');
  beizhu: any = this.navParams.get('beizhu');
  pian_rec: any = this.navParams.get('pian_rec');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public httpService: HttpService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverMachiningPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  submit() {
    if (this.rec_id) {
      this.httpService.select_goods_type({
        goods_rec: this.rec_id,//用户自备镜架
        type: '0',
        str_type: '',
        mach_type: this.mach_type,
        pinpai: this.pinpai,
        xinghao: this.xinghao,
        beizhu: this.beizhu,
        pian_rec:this.pian_rec
      }).then((res) => {
        if (res.status) {
          this.viewCtrl.dismiss(res.data,'submit');
        }
      })
    } else {
      this.viewCtrl.dismiss(null, 'submit');
    }
  }
}
