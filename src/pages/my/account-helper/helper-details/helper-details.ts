import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";

/*
  Generated class for the HelperDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage({
  segment:'helper-details/:article_id'
})
@Component({
  selector: 'page-helper-details',
  templateUrl: 'helper-details.html'
})
export class HelperDetailsPage {
  data: any;
  article_id = this.navParams.get('article_id');
  is_modal = this.navParams.get('is_modal');
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private httpService: HttpService,
    private viewCtrl: ViewController,
  ) {
    
  }
  ngOnInit(){
    this.httpService.helpInfo({id:this.article_id}).then((res)=>{
      if(res.status==1){
        this.data = res;
      }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HelperDetailsPage');
  }

}
