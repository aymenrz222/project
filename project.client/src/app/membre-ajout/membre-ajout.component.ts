import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MembreService } from '../services/membre.service';

@Component({
  selector: 'app-membre-ajout',
  templateUrl: './membre-ajout.component.html',
  styleUrl: './membre-ajout.component.css'
})
export class MembreAjoutComponent {
  @Output() saveMembre: EventEmitter<void> = new EventEmitter <void>(); 
  @Output() closePopup = new EventEmitter<void>();// Output event to close the popup

  newMembreForm: FormGroup; // Form for adding a new member

  constructor(private membreService: MembreService) {
    // Initialize the form with required controls and validators
    this.newMembreForm = new FormGroup({
      Nom: new FormControl('', Validators.required),
      Prenom: new FormControl('', Validators.required),
      Cin: new FormControl('', Validators.required),
      Poste: new FormControl('', Validators.required),
      Telephone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{2}-[0-9]{3}-[0-9]{3}')]),
      Email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSaveClick(): void {
    // Check if the form is valid before emitting the data
   
      const newMemberData = this.newMembreForm.value; // Get form values
      // Call the service method to add member data
      this.membreService.addmembre(newMemberData).subscribe(
        (response) => {
          console.log('Member added successfully!', response);
          this.saveMembre.emit();
          this.closePopup.emit(); // Emit closePopup event to close the popup
        },
        (error) => {
          console.error('Error adding member:', error);
          // Handle the error accordingly, display a message to the user, etc.
        }
      );
    
  }

  closeModal(): void {
    this.closePopup.emit(); // Emit closePopup event to close the popup
  }
}
