import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TacheService } from '../services/tache.service';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrl: './tasks-edit.component.css'
})
export class TasksEditComponent {
  @Output() saveModifiedTask: EventEmitter<any> = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<void>();
  @Input() dbase: any;

  newTaskForm: any;

  constructor(private tacheService: TacheService) { }

  ngOnInit(): void {
    this.newTaskForm = new FormGroup({
      tacheId: new FormControl('', Validators.required),
      nomTache: new FormControl('', Validators.required),
      etat: new FormControl('', Validators.required),
      membre: new FormControl('', Validators.required),
      descriptionTache: new FormControl('', Validators.required),
      dateecheance: new FormControl('', [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')])
    });
    this.openModel();
  }

  openModel(): void {
    this.newTaskForm.patchValue(this.dbase);
  }

  onSaveModification(): void {
    this.newTaskForm.value. teamId = this.dbase. tacheId;
    const dbase = this.newTaskForm.value;
    this.tacheService.updateTask(dbase).subscribe(
      (response) => {
        console.log('Task updated successfully!', response);
        this.saveModifiedTask.emit();
        this.closePopup.emit();
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }

  closeModal(): void {
    this.closePopup.emit();
  }
}