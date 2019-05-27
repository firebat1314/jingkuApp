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
  segment:'forsubmission'
})
@Component({
  selector: 'forsubmission',
  templateUrl: 'forsubmission.html',
})
export class forsubmissionPage {
  item3:{
    goods_properties:{
      number:2,
      goods_number:1,
    }

  }

  return_id = this.navParams.get('return_id');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
    public events: Events,
  ) {}
  ngOnInit() {
 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceOrderDetailsPage');
  }
  csdds(){
    this.navCtrl.push('chooseaftersalegoodsPage');
    // alert(111)
  }
  sbumit(){
    this.navCtrl.push('stepdetailsPage');
  }
}
