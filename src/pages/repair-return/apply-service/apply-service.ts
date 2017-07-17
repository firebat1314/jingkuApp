import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

/**
 * Generated class for the ApplyServicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-apply-service',
  templateUrl: 'apply-service.html',
})
export class ApplyServicePage {

  data: any = this.navParams.data;
  picArr: Array<any>;

  params = {
    rec_ids:null,
    order_id: this.navParams.data.order_info?this.navParams.data.order_info.order_id:null,
    return_type: null,
    type_note: null,
    str_desc: null,
    return_img: null,
    return_way: null,
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
    public modalCtrl: ModalController,
  ) {
    console.log(this.data)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyServicePage');
  }
  goServiceOrderDetailsPage() {
    this.navCtrl.push('ApplyService2Page');
    this.httpService.submitRepair().then((res) => {
      if (res.status == 1) {
        this.native.showToast(res.info);
        this.navCtrl.push('ApplyService2Page', res);
      }
    })
  }
  openCamra() {
    this.native.getMultiplePicture({
      outputType: 1,
      maximumImagesCount: 5
    }).then((data) => {
      if (data instanceof Array) {
        if (this.picArr.concat(data).length > 5) {
          this.native.showToast('最多选择5张');
          this.picArr = this.picArr.concat(data).slice(0, 5);
        } else {
          this.picArr.concat(data);
        }
      }
    })
  }
  deletePic(i) {
    this.picArr.splice(i, 1);
  }
  openReasonModal(){
    var modal = this.modalCtrl.create('ReasonModalPage');
    modal.onDidDismiss((data)=>{
      console.log(data)
    })
    modal.present();
  }
}
