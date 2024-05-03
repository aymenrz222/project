import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TacheService } from '../services/tache.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  newTacheForm: FormGroup;
  taches: Array<{ NomTache: string, etat: string, membre: string, descriptionTache: string, dateecheance: string }> = [];
  filteredTaches: any[] = [];
  searchQuery: string = '';
  openpopup: boolean = false;
  tacheDetails: any;
  showConfirmation: boolean = false;
  tacheToDelete: any;
  showEditPopup: boolean = false;
  tacheToEdit: any;
  currentPage: number = 1;
  entriesPerPage: number = 2;
  sortDirection: number = 1;
  sortField: string = 'NomTache';
  tache:any;
  showPopup: boolean = false;
  showAddPopup: boolean = false;
  isSortedAscending: boolean = true;
  constructor(private tacheService: TacheService) {
    this.newTacheForm = new FormGroup({
      NomTache: new FormControl('', Validators.required),
      etat: new FormControl('', Validators.required),
      membre: new FormControl('', Validators.required),
      descriptionTache: new FormControl('', Validators.required),
      dateecheance: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.Taches();
  }

  Taches(): void {
    this.tacheService.gettache().subscribe((data) => {
      console.log("data", data)
      this.tache = data;
    });
  }

  toggleAddPopup(): void {
    this.showAddPopup = !this.showAddPopup;
  }

  handleClosePopup(): void {
    this.openpopup = false;
    this.showAddPopup = false;
  }

  handeleClosePopup(): void {
    this.openpopup = false;
  }

  closeEditPopup(): void {
    this.showEditPopup = false;
  }

  checkDuplicateTache(NomTache: string): boolean {
    return this.taches.some(tache => tache.NomTache === NomTache);
  }

  addTache(newTacheData: any): void {
    const { NomTache, etat, membre, descriptionTache, dateecheance } = newTacheData;

    const newTache = {
      NomTache: NomTache,
      etat: etat,
      membre: membre,
      descriptionTache: descriptionTache,
      dateecheance: dateecheance,
    };

    this.taches.push(newTache);
  }

  viewTache(tache: any): void {
    this.tacheDetails = tache;
    this.openpopup = true;
  }

  openEditPopup(tache: any): void {
    this.showEditPopup = true;
    this.tacheToEdit = tache;
  }

  saveModifiedTache(newTacheData: any): void {
    const { NomTache, etat, membre, descriptionTache, dateecheance } = newTacheData;

    this.tacheToEdit.NomTache = NomTache;
    this.tacheToEdit.etat = etat;
    this.tacheToEdit.membre = membre;
    this.tacheToEdit.descriptionTache = descriptionTache;
    this.tacheToEdit.dateecheance = dateecheance;

    this.showEditPopup = false;
  }

  deleteTacheConfirmation(tache: any): void {
    this.showConfirmation = true;
    this.tacheToDelete = tache;
  }

  deleteTache(confirmed: boolean): void {
    if (confirmed) {
      const index = this.taches.indexOf(this.tacheToDelete);
      if (index > -1) {
        this.taches.splice(index, 1);
      }
    }
    this.showConfirmation = false;
  }

  searchTache(): void {
    this.filteredTaches = this.taches.filter(tache => {
      return (
        tache.NomTache.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        tache.etat.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        tache.membre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        tache.descriptionTache.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
    this.currentPage = 1;
  }

  displayTacheDetails(tache: any): void {
    const message = `
      Nom de la tâche: ${tache.NomTache}
      État: ${tache.etat}
      Membre: ${tache.membre}
      Description: ${tache.descriptionTache}
      Date d'échéance: ${tache.dateecheance}
    `;
    alert(message);
  }

  getTaches(): Array<any> {
    return this.taches;
  }
}
