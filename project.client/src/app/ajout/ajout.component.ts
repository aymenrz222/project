import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProjetService } from '../services/projet.service';

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css']
})
export class AjoutComponent {
  
  @Output() saveProject:EventEmitter<void> = new EventEmitter <void>(); // Événement de sortie pour enregistrer les données du projet
  @Output() closePopup = new EventEmitter<void>(); // Événement de sortie pour fermer le popup

  newProjectForm: FormGroup; // Formulaire de nouveau projet

  constructor(private projectService: ProjetService , private formBuilder : FormBuilder) {
    // Initialiser le formulaire avec les contrôles requis et les validateurs
    this.newProjectForm = this.formBuilder.group({
      titre: ['', Validators.required],
      projectStatus: new FormControl('', Validators.required),
      client: new FormControl('', Validators.required),
      team: new FormControl(''),
      debutDate: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      description: new FormControl(''),
      categorie: new FormControl(''),
      budget: new FormControl('')
    });
    
  }

  onSaveClick(): void {
    // Vérifier si le formulaire est valide avant d'émettre les données
    
      const newProjectData = this.newProjectForm.value; // Obtenir les valeurs du formulaire
      this.projectService.addData(newProjectData).subscribe(
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
    this.closePopup.emit(); // Émettre l'événement closePopup pour fermer le popup
  }
}
