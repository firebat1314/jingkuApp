import { Component, Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';

/**
 * Generated class for the VerificationImgComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */

@IonicPage()
@Component({
  selector: 'verification-img',
  templateUrl: 'verification-img.html'
})
export class VerificationImgComponent {

  @Input() type:string;
  
  constructor() {
    console.log('Hello VerificationImgComponent Component');
  }

}
