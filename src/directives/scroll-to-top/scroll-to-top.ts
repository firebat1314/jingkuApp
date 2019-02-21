import { Directive, EventEmitter, ElementRef, Renderer, ChangeDetectorRef, forwardRef, Inject } from '@angular/core';
import { Content } from 'ionic-angular';

/**
 * Generated class for the ScrollToTopDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[scroll-to-top]', // Attribute selector
  host: { '(click)': 'onClick()' },
})
export class ScrollToTopDirective {
  timer: number;
  constructor(public element: ElementRef, public renderer: Renderer, public ref: ChangeDetectorRef, @Inject(forwardRef(() => Content)) public content: Content
  ) {
    console.log('Hello ScrollToTopDirective Directive');

  }
  ngAfterViewInit() {
    this.renderer.setElementClass(this.element.nativeElement, 'fab-button-fadeout', true);
    this.content.ionScroll.subscribe((d) => {
      if (d) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.renderer.setElementClass(this.element.nativeElement, "fab-button-fadeout", true);
        }, 1000);
        this.renderer.setElementClass(this.element.nativeElement, "fab-button-fadein", d.scrollTop >= d.contentHeight);
        this.renderer.setElementClass(this.element.nativeElement, "fab-button-fadeout", d.scrollTop < d.contentHeight);
      }
    });
  }

  onClick() {
    this.content.scrollToTop();
  }
}
