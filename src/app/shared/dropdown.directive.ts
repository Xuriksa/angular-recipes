import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  isOpen = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        
    this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;        
    const dropdownMenu = this.renderer.nextSibling(this.elementRef.nativeElement);
    
    if(this.isOpen) {
      this.renderer.addClass(dropdownMenu, 'show');      
    } else {
      this.renderer.removeClass(dropdownMenu, 'show');
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
}
