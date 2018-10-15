import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[availabilityIndicator]'
})
export class AvailabilityIndicator {
  @Input() set availabilityIndicator(value){
    this.el.nativeElement.style.borderRadius = '30px';
    if(value) {
      this.el.nativeElement.style.backgroundColor = 'green';
    } else {
      this.el.nativeElement.style.backgroundColor = 'red';
    }
  };
  constructor(private el: ElementRef) {
  }
}
