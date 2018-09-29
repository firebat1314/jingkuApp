import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Events, AlertController } from 'ionic-angular';
import { HttpService } from "../../../../../providers/http-service";

/**
 * Generated class for the BusinessmenNotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment: 'businessmen-note/:dId'
})
@Component({
  selector: 'page-businessmen-note',
  templateUrl: 'businessmen-note.html',
})
export class BusinessmenNotePage {
  badge: { name: string; selected: number; }[];
  data: any;
  callback: any;
  badgeStr: Array<string> = [];
  dId: any = this.navParams.get('dId');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public events: Events,
    public alertCtrl: AlertController,
  ) {
    /* this.callback = this.navParams.get('callback')
    console.log(this.callback)
    this.callback('sss').then((res)=>{
      // console.log(res)
    }) */
    this.getData();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessmenNotePage');
  }
  ionViewWillLeave() {
    /* this.writeNotes().then(() => {

    }, () => {

    }) */
  } /* 
   ionViewCanLeave() {
    return this.writeNotes().then(() => {
      this.events.publish('writeOrder:refresh');
      return true
    }, () => {
      return this.alertCtrl.create({
        cssClass: 'alert-style',
        title: '没有填写备注，是否继续填写',
        buttons: [
          {
            text: '取消',
            handler: () => {
              return true
            }
          },
          {
            text: '确认',
            handler: () => {
              return false
            }
          }
        ],
      }).present();
    })
  }  */
  getData() {
    if (this.dId > 0) {
      return this.httpService.checkout_d({ id: this.dId }).then((res) => {
        this.data = res;
      })
    } else {
      return this.httpService.checkout().then((res) => {
        this.data = res;
      })
    }
  }
  checkBadge(i, suppliers_id) {
    let arr: Array<any> = this.data.suppliers_label[suppliers_id];
    let index = arr.indexOf(i);
    if (index > -1) {
      arr.splice(index, 1);
    } else {
      arr.push(i)
    }
    console.log(this.data.suppliers_label)

  }
  is_select(index, suppliers_id) {
    for (var i = 0, arr = this.data.suppliers_label[suppliers_id]; i < arr.length; i++) {
      if (arr[i] == index) {
        return true
      }
    }
  }
  writeNotes() {
    if (this.dId > 0) {
      let commentArr = this.data.suppliers_notes;
      var sArr = []
      for (var j = 0; j < this.data.order_label.length; j++) {
        if (this.data.order_label[j].selected) {
          sArr.push(j)
        }
      }
      return new Promise((resolve, reject) => {
        this.httpService.write_notes_d({
          notes: {
            note: commentArr,
            label: sArr
          },
          id: this.dId
        }).then((res) => {
          if (res.status == 1) {
            this.events.publish('writeOrder:refresh');
            resolve();
          } else {
            this.events.publish('writeOrder:refresh');
            reject();
          }
        })
      })
    } else {
      let commentArr = [];
      let suppliers = [];
      let label = [];

      for (let i = 0; i < this.data.cart_goods_list.length; i++) {
        var sArr = []
        commentArr.push(this.data.suppliers_notes[this.data.cart_goods_list[i].suppliers_id])
        suppliers.push(this.data.cart_goods_list[i].suppliers_id);
        for (var j = 0; j < this.data.cart_goods_list[i].order_label.length; j++) {
          if (this.data.cart_goods_list[i].order_label[j].selected) {
            sArr.push(j)
          }
        }
        label.push(sArr)
      }
      return new Promise((resolve, reject) => {
        this.httpService.writeNotes({
          notes: {
            note: commentArr,
            suppliers: suppliers,
            label: label
          }
        }).then((res) => {
          if (res.status == 1) {
            this.events.publish('writeOrder:refresh');
            resolve();
          } else {
            this.events.publish('writeOrder:refresh');
            reject();
          }
        })
      })
    }
  }
  pagePop() {
    this.writeNotes().then(() => {
      this.navCtrl.pop().catch(res => { history.back() });
    }, () => {

    })
  }
}
