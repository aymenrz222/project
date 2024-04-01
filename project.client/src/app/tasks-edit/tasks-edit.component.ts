import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrl: './tasks-edit.component.css'
})
export class TasksEditComponent {
 
    @Output() savemodifiedEmployee = new EventEmitter<any>();
    @Output() closePopup = new EventEmitter<void>();
  
    onSaveModification(nom: string, prenom: string, age: string, telephone: string,description: string): void {
      const newEmployeeData = { nom, prenom,  age, telephone, description};
      
      this.savemodifiedEmployee.emit(newEmployeeData);
      this.closePopup.emit();
    }
  
    closeModal(): void {
      this.closePopup.emit();
    }
}
