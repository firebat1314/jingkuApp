import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginByPhonePage } from './login-by-phone';

@NgModule({
   declarations: [
      LoginByPhonePage,
   ],
   imports: [
      IonicPageModule.forChild(LoginByPhonePage),
   ],
   exports: [
      LoginByPhonePage
   ]
})
export class LoginByPhonePageModule { }
