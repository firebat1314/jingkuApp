import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DirectiveTestPage } from "./directive-test";
import { MyDirectiveModule } from "../../directives/my-directive/my-directive.module";

@NgModule({
  declarations: [DirectiveTestPage],
  imports: [
    IonicPageModule.forChild(DirectiveTestPage),
    MyDirectiveModule
  ]
})

export class DirectiveTestPageModule { }