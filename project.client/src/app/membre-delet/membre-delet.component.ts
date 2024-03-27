import { Component, input,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-membre-delet',
  templateUrl: './membre-delet.component.html',
  styleUrl: './membre-delet.component.css'
})
export class MembreDeletComponent {
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  confirmDelete(): void {
    this.confirmed.emit(true);
  }

  cancelDelete(): void {
    this.confirmed.emit(false);
}
}
