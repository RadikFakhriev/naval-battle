import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[aim]'
})
export class AimDirective {

  @Output() selected = new EventEmitter<string>();

  @HostListener('click', ['$event'])
  clicked($event) {
    let node = $event.target;
    let cell;
    
    if (node.tagName === 'TD') {
      cell = node.dataset.cell;
      this.selected.emit(cell);
    }
  }

  constructor() { }

}
