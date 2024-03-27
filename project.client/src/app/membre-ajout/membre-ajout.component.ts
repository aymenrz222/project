import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-membre-ajout',
  templateUrl: './membre-ajout.component.html',
  styleUrl: './membre-ajout.component.css'
})
export class MembreAjoutComponent {
 
  @Output() saveEmployee = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<void>(); // New event to close the popup
  newEmployeeData = {
    status: '' // Initialisez status avec une valeur par défaut, ou laissez-le vide pour l'instant
    // Ajoutez d'autres propriétés de newEmployeeData si nécessaire
  };
  hoveredStatus: string = '';
  
  setHoveredStatus(status: string) {
    this.hoveredStatus = status;
  }
  onSaveClick(nom: string, prenom: string, cin: string, age: string, telephone: string, duedate: string): void {
    const newEmployeeData = { nom, prenom, cin, age, telephone, duedate };
    this.saveEmployee.emit(newEmployeeData);
    // Emit the closePopup event to notify the parent component to close the popup
  
  
    this.closePopup.emit();
  }
  closeModal(): void {
  this.closePopup.emit();
  }
}
