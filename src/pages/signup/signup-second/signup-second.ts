import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

/*
  Generated class for the SignupSecond page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-signup-second',
  templateUrl: 'signup-second.html'
})
export class SignupSecondPage {
  file: File;
  provinceList: any;
  cityList: any;
  districtList: any;

  formData = {
    step: 'two',
    user_name: '',
    true_name: '',
    qq: '',
    company: '',
    province: '',
    city: '',
    district: '',
    zhizhao: '',
    parent_id:''
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native
  ) { }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupSecondPage');
    this.formData.user_name = this.navParams.get("user_name");
    this.httpService.changeRegion({ type: 1, parent_id: 1 }).then((res) => {
      console.log(res);
      this.provinceList = res.data;
    })
  }
  provinceChange(id) {
    this.httpService.changeRegion({ type: 2, parent_id: id }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.cityList = res.data;
        this.formData.city = '';
        this.formData.district = '';
      }
    })
  }
  cityChange(id) {
    this.httpService.changeRegion({ type: 3, parent_id: id }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.districtList = res.data;
      }
    })
  }
  onFileChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
    console.log(this.file);
  }
  toLoginPage() {
    this.navCtrl.push('LoginPage')
  }
  openFile(e) {
    if(!e){return;}
    var reader = new FileReader();
    //获取文件
    var file = e['files'][0];
    var imageType = /^image\//; 
    //是否是图片
    if (!imageType.test(file['type'])) {
      this.native.showToast("请选择图片！");
      return;
    }
    //读取完成
    reader.onload =  (e)=> {
      //获取图片dom
      var img_ava = e.target['result'];
      this.formData.zhizhao = img_ava;
    };
    reader.readAsDataURL(file);
  }
  onSubmit() {
    this.httpService.signupTwo(this.formData).then((res) => {
      if (res.status == 1) {
        this.native.showToast(res.info);
        this.navCtrl.push('SignupThirdPage');
      }
    })
  }
  goHelperDetailsPage() {
    this.navCtrl.push('HelperDetailsPage',{item:{article_id:35}})
  }

}
