import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';


import { PopoverContentPage } from "./popover-content/popover-content"
/*
  Generated class for the DredgeMoreCity page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dredge-more-city',
  templateUrl: 'dredge-more-city.html'
})
export class DredgeMoreCityPage {
  private image1;
  private image2;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popover: PopoverController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DredgeMoreCityPage');
  }
  opanNative(type) {
    let popover = this.popover.create(PopoverContentPage);
    popover.onDidDismiss((imageData)=>{
      if(imageData){
        console.log(imageData)
        if(type){
          this.image2 = 'data:image/jpeg;base64,' + imageData.image;
        }else{
          this.image1 = 'data:image/jpeg;base64,' + imageData.image;
        }
      }
    })
    popover.present();
  }

}
