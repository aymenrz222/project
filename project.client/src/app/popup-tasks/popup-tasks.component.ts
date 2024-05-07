import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TacheService } from '../services/tache.service';

@Component({
  selector: 'app-popup-tasks',
  templateUrl: './popup-tasks.component.html',
  styleUrl: './popup-tasks.component.css'
})
export class PopupTasksComponent {
  @Output() saveTask: EventEmitter<void> = new EventEmitter<void>(); 
  @Output() closePopup = new EventEmitter<void>();

  newTaskForm: FormGroup;

  constructor(private taskService: TacheService) {
    this.newTaskForm = new FormGroup({
      nomTache: new FormControl('', Validators.required),
      etat: new FormControl('', Validators.required),
      membre: new FormControl('', Validators.required),
      descriptionTache: new FormControl('', Validators.required),
      dateecheance: new FormControl('', Validators.required)
    });
  }

  onSaveClick(): void {
    const dbase = this.newTaskForm.value;
    this.taskService.addTask(dbase).subscribe(
      (response) => {
        console.log('Task added successfully!', response);
        this.saveTask.emit();
        this.closePopup.emit();
      },
      (error) => {
        console.error('Error adding task:', error);
      }
    );
  }

  closeModal(): void {
    this.closePopup.emit();
  }
}
