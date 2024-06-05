import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjetService } from '../services/projet.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-list-projet',
  templateUrl: './list-projet.component.html',
  styleUrls: ['./list-projet.component.css']
})
export class ListProjetComponent implements OnInit {
 
  paginatedProjects: any[] = [];
  currentPage: number = 1;
  entriesPerPage: number = 5;
  isSortedAscending: boolean = true;
 
  newProjectForm: FormGroup;
  showEditPopup: boolean = false;
  showConfirmation: boolean = false;
  projectToEdit: any;
  searchValue: string = '';
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
  constructor(private projectService: ProjetService, private authService: AuthService) {
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

  isAdmin: boolean = false;
  ngOnInit(): void {
    this.ListProjects();
    this.isAdmin = this.authService.getAdminStatus();
    
  }
  ListProjects(): void {
    this.projectService.getListProjects().subscribe((data) => {
      console.log("data", data)
      this.listProjects = data.data;
      
      this.showlistes = true;
      this.projectId = true;
     
  })}
  getnameteams(teams:any[]):string{
  return teams.map(team => team.nom).join(', ')}

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

  searchProjects(): void {
    const query = this.searchValue.trim().toLowerCase();
    if (query === '') {
      this.filteredProjects = this.listProjects;
    } else {
      this.filteredProjects = this.listProjects.filter((project: any) =>
        project.titre.toLowerCase().includes(query) ||
        project.projectstatus.toLowerCase().includes(query) ||
        project.client.toLowerCase().includes(query) ||
        (project.teams && project.teams.some((team: any) => team.nom.toLowerCase().includes(query))) ||
        project.debutdate.toLowerCase().includes(query) ||
        project.duedate.toLowerCase().includes(query) ||
        project.categorie.toLowerCase().includes(query) ||
        project.budget.toLowerCase().includes(query)
      );
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Prevent the default form submission
    this.searchProjects(); // Perform the search
    if (this.filteredProjects.length > 0) {
      this.displayProjectDetails(this.filteredProjects[0]);
    } else {
      alert('Aucun projet trouvé.');
    }
  }

  displayProjectDetails(project: any): void {
    const message = `
      Titre: ${project.titre}
      Projet Status: ${project.projectstatus}
      Client: ${project.client}
      Team: ${project.team}
      Debut Date: ${project.debutdate}
      Categorie: ${project.categorie}
      Budget: ${project.budget}
    `;
    prompt(message);
  }
  sortByName(): void {
    this.isSortedAscending = !this.isSortedAscending;
    this.listProjects.sort((a: { titre: string }, b: { titre: string }) => {
      const order = this.isSortedAscending ? 1 : -1;
      return a.titre.localeCompare(b.titre) * order;
    });
  }
  // Pagination methods
  getProjectsForCurrentPage():  Array<any> {
    const startIndex = (this.currentPage - 1) * this.entriesPerPage;
    const endIndex = startIndex + this.entriesPerPage;
    return this.listProjects.slice(startIndex, endIndex);
  }
  getFirstEntryIndex(): number {
    return (this.currentPage - 1) * this.entriesPerPage + 1;
  }
  getLastEntryIndex():any {
    console.log('afficher liste projet',this.listProjects)
  const endIndex = this.currentPage * this.entriesPerPage;
    return endIndex > this.listProjects.length ? this.listProjects.length : endIndex;
    

  }
  
  changePage(newPage: number, event: Event): void {
    event.preventDefault(); // Empêche le comportement de navigation par défaut du lien
    if (newPage >= 1 && newPage <= this.getTotalPages()) {
      this.currentPage = newPage;
      // Refresh the paginated projects
      this.paginatedProjects = this.getProjectsForCurrentPage();
    }
}

  onEntriesPerPageChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.entriesPerPage = +selectedValue; // Convert the selected value to a number
    this.currentPage = 1; // Reset to the first page whenever the entries per page change
    // Refresh the paginated projects
    this.paginatedProjects = this.getProjectsForCurrentPage();
  }

  getTotalPages(): number {
    return Math.ceil(this.listProjects.length / this.entriesPerPage);
  }

  getPages(): number[] {
    const totalPages = this.getTotalPages();
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }
}