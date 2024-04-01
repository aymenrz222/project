import { Component, input,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tasks-delete',
  templateUrl: './tasks-delete.component.html',
  styleUrl: './tasks-delete.component.css'
})
export class TasksDeleteComponent {
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  confirmDelete(): void {
    this.confirmed.emit(true);
  }

  cancelDelete(): void {
    this.confirmed.emit(false);
}
}
