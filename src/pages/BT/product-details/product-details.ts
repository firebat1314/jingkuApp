import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'BT/ProductDetailsPage',
  name: 'BTProductDetailsPage'
})
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  data: any;
  shd_info: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpServ: HttpService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }
  ngOnInit(){
    this.getData();
  }
  getData() {
    this.httpServ.Shd_detail({id:45}).then(res => {
      if(res.status==1){
        this.data = res;
      }
    })
    this.httpServ.Shd_get_shd_info(null,{showLoading:false}).then(res => {
      if(res.status==1){
        this.shd_info = res;
      }
    })
  }

}
