import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessageDetailsPage } from "./message-details/message-details";
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the Message page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService
  ) { 
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }
  goMessageDetailsPage() {
    this.navCtrl.push(MessageDetailsPage)
  }
  getData(){
    this.httpService.getTidings().then((res)=>{
      console.log(res);
      if(res.status==1){
        this.data = res;
      }
    })
  }
}
