import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjetService } from '../services/projet.service';

@Component({
  selector: 'app-list-projet',
  templateUrl: './list-projet.component.html',
  styleUrls: ['./list-projet.component.css']
})
export class ListProjetComponent implements OnInit {
 
  paginatedProjects: any[] = [];
  currentPage: number = 1;
  entriesPerPage: number = 3;
  isSortedAscending: boolean = true;
 
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
      this.paginateProjects();
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
  paginateProjects(): void {
    const startIndex = (this.currentPage - 1) * this.entriesPerPage;
    const endIndex = startIndex + this.entriesPerPage;
    this.paginatedProjects = this.projects.slice(startIndex, endIndex);
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.paginateProjects();
  }

  onEntriesPerPageChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.entriesPerPage = +selectedValue;
    this.currentPage = 1;
    this.paginateProjects();
  }

  sortByName(): void {
    this.isSortedAscending =!this.isSortedAscending;
    this.projects.sort((a, b) => {
      const order = this.isSortedAscending? 1 : -1;
      return a.titre.localeCompare(b.titre) * order;
    });
    this.paginateProjects();
  }
  getTotalPages(): number {
    return Math.ceil(this.projects.length / this.entriesPerPage);
  }
  
  getPages(): number[] {
    const totalPages = this.getTotalPages();
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }
  

 

 
}

