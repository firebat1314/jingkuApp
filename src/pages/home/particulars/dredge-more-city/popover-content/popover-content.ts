import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage } from 'ionic-angular';
import { Native } from "../../../../../providers/native";

/*
  Generated class for the PopoverContent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-popover-content',
  templateUrl: 'popover-content.html'
})
export class PopoverContentPage {
  imgType;
  image;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    public native: Native,
  ) {}
  ngOnInit() {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverContentPage');
  }
  openCamera() {
    this.native.getPictureByCamera({allowEdit:false}).then((data) => {
      this.image = data;
      this.close()
    })
  }
  openPhotoAlbum() {
    this.native.getPictureByPhotoLibrary({allowEdit:false}).then((data) => {
      this.image = data;
      this.close()
    })
  }
  close() {
    this.view.dismiss({
      image: this.image
    });
  }
}
