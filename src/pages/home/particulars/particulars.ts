import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
/*http服务*/
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the Particulars page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-particulars',
  templateUrl: 'particulars.html'
})
export class ParticularsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpService) {
    this.http.getGoodsGallery({id:4994}).then((res) => {
      console.log(res);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsPage');
  }

}
