// fixed-checkbox.directive.ts
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFixedCheckbox]'
})
export class FixedCheckboxDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  handleScroll(event: Event) {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition >= this.el.nativeElement.offsetTop) {
      this.renderer.addClass(this.el.nativeElement, 'fixed');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'fixed');
    }
  }
}
