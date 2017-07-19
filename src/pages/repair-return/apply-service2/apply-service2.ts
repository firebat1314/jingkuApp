import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ApplyService2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-apply-service2',
  templateUrl: 'apply-service2.html',
})
export class ApplyService2Page {

  data = this.navParams.data;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navCtrl.indexOf(this.navCtrl.getActive()))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyService2Page');
  }
  goAuditProgressPage(){
    this.navCtrl.push('AuditProgressPage').then(()=>{
      this.navCtrl.remove(1,2);
    });
  }
  goRepairReturnPage(){
    this.navCtrl.remove(1,2);
  }
}
