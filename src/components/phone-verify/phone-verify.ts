import { Component, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../providers/http-service';

/**
 * Generated class for the PhoneVerifyComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'phone-verify',
  templateUrl: 'phone-verify.html'
})
export class PhoneVerifyComponent {

  @Input() type:string;
  @Input() mobile:string;
  @Input() skey:string;
  @Input() verify:string;
  @Output() verifyStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public httpServ: HttpService,
  ) {
    console.log('Hello PhoneVerifyComponent Component');
  }

  private wait: number = 60;
  private disabled: Boolean = false;
  private value: String = '发送验证码';
  private timer: any;
  private time() {
    if (this.wait == 0) {
      this.disabled = false;
      this.timer = null;
      this.value = "发送验证码";
      this.wait = 60;
      return;
    } else {
      this.disabled = true;
      this.value = "(" + this.wait + ")秒后重新发送";
      let self = this;
      this.timer = setTimeout(function () {
        self.wait--;
        self.time();
      }, 1000)
    }
  }
  
	getMobileCode() {
		this.httpServ.getMobileCode({
			type: this.type||'mind',
			mobile: this.mobile,
			verify: this.verify,
			skey: this.skey
		}).then(data => {
			if (data.status) {
        this.time();
        this.verifyStatus.emit(true);
			} else {
        this.verifyStatus.emit(false);
			}
		})
	}
}
