import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the BypassSecurityTrustResourceurlPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
   name: 'bypassSecurityTrustResourceurl',
})
export class BypassSecurityTrustResourceurlPipe implements PipeTransform {
   /**
    * Takes a value and makes it lowercase.
    */
   constructor(private domSanitizer: DomSanitizer) { }
   transform(url: string) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
   }
}
