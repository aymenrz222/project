import { Component, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { ProjetService } from '../services/projet.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})

export class EditComponent {
   
  @Output() saveProject:EventEmitter<void> = new EventEmitter <void>(); // Événement de sortie pour enregistrer les données du projet
  @Output() closePopup = new EventEmitter<void>(); // Événement de sortie pour fermer le popup
  @Input() data: any;

  newProjectForm:any;
  projectId:any;
  constructor(private projectService: ProjetService) {
  }

  ngOnInit(): void {

    this.newProjectForm = new FormGroup({
      id:new FormControl('', Validators.required),
      titre: new FormControl('', Validators.required),
      projectStatus: new FormControl('', Validators.required),
      client: new FormControl('', Validators.required),
      team: new FormControl(''),
      debutDate: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      description: new FormControl(''),
      categorie: new FormControl(''),
      budget: new FormControl('')
    });

   this.ouvrirModel();
    
  }

  ouvrirModel(){
    this.newProjectForm.patchValue(this.data);
  }

onSaveModification(): void {
  this.newProjectForm.id = this.data.id;
  const data= this.newProjectForm.value;
 // Obtenir les valeurs du formulaire
  this.projectService.updateProject(data).subscribe(
    (response) => {
      console.log('Project added successfully!', response);
      this.saveProject.emit(); // Émettre les données du nouveau projet via l'événement saveProject
      this.closePopup.emit(); // Émettre l'événement closePopup pour fermer le popup
    },
    (error) => {
      console.error('Error adding project:', error);
      // Traitez l'erreur en conséquence, affichez un message à l'utilisateur, etc.
    }
  );

}

  closeModal(): void {
    this.closePopup.emit();
  }
}