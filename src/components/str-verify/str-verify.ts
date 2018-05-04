import { Component, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../providers/http-service';

/**
 * Generated class for the StrVerifyComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'str-verify',
  templateUrl: 'str-verify.html'
})
export class StrVerifyComponent {

  verifyImg: string;
  skey: any;
  
  @Output() skeyChange: EventEmitter<string> = new EventEmitter<string>();
  
  constructor(
    public httpService: HttpService,
    
  ) {
    console.log('Hello StrVerifyComponent Component');
  }

  ngOnInit(){
    this.getSkey();
  }

  getSkey() {
    this.httpService.getVerificationImg({
      fontSize: 14,
      length: 4,
      useNoise: 0,
      codeSet: 0,
    }).then((data) => {
      if (data.status == 1) {
        this.skey = data.data.skey;
        this.getImg()
      }
    })
  }
  getImg() {
    this.httpService.getVerificationImg({
      fontSize: 14,
      length: 4,
      useNoise: 0,
      codeSet: 0,
      skey: this.skey
    }).then((data) => {
      if (data.status == 1) {
        this.skey = data.data.skey;
        this.skeyChange.emit(this.skey);
        this.verifyImg = data.data.captcha + '?' + Math.random();
      }
    });
  }
}
