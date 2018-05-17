import { Component , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'img-tabs',
  templateUrl:'img-tabs.html'
})
export class ImgTabs {
  @Input() slides: string[] = [];  
  @Input() slidesPerView: number = 5;  
  @Input() selectedIndex: number = 0;  
  @Output() slideClick = new EventEmitter<number>();  
  constructor() {
    console.log('Hello ImgTabs Component');
  }

  ngOnInit() {  
    
  }  
  
  onClick(index) {  
    this.selectedIndex = index;  
    this.slideClick.emit(index);  
  }  
}
