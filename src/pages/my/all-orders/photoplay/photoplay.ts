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
   distri_order_con_info
  data: any;
  ids:any;
  orderId: any = this.navParams.get('order_id');
  contents:any;
  is_nices:any;
  imgs:any;
 
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

  is_true = null;


  ngOnInit() {
this.distri_order_consinfo()
  }
  items={
   img:[]
  }
 
  selectImgs(img, item) {
     if (this.items.img==[]) {
       img = [];
     }
     this.items.img.push(img);
  }
  deletePic(i, item) {
     debugger
     this.items.img.splice(i, 1);
  }
  distri_order_consinfo(){

    this.httpService.distri_order_cons({ order_id: this.orderId }).then((res) => {
      if (res.status == 1) {
       console.log(res)
       this.contents=res.content
       this.is_nices=res.is_nice
       this.imgs=res.img
       this.ids=res.id
      }
      if(res.status==0){
         this.distri_order_con_info=true;
         
      }else{
         this.distri_order_con_info=false;
      }
   })
  }

  dissbale=true;
  
  submit() {
   this.dissbale=false;
    if(this.distri_order_con_info==true){  //新增接口
      let sitems={
         img: [],
         order_id: this.orderId
        }
         if (this.items.img) {
            for (let j = 0; j < this.items.img.length; j++) {
               const img = this.items.img[j];
               // params.goods_list[i].img[j] = img.img_url;
               sitems.img.push(this.items.img[j]['img_url'])
            }
         }
         console.log(sitems)
         
         this.httpServ.distri_order_consinfo(sitems,this.orderId).then((res) => {
            if(res.status==1){
               this.native.showToast('反馈成功')
               this.dissbale=true
               this.distri_order_consinfo()
            }
         })
         
    }else{   //修改接口
      let sitems={
         img: [],
         order_id: this.orderId,
         id:this.ids
        }
         if (this.items.img) {
            for (let j = 0; j < this.items.img.length; j++) {
               const img = this.items.img[j];
               // params.goods_list[i].img[j] = img.img_url;
               sitems.img.push(this.items.img[j]['img_url'])
            }
         }
         console.log(sitems)
         
         this.httpServ.distri_order_consinfo(sitems,this.orderId).then((res) => {
            if(res.status==1){
               this.native.showToast('反馈成功')
               this.dissbale=true
               this.distri_order_consinfo()
            }
         })
      
    }
   //  this.navCtrl.push('photoplayPage',{ order_id: this.orderId });
     
}
distri_order_conss(){
   this.httpServ.distri_order_cons().then((res)=>{

   })
}

}







