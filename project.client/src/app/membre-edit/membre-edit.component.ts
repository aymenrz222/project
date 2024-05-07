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

  newMembreForm: any;

  constructor(private membreService: MembreService) { }

  ngOnInit(): void {
    this.newMembreForm = new FormGroup({
    teamId:new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    cin: new FormControl('', Validators.required),
    poste: new FormControl(''),
    telephone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{2}-[0-9]{3}-[0-9]{3}')]),
    email: new FormControl('', [Validators.required, Validators.email])
  });
    this.ouvrirModel();
  }

  ouvrirModel(): void {
    this.newMembreForm.patchValue(this.database);
  }

  onSaveModification(): void {
    this.newMembreForm.value. teamId = this.database. teamId;
    const database = this.newMembreForm.value;

    this.membreService.updatemembre(database).subscribe(
      (response) => {
        console.log('Member updated successfully!', response);
        this.saveModifiedMember.emit(database);
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