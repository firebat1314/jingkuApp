import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

/**
 * Generated class for the ApplyServicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  defaultHistory: ['RepairReturnPage'],
  segment: 'apply-service/:order_ids/:rec_ids/:type'
})
@Component({
  selector: 'page-apply-service',
  templateUrl: 'apply-service.html',
})
export class ApplyServicePage {

  rec_ids: any = this.navParams.get("rec_ids");
  order_ids: any = this.navParams.get("order_ids");
  type: any = this.navParams.get("type");
  params = {
    rec_ids: {},
    order_ids: this.order_ids,
    return_type: this.type || null,
    type_note: null,
    str_desc: null,
    return_img: [],
    return_way: null,
  }
  type_note_txt: string = '';
  data;
  return_imgs: Array<any> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
    public modalCtrl: ModalController,
    public events: Events,
  ) { }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyServicePage');
  }
  ngOnInit() {
    this.getData()
  }
  getData() {
    this.httpService.moreGoodsRepair({
      orders: {
        order_ids: this.order_ids,
        rec_ids: this.rec_ids,
      },
      type: this.type
    }).then((res) => {
      if (res.status == 1) {
        this.data = res
      }
    })
  }
  openCamra(event) {
    if (this.return_imgs.length >= 5) {
      this.native.showToast('最多选择5张照片');
      return;
    }
    this.return_imgs.push(event);
    /* if (this.return_imgs.length >= 5) {
      this.native.showToast('最多选择5张照片', null, false);
      return;
    }
    this.native.getMultiplePicture({
      outputType: 1,
      maximumImagesCount: 5 - this.return_imgs.length
    }).then((res) => {
      if (res instanceof Array) {
        if (this.return_imgs.concat(res).length > 5) {
          this.native.showToast('最多选择5张照片');
          this.return_imgs = this.return_imgs.concat(res).slice(0, 5);
        } else {
          this.return_imgs.concat(res);
        }
      }
    }, (err) => {
      console.log(err)
    }) */
  }
  deletePic(i) {
    this.return_imgs.splice(i, 1);
  }
  openReasonModal() {
    var modal = this.modalCtrl.create('ReasonModalPage', {}, { cssClass: 'my-modal-style' });
    modal.onDidDismiss((data) => {
      if (data) {
        this.params.type_note = data.type_note;
        this.type_note_txt = data.text;
      }
    })
    modal.present();
  }
  goServiceOrderDetailsPage() {
    let member = [], rec_id = []
    this.data.order_goods.forEach(item => {
      item.forEach(item1 => {
        if (item1.member) {
          member.push(item1.member);
          rec_id.push(item1.rec_id);
        } else {
          member.push(1);
          rec_id.push(item1.rec_id);
        }
      })
    })
    this.params.rec_ids = {
      member: member,
      rec_id: rec_id
    }
    this.params.return_img = this.return_imgs;
    // this.native.showToast('提交成功',800,false)
    this.httpService.submitRepair(this.params).then((res) => {
      if (res.status == 1) {
        this.navCtrl.push('ApplyService2Page', { data: res });
        this.events.publish('repair-return:update');
      }
    })
  }
}
