import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjetService } from '../services/projet.service';

@Component({
  selector: 'app-list-projet',
  templateUrl: './list-projet.component.html',
  styleUrls: ['./list-projet.component.css']
})
export class ListProjetComponent implements OnInit {
  
 
  newProjectForm: FormGroup;
  showEditPopup: boolean = false;
  showConfirmation: boolean = false;
  projectToEdit: any;
  searchQuery: string = '';
  filteredProjects: any[] = [];
  projects: Array<{
    titre: string,
    projectstatus: string,
    client: string,
    team: string,
    debutdate: string,
    duedate: string,
    categorie: string,
    budget: string,
    actions: Array<{ type: string, callback: Function }>
  }> = [];
  openpopup: boolean = false;
  project: any;
  currentPage: number = 1;
  entriesPerPage: number = 3;
  isSortedAscending: boolean = true;
  listProjects: any;
  projectId = false;
  Data : any;
  showlistes = false;
  showlistesmodifier = false;
  showAddPopup: boolean = false;
  constructor(private projectService: ProjetService) {
    this.newProjectForm = new FormGroup({
      titre: new FormControl('', Validators.required),
      projectstatus: new FormControl('', Validators.required),
      client: new FormControl('', Validators.required),
      team: new FormControl('', Validators.required),
      debutdate: new FormControl('', Validators.required),
      duedate: new FormControl('', Validators.required),
      categorie: new FormControl('', Validators.required),
      budget: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.ListProjects();
    
  }

  ListProjects(): void {
    this.projectService.getListProjects().subscribe((data) => {
      console.log("data", data)
      this.listProjects = data;
      this.showlistes = true;
      this.projectId = true;
     
  })}

  toggleAddPopup(): void {
    this.showAddPopup = !this.showAddPopup;
  }

  handleClosePopup(): void {
    this.openpopup = false;
    this.showAddPopup = false;
    
  }
  

  addProject(): void {
    this.showlistes = false;
    this.ListProjects();
  }

  viewProject(project: any): void {
    this.project = project;
    this.openpopup = true;
  }

  openEditPopup(project: any): void {
    this.showEditPopup = true;
    this.Data = project
  
  }

  saveModifiedProject(): void {
    this.showlistes = false;
    this.ListProjects();
    this.projectId = false;
  }
  
  closeEditPopup(): void {
    this.showEditPopup = false;
  }

  deleteprojectConfirmation(project:any): void {
    this.showConfirmation = true;
    this.Data = project
   }

  deleteProject(): void {
    this.showConfirmation = false;
   
  }

  searchProject(): void {
    this.filteredProjects = this.projects.filter(project => {
      return (
        project.titre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        project.projectstatus.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
    this.currentPage = 1;
  }

  displayProjectDetails(project: any): void {
    const message = `
      Titre: ${project.titre}
      Projet Status: ${project.projetstatus}
      Client: ${project.client}
      Team: ${project.team}
      Debut Date: ${project.debutdate}
      Categorie: ${project.categorie}
      Budget: ${project.budget}
    `;
    alert(message);
  }

  // Pagination methods
  getProjectsForCurrentPage(): Array<any> {
    const startIndex = (this.currentPage - 1) * this.entriesPerPage;
    const endIndex = startIndex + this.entriesPerPage;
    return this.filteredProjects.slice(startIndex, endIndex);
  }

  getFirstEntryIndex(): number {
    return (this.currentPage - 1) * this.entriesPerPage + 1;
  }

  getLastEntryIndex(): number {
    const endIndex = this.currentPage * this.entriesPerPage;
    return endIndex > this.filteredProjects.length ? this.filteredProjects.length : endIndex;
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredProjects.length / this.entriesPerPage);
  }

  getPages(): Array<number> {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.getTotalPages()) {
      this.currentPage = newPage;
    }
  }

  // Method to handle entries per page change
  onEntriesPerPageChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.entriesPerPage = +selectedValue; // Convert the selected value to a number
    this.currentPage = 1; // Reset the current page to 1 when entries per page changes
  }

  // Method to handle sorting by name
  sortByName(): void {
    this.isSortedAscending = !this.isSortedAscending;
    this.filteredProjects.sort((a, b) => {
      const order = this.isSortedAscending ? 1 : -1;
      return a.titre.localeCompare(b.titre) * order;
    });
  }
}
