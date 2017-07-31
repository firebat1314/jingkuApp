import { Component } from '@angular/core';
import { IonicPage } from "ionic-angular";

/**
 * Generated class for the NoGoodsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'no-goods',
  templateUrl: 'no-goods.html'
})
export class NoGoodsComponent {

  text: string;

  constructor() {
    console.log('Hello NoGoodsComponent Component');
  }

}
