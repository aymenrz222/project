import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TacheService } from '../services/tache.service';

@Component({
  selector: 'app-tasks-delete',
  templateUrl: './tasks-delete.component.html',
  styleUrls: ['./tasks-delete.component.css']
})
export class TasksDeleteComponent {
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() dbase: any;

  constructor(private tacheService: TacheService) {}

  ngOnInit(){
    console.log('open pop-up' , this.dbase)
  }

  confirmDelete(): void {
    this.tacheService.deletetache(this.dbase. tacheId).subscribe(
      (response) => {
        console.log('Supprimé avec succès',response);
      },
      (error) => {
        console.error('Erreur lors de la suppression de la tâche', error);
      }
    );
    this.confirmed.emit(true);
  }

  cancelDelete(): void {
    this.confirmed.emit(false);
  }
}
