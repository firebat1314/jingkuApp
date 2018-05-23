import { Injectable } from "@angular/core";
import { HttpService } from "../../providers/http-service";

@Injectable()

export class preApplyParams {

   params: any = {
      app_amt: null,
      app_term: null,
      loan_use: null,
      com_name: null,
      business_area: null,
      business_address: null,
      com_code: null,
      local_work_time: null,
      education: null,
      marital_status: null,
      child_status: null,
      residential_area: null,
      residential_address: null,
      house_type: null,
      contact_info: [
         {
            contact_name: null,
            contact_relation: null,
            contact_mobile: null
         }, {
            contact_name: null,
            contact_relation: null,
            contact_mobile: null
         }
      ],
      email: null
   };
   constructor(
      private httpServ: HttpService,
   ) {
      console.log('Hello preApplyParams Provider')
      this.getStorage();
   }
   setStorage() {
      console.log('save preApply...')
      this.httpServ.getByName('BT').then(res => {
         this.httpServ.setByName('BT', Object.assign(res || {}, { preApply: this.params }));
      })
   }
   getStorage() {
      this.httpServ.getByName('BT').then(res => {
         if (res && 'preApply' in res) this.params = res.preApply;
      })
   }
   rmStorage() {
      this.httpServ.rmByName('BT');
   }
}