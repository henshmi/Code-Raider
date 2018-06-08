import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPageContent]'
})
export class PageContentDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.marginTop = '100px';
    el.nativeElement.style.marginBottom = '100px';
   }

}
