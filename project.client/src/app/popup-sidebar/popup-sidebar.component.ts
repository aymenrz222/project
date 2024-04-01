import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup-sidebar',
  templateUrl: './popup-sidebar.component.html',
  styleUrl: './popup-sidebar.component.css'
})
export class PopupSidebarComponent {
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
  onSaveClick( prenom: string): void {
    const newEmployeeData = {  prenom };
    this.saveEmployee.emit(newEmployeeData);
    // Emit the closePopup event to notify the parent component to close the popup
  
  
    this.closePopup.emit();
  }
  closeModal(): void {
  this.closePopup.emit();
  }
}
