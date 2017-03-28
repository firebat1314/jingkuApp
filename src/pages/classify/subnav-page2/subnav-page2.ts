import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { BrandListPage } from "../../home/brand-list/brand-list";

/*
  Generated class for the SubnavPage2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-subnav-page2',
  templateUrl: 'subnav-page2.html'
})
export class SubnavPage2Page {
  catId: any;

  getChildrenCaCtegory;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService:HttpService
  ) {
    this.catId = this.navParams.get('catId');
  }
  ngOnInit(){
    this.httpService.getChildrenCaCtegory({cat_id:this.catId}).then((res)=>{
      console.log('子分类',res);
      this.getChildrenCaCtegory = res.data;
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SubnavPage2Page');
  }
  ngAfterViewInit() { }
  onEvent(id,e) {
    if (e) {
      e.stopPropagation();
    }
    this.navCtrl.parent.push(BrandListPage,{listId:id})
  }
}