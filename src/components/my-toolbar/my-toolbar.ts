import { Component, ElementRef } from '@angular/core';

/*
  Generated class for the MyToolbar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'my-toolbar',
  templateUrl: 'my-toolbar.html'
})
export class MyToolbarComponent {

  text: string;

  constructor(
    public element: ElementRef
  ) {
    console.log('Hello MyToolbar Component');
  }
  ngAfterViewInit(){
    // console.log(this.element)
  }
  click(event){
    console.log(event)
  }
}
