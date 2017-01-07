import { Directive, HostListener, EventEmitter, Output, ElementRef } from '@angular/core';
@Directive({
    selector: '[closeOutSide]'
})
export class ModalEventsDirective {

    @Output() closeOutSide: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _elementRef: ElementRef) {
    }

    isModalOpen=false;

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement, event: any) {
        console.log('document:click triggered');
        if (this.isModalOpen) {
            const clickedInside = this._elementRef.nativeElement.contains(targetElement);
            if (!clickedInside) {
                this.closeOutSide.emit(event);
                this.isModalOpen=false;
               
            }
        }
        else{
            this.isModalOpen=true;
        }

    }

    @HostListener('keydown.esc', ['$event'])
    public onEsc(event: any): void {
        console.log(event);
        this.closeOutSide.emit(event);
        
    }

}