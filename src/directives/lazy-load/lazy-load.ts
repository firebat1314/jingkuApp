import { Directive, Renderer2, ElementRef, EventEmitter, Output, Input, OnInit, OnDestroy } from '@angular/core';
import { ImgcacheProvider } from '../../providers/imgcache/imgcache';

/**
 * Generated class for the LazyLoadDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[lazy-load]' // Attribute selector
})
export class LazyLoadDirective implements OnInit, OnDestroy {

  @Input('lazy-load') src = '';
  @Output() loaded = new EventEmitter();

  public loadEvent: any;
  public errorEvent: any;

  constructor(
    public el: ElementRef,
    public imgCacheService: ImgcacheProvider,
    public renderer: Renderer2
  ) { }
  
  ngOnInit() {
    // get img element
    const nativeElement = this.el.nativeElement;
    const render = this.renderer;
    // add load listener
    this.loadEvent = render.listen(nativeElement, 'load', () => {
      render.addClass(nativeElement, 'loaded');
      this.loaded.emit();
    });
    this.errorEvent = render.listen(nativeElement, 'error', () => {
      nativeElement.remove();
    });
    // cache img and set the src to the img
    this.imgCacheService.cacheImg(this.src).then((value) => {
      render.setAttribute(nativeElement, 'src', value);
    });
  }
  /* ngOnChanges(){

  } */
  
  ngOnDestroy() {
    // remove listeners
    this.loadEvent();
    this.errorEvent();
  }
}
