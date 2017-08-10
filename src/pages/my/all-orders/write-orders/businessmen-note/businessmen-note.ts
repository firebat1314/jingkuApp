import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Events } from 'ionic-angular';
import { HttpService } from "../../../../../providers/http-service";

/**
 * Generated class for the BusinessmenNotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment: 'businessmen-note'
})
@Component({
  selector: 'page-businessmen-note',
  templateUrl: 'businessmen-note.html',
})
export class BusinessmenNotePage {
  data: any;
  callback: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public events: Events,
  ) {
    /* this.callback = this.navParams.get('callback')
    console.log(this.callback)
    this.callback('sss').then((res)=>{
      console.log(res)
    }) */
    this.getData();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessmenNotePage');
  }
  ionViewWillLeave() {
    this.writeNotes()
  }
  getData() {
    return this.httpService.checkout().then((res) => {
      this.data = res;
      this.data.suppliers_notes = {};
    })
  }
  writeNotes() {
    let commentArr = [];
    let suppliers = [];
    for (var i in this.data.suppliers_notes) {
      if (this.data.suppliers_notes[i]) {
        commentArr.push(this.data.suppliers_notes[i])
        suppliers.push(i)
      }
    }
    this.httpService.writeNotes({
      notes: {
        note: commentArr,
        suppliers: suppliers
      }
    }).then((res) => {
      if (res.status == 1) {
        this.events.publish('writeOrder:refresh');
      }
    })
  }
}
