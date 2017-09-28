import { Component, Input } from '@angular/core';
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

  @Input() title: string;
  @Input() subtitle: string;

  constructor() {
    console.log('Hello NoGoodsComponent Component');
  }
  
}
