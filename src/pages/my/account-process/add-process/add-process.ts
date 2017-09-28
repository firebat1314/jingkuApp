import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, PopoverController, ModalController } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';

/**
 * Generated class for the AddProcessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
export class orderParams {
	showBody:boolean = true;
}

@IonicPage({
  segment: 'add-process/:order_parent'
})
@Component({
  selector: 'page-add-process',
  templateUrl: 'add-process.html',
})
export class AddProcessPage {
  order_id = this.navParams.get('order_parent');
  data: any;
  
  order:Object = {

  }
  list:Array<object> = [(new orderParams)]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProcessPage');
  }
  ngOnInit(){
    this.getData();
  }
  getData() {
    this.httpService.glassMachining({ order_id: this.order_id }).then((res) => {
      if (res.status == 1) {
        this.data = res;
      }
    })
  }
  addOrder(){
    this.list.push(new orderParams)
    console.log(this.list)
  }
  removeOrder(index){
    this.list.splice(index,1);
  }
  checkOrder(){
    // this.popoverCtrl.create('PopoverMachiningPage',{},{cssClass:'popover-machining'}).present();
    this.modalCtrl.create('PopoverMachiningPage',{},{cssClass:''}).present();
  }
}
