
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  @Output() savemodifiedEmployee = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<void>();

  onSaveModification(nom: string, prenom: string, cin: string, age: string, telephone: string, duedate: string, description: string, category: string, pudget: string): void {
    const newEmployeeData = { nom, prenom, cin, age, telephone, duedate, description, category, pudget };
    
    this.savemodifiedEmployee.emit(newEmployeeData);
    this.closePopup.emit();
  }

  closeModal(): void {
    this.closePopup.emit();
  }
}
