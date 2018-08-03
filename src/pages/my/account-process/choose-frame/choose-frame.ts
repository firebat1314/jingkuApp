import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';
import { Native } from '../../../../providers/native';

/**
 * Generated class for the ChooseFramePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
	segment: 'choose-frame/:order_id'
})
@Component({
	selector: 'page-choose-frame',
	templateUrl: 'choose-frame.html',
})
export class ChooseFramePage {
	data: any;
	selectorbar: string = 'byorder';
	order_id = this.navParams.get('order_id');
	rec_id: any = this.navParams.get('rec_id');
	rec_ids: any = this.navParams.get('rec_ids');
	pian_rec: any = this.navParams.get('pian_rec');

	mach_type: any = this.navParams.get('mach_type');
	pinpai: any = this.navParams.get('pinpai');
	xinghao: any = this.navParams.get('xinghao');
   beizhu: any = this.navParams.get('beizhu');
   
	scannerData: any = this.navParams.get('scannerData');
	settings: any = this.navParams.get('settings');


	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public modalCtrl: ModalController,
		public httpService: HttpService,
		public viewCtrl: ViewController,
		public native: Native,
	) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ChooseFramePage');
	}

	ngOnInit() {
      if(!this.scannerData){
         this.httpService.machining_goods({
            order_id: this.order_id,
            type: 'zuo',
            goods_type: 'jia',
            rec_ids: this.rec_ids,
            rec_id: this.rec_id,
            pian_rec: this.pian_rec
         }).then((res) => {
            if (res.status == 1) {
               this.data = res;
               if (!res.data.length) {
                  this.selectorbar = 'byself';
               }
            } else {
               this.viewCtrl.dismiss();
            }
         })
      }
	}

	next() {
		if (this.data && !this.data.data.length) {
			this.native.showToast('没有可选镜架');
			return;
		} else if (!this.rec_id) {
			this.native.showToast('请选择镜架');
			return;
		}
		let modal = this.modalCtrl.create('PopoverMachiningPage', {
			rec_id: this.rec_id,
			mach_type: this.mach_type,
			pinpai: this.pinpai,
			xinghao: this.xinghao,
			beizhu: this.beizhu
		}, { cssClass: '' });
		modal.onDidDismiss((data, role) => {
			if (data) {
				this.viewCtrl.dismiss(data, 'submit');
			}
		})
		modal.present();
	}
	submit() {
		/* this.httpService.select_goods_type({ goods_rec: this.rec_id, type: '1', str_type: 'zuo' }).then((res)=>{
  
		}) */
		if(this.scannerData){
         this.httpService.SpecialMachiningselect_goods_type({
            goods_rec: null,//用户自备镜架
            type: '0',
            str_type: '',
            mach_type: this.mach_type,
            pinpai: this.pinpai,
            xinghao: this.xinghao,
            beizhu: this.beizhu,
            pian_rec: this.pian_rec
         }).then((res) => {
            if (res.status) {
               this.viewCtrl.dismiss(Object.assign(this.scannerData,res.data), 'submit');
            }
         })
      }else{
         this.httpService.select_goods_type({
            goods_rec: null,//用户自备镜架
            type: '0',
            str_type: '',
            mach_type: this.mach_type,
            pinpai: this.pinpai,
            xinghao: this.xinghao,
            beizhu: this.beizhu,
            pian_rec: this.pian_rec
         }).then((res) => {
            if (res.status) {
               this.viewCtrl.dismiss(res.data, 'submit');
            }
         })
      }
	}

}
