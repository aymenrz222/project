import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-membre-edit',
  templateUrl: './membre-edit.component.html',
  styleUrl: './membre-edit.component.css'
})
export class MembreEditComponent {
  @Output() savemodifiedEmployee = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<void>();

  onSaveModification(nom: string, prenom: string, cin: string, age: string, telephone: string, duedate: string): void {
    const newEmployeeData = { nom, prenom, cin, age, telephone, duedate};
    
    this.savemodifiedEmployee.emit(newEmployeeData);
    this.closePopup.emit();
  }

  closeModal(): void {
    this.closePopup.emit();
  }
}

