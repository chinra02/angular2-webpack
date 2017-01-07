import { ElementRef, HostListener, Directive} from '@angular/core';

@Directive({
    selector: 'div[auto-size]'
})

export class AutoSize {
 @HostListener('input', ['$event.target'])
  onInput(div: HTMLDivElement): void {
    this.adjust();
  }
  constructor(public element: ElementRef){
  }
  ngAfterContentChecked(): void{
    this.adjust();
  }
  adjust(): void{
    this.element.nativeElement.style.overflow = 'hidden';
    this.element.nativeElement.style.height = 'auto';
    this.element.nativeElement.style.height = this.element.nativeElement.scrollWeight + 'px';
    this.element.nativeElement.style.weight = 'auto';
    this.element.nativeElement.style.weight = this.element.nativeElement.scrollWeight + 'px';
  }
}
