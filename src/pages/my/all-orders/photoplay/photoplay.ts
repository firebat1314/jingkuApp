import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content, AlertController } from 'ionic-angular';
import { MineProvider } from '../../../../providers/mine/mine';
import { HttpService } from '../../../../providers/http-service';
import { Native } from '../../../../providers/native';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ChatProvider } from '../../../../providers/chat/chat';

/**
 * Generated class for the photoplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var ClipboardJS: any;

@IonicPage({
  segment: 'photoplay/:order_id'
})
@Component({
  selector: 'page-photoplay',
  templateUrl: 'photoplay.html',
})
export class photoplayPage {

  data: any;
  orderId: any = this.navParams.get('order_id');

  

  @ViewChild(Content) content: Content
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
    public events: Events,
    private mine: MineProvider,
    private iab: InAppBrowser,
    private alertCtrl: AlertController,
    private chat: ChatProvider,
    private httpServ: HttpService,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad photoplayPage');
  }
 

  // orderId = this.navParams.get('order_id');
  // @ViewChild('evaluation') evaluationForm: ElementRef;
 



  orderData = null;
  /* 是否可以评论 */
  is_true = null;

  /* this.params = {
     content: null,
     comment_rank: null,
     accord_rank: null,
     service_rank: null,
     delivery_rank: null,
     comment_label: null,
     img: null,
  }; */
  /* 是否可以评论 */
  ngOnInit() {
     this.httpServ.commentIsComment({
        order_id: this.orderId
     }).then((res) => {
        if (res.status == 1) {
           this.is_true = res.is_true;
        }
     })
     this.httpServ.orderInfo({
        order_id: this.orderId
     }).then((res) => {
        if (res.status == 1) {
           this.orderData = res;
        }
     })
    this.distri_order_consinfo()
  }

  selectImgs(img, item) {
     if (!item.img) {
        item.img = [];
     }
     item.img.push(img);
  }
  deletePic(i, item) {
     item.img.splice(i, 1);
  }
  distri_order_consinfo(){

    this.httpService.distri_order_cons({ order_id: this.orderId }).then((res) => {
      if (res.status == 1) {
       console.log(res)
      }
   })
  }

}







