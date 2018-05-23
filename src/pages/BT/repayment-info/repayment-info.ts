import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';
import { preApplyParams } from '../preApplyParams';

/**
 * Generated class for the RepaymentInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'BT/RepaymentInfoPage',
  name: 'BTRepaymentInfoPage'
})
@Component({
  selector: 'page-repayment-info',
  templateUrl: 'repayment-info.html',
})
export class RepaymentInfoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpServ: HttpService,
    private preApplyParams: preApplyParams,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepaymentInfoPage');
  }
  
  ngOnInit(){
    
    
  }
  timer: number;
  ionViewDidEnter() {
    this.timer = setInterval(()=>{
      this.preApplyParams.setStorage()
    }, 5000)
  }
  ionViewDidLeave() {
    clearInterval(this.timer)
  }
  
  submit() {
    this.navCtrl.push('BTRepaymentPersonInfoPage').then(res => {
      this.preApplyParams.setStorage()
    });
  }
}
