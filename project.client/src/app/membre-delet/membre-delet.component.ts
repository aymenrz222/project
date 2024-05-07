import { Component, Output, EventEmitter,Input } from '@angular/core';
import { MembreService } from '../services/membre.service';


@Component({
  selector: 'app-membre-delet',
  templateUrl: './membre-delet.component.html',
  styleUrl: './membre-delet.component.css'
})
export class MembreDeletComponent {
 @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() database : any;

  constructor(private membreService: MembreService) {}
  ngOnInit(){
    console.log('open pop-up' , this.database)
  }
  confirmDelete(): void {
    
    this.membreService.deletemembre(this.database. teamId).subscribe(() => {
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
