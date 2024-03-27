import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-membre-edit',
  templateUrl: './membre-edit.component.html',
  styleUrl: './membre-edit.component.css'
})
export class MembreEditComponent {
  @Input() employee: any;
  @Output() edited: EventEmitter<any> = new EventEmitter<any>();

  newName: string = '';
  newFirstName: string = '';
  newCin: string = '';

  editEmployee(): void {
    if (this.newName.trim() !== '' && this.newFirstName.trim() !== '' && this.newCin.trim() !== '') {
      if (!Number.isInteger(+this.newCin) || this.newCin.length !== 8) {
        alert('Le nouveau CIN est invalide.');
        return;
      }
      const editedEmployee = {
        ...this.employee,
        name: this.newName,
        firstName: this.newFirstName,
        cin: this.newCin
      };
      this.edited.emit(editedEmployee);
    } else {
      alert('Veuillez entrer des valeurs valides pour le nom, le prénom et le CIN.');
    }
  }
}
