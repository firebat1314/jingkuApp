import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'BT/IndexPage',
  name: 'BTIndexPage'
})
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  data: any;
  shd_info: any;
  timer: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpServ: HttpService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
  }
  ngOnInit() {
    this.getData();
    this.timer = setInterval(() => {
      this.httpServ.Shd_get_shd_info(null, { showLoading: false }).then(res => {
        if (res.status == 1) {
          this.shd_info = res;
        }
      })
    }, 3000)
  }
  ionViewDidLeave() {
    clearInterval(this.timer)
  }
  getData() {
    this.httpServ.Shd_product_list().then(res => {
      if (res.status == 1) {
        this.data = res;
      }
    })
    this.httpServ.Shd_get_shd_info(null, { showLoading: false }).then(res => {
      if (res.status == 1) {
        this.shd_info = res;
      }
    })
  }
}
