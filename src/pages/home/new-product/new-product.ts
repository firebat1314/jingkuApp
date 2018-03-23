import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';

/**
 * Generated class for the NewProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-product',
  templateUrl: 'new-product.html',
})
export class NewProductPage {

  data: any;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public httpSrv: HttpService
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductPage');
  }
  ngOnInit(){
    this.httpSrv.newArea().then(res=>{
      if(res.status){
        this.data = res.status;
      }
    })
  }
}
