import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: [],
})
export class HeaderComponent {
  @Output() navigateEvent = new EventEmitter<string>();

  onSelect(path: string): void {
    this.navigateEvent.emit(path);
  }
}
