import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MembreService } from '../services/membre.service';

@Component({
  selector: 'app-membre-edit',
  templateUrl: './membre-edit.component.html',
  styleUrls: ['./membre-edit.component.css']
})
export class MembreEditComponent {

  @Output() saveModifiedMember: EventEmitter<any> = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<void>();
  @Input() database: any;

  newMemberForm: any;

  constructor(private membreService: MembreService) { }

  ngOnInit(): void {
    this.newMemberForm = new FormGroup({
    id: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    cin: new FormControl('', Validators.required),
    poste: new FormControl('', Validators.required),
    telephone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{2}-[0-9]{3}-[0-9]{3}')]),
    email: new FormControl('', [Validators.required, Validators.email])
  });
    this.ouvrirModel();
  }

  ouvrirModel(): void {
    this.newMemberForm.patchValue(this.database);
  }

  onSaveModification(): void {
    this.newMemberForm.value.id = this.database.id;
    const database = this.newMemberForm.value;

    this.membreService.updatemembre(database).subscribe(
      (response) => {
        console.log('Member updated successfully!', response);
        this.saveModifiedMember.emit();
        this.closePopup.emit();
      },
      (error) => {
        console.error('Error updating member:', error);
        // Handle error appropriately, show message to user, etc.
      }
    );
  }

  closeModal(): void {
    this.closePopup.emit();
  }
}