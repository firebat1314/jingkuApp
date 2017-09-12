import { Component } from '@angular/core';

/**
 * Generated class for the FooterRightsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'footer-rights',
  templateUrl: 'footer-rights.html'
})
export class FooterRightsComponent {

  text: string;

  constructor() {
    console.log('Hello FooterRightsComponent Component');
    this.text = 'Hello World';
  }

}
