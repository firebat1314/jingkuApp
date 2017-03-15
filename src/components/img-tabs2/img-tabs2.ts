import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ParticularsPage } from "../../pages/home/particulars/particulars";

/*
  Generated class for the ImgTabs2 component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'img-tabs2',
  templateUrl: 'img-tabs2.html'
})
export class ImgTabs2Component {
  selectedIndex: number = 0;

  @Input("slides") slides = [];
  @Input("pageNumber") pageNumber: number = 5;
  @Output("slideClick") slideClick = new EventEmitter<number>();
  constructor(
    public navCtrl:NavController
  ) {
    console.log('Hello ImgTabs2 Component');
  }
  goParticulars(){
    this.navCtrl.push(ParticularsPage,{
      goodsId:this.slides[this.selectedIndex].id
    })
  }
  onClick(index) {
    this.selectedIndex = index;
    this.slideClick.emit(index);
  }
}
