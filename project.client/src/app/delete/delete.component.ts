import { Component,Input, EventEmitter, Output } from '@angular/core';
import { ProjetService } from '../services/projet.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() data: any;
  

  constructor(private projectService: ProjetService) { }
  ngOnInit(){
    console.log('open pop-up' , this.data)
  }
  confirmDelete(): void {
    // Assuming you have an id for the member to delete
    
    this.projectService.deleteProject(this.data.id).subscribe(() => {
      // Gérer le succès si nécessaire
      console.log('Supprimé avec succès');
    }, (error) => {
      // Gérer l'erreur si nécessaire
      console.error('Erreur lors de la suppression ', error);
    });
    this.confirmed.emit(true);;
  }

  cancelDelete(): void {
    this.confirmed.emit(false);
  }
}
