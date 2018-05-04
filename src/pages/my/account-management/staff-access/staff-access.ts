import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Events } from 'ionic-angular';

/**
 * Generated class for the StaffAccessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  segment:"staff-access/:authority/:is_myself"
})
@Component({
  selector: 'page-staff-access',
  templateUrl: 'staff-access.html',
})
export class StaffAccessPage {
  arr = [
    { 'label': '允许查看价格', 'value': '1', checked: false },
    { 'label': '允许结算', 'value': '2', checked: false },
    { 'label': '允许添加员工', 'value': '3', checked: false },
    { 'label': '允许查看员工信息', 'value': '4', checked: false },
  ]
  authority = this.navParams.get('authority');
  is_myself = this.navParams.get('is_myself');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffAccessPage');
  }

  ngOnInit() {
    if (Object.prototype.toString.call(this.authority) !== '[object Array]') {
      this.navCtrl.pop().catch(res => {
        history.back();
      })
    }
    for (let i = 0; i < this.arr.length; i++) {
      const item = this.arr[i];
      for (let i = 0; i < this.authority.length; i++) {
        if (this.authority[i] == item.value)
          item.checked = true
      }
    }
  }
  ionViewWillLeave() {
    this.authority = [];
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].checked) {
        this.authority.push(this.arr[i].value)
      }
    }
    this.events.publish('staff:access',this.authority)
  }
}
