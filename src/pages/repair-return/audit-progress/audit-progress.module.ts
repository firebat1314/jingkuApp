import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuditProgressPage } from './audit-progress';

@NgModule({
  declarations: [
    AuditProgressPage,
  ],
  imports: [
    IonicPageModule.forChild(AuditProgressPage),
  ],
  exports: [
    AuditProgressPage
  ]
})
export class AuditProgressPageModule {}
