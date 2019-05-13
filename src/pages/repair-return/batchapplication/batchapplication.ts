import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from '../../../providers/native';

/**
 * Generated class for the ServiceOrderDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment:'batchapplication'
})
@Component({
  selector: 'batchapplication',
  templateUrl: 'batchapplication.html',
})
export class batchapplicationPage {

  return_id = this.navParams.get('return_id');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
    public events: Events,
  ) {}
  ngOnInit() {
 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceOrderDetailsPage');
  }


}
