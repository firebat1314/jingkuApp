import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";

/*
  Generated class for the HelperDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-helper-details',
  templateUrl: 'helper-details.html'
})
export class HelperDetailsPage {
  data: any;
  item = this.navParams.get('item');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) {
    this.httpService.helpInfo({id:this.item.article_id}).then((res)=>{
      if(res.status==1){
        this.data = res;
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelperDetailsPage');
  }

}
