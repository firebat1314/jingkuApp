import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the BypassSecurityTrustHtmlPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'bypassSecurityTrustHtml',
})
export class BypassSecurityTrustHtmlPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer){}
    transform(html: string, args: any[]): any {
        return this.domSanitizer.bypassSecurityTrustHtml(html);
    }
}
