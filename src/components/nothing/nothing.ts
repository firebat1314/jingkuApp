import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";

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
  @Input() backgroundImg: string = ''

  constructor(public navCtrl: NavController) {
    console.log('Hello Nothing Component');
  }
  goHome() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(1));
    this.navCtrl.parent.select(0)
  }
}
