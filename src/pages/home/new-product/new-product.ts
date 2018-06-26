import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';
import { MineProvider } from '../../../providers/mine/mine';

/**
 * Generated class for the NewProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
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
    private httpSrv: HttpService,
    private mine: MineProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductPage');
  }
  ngOnInit() {
    this.httpSrv.newArea().then(res => {
      this.data = res;
    })
  }
}
