import { Component, Input } from '@angular/core';
import { NavController,Tabs } from "ionic-angular";

/*
  Generated class for the Nothing component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'nothing',
  templateUrl: 'nothing.html'
})
export class NothingComponent {
  @Input() title: string = '暂无商品';
  @Input() text: string = '去挑选你喜欢的商品吧~';
  @Input() backgroundImg: string = 'url(./assets/images/images/list.png)'

  constructor(public navCtrl: NavController) {
    console.log('Hello Nothing Component');
  }
  goHome() {
    this.navCtrl.popToRoot();
    this.navCtrl.parent.select(0,{animate:true,direction:'forward'})
  }
}
