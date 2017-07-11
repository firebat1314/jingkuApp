import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

/**
 * Generated class for the ApplyServicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-apply-service',
  templateUrl: 'apply-service.html',
})
export class ApplyServicePage {

  data: any = this.navParams.data;
  picArr: Array<any>;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
  ) {
    console.log(this.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyServicePage');
  }

  openCamra() {
    this.native.getMultiplePicture({
      outputType: 1,
      maximumImagesCount: 5
    }).then((data) => {
      if (data instanceof Array) {
        if(this.picArr.concat(data).length>5){
          this.native.showToast('最多选择5张');
          this.picArr = this.picArr.concat(data).slice(0,5);
        }else{
          this.picArr.concat(data);
        }
      }
    })
  }
  deletePic(i){
    this.picArr.splice(i,1);
  }
}
