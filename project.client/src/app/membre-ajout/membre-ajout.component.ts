import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-membre-ajout',
  templateUrl: './membre-ajout.component.html',
  styleUrl: './membre-ajout.component.css'
})
export class MembreAjoutComponent {
  @Output() savemember = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<void>(); // New event to close the popup

  onSaveClick(nom: string, prenom: string, cin: string, age: string, telephone: string, email: string): void {
    const newMemberData = { nom, prenom, cin, age, telephone, email };
    this.savemember.emit(newMemberData);
    // Emit the closePopup event to notify the parent component to close the popup
    
    this.closePopup.emit();
  }
  closeModal(): void {
  this.closePopup.emit();
}
}
