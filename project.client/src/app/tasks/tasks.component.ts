import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TacheService } from '../services/tache.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  newTaskForm: FormGroup;
  showEditPopup: boolean = false;
  showConfirmation: boolean = false;
  taskToDelete: any;
  taskToEdit: any;
  searchQuery: string = '';
  filteredTasks: any[] = [];
  tasks: Array<{
    NomTache: string,
    etat: string,
    membre: string,
    descriptionTache: string,
    dateecheance: string,
    actions: Array<{ type: string, callback: Function }>
  }> = [];
  openpopup: boolean = false;
  taskToShow: any;
  currentPage: number = 1;
  entriesPerPage: number = 3;
  showAddPopup: boolean = false;
  isSortedAscending: boolean = true;
  sortField: string = 'NomTache';
  tache: any;
  dbase : any;
  tacheId = false;
  showTaskList = false;
task:any;
  constructor(private tacheService: TacheService) {
    this.newTaskForm = new FormGroup({
      NomTache: new FormControl('', Validators.required),
      etat: new FormControl('', Validators.required),
      membre: new FormControl('', Validators.required),
      descriptionTache: new FormControl('', Validators.required),
      dateecheance: new FormControl('', Validators.required)
    });
  }
  
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.tacheService.getTasks().subscribe((dbase) => {
      console.log("tasks" ,dbase)
      this.tache= dbase
      this.showTaskList = true;
      this.tacheId = true;
    });
  }  

  toggleAddPopup(): void {
    this.showAddPopup = !this.showAddPopup;
  }

  handleClosePopup(): void {
    this.openpopup = false;
    this.showAddPopup = false;
  }

  closeEditPopup(): void {
    this.showEditPopup = false;
  }

  addTask(): void {
    this.showTaskList = false;
    this.getTasks();
    console.log (this.showTaskList)
  }

  viewTask(task: any): void {
    this.task = task;
    this.openpopup = true;
  }

  openEditPopup(task: any): void {
    this.showEditPopup = true;
    this.dbase = task;
  }

  saveModifiedTask(): void {
    this.showTaskList = false;
    this.getTasks();
    this.tacheId = false;
  }

  deleteTaskConfirmation(task: any): void {
    this.showConfirmation = true;
    this.dbase= task;
  }

  deleteTask(): void {
    this.showConfirmation = false;
  }

  displayTaskDetails(task: any): void {
    // Display details of the task
  }

  getTasksForCurrentPage(): Array<any> {
    const startIndex = (this.currentPage - 1) * this.entriesPerPage;
    const endIndex = startIndex + this.entriesPerPage;
    return this.tasks.slice(startIndex, endIndex);
  }

  getFirstEntryIndex(): number {
    return (this.currentPage - 1) * this.entriesPerPage + 1;
  }

  getLastEntryIndex(): number {
    const endIndex = this.currentPage * this.entriesPerPage;
    return endIndex > this.tasks.length ? this.tasks.length : endIndex;
  }

  getTotalPages(): number {
    return Math.ceil(this.tasks.length / this.entriesPerPage);
  }

  getPages(): Array<number> {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.getTotalPages()) {
      this.currentPage = newPage;
    }
  }

  onEntriesPerPageChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.entriesPerPage = +selectedValue; // Convert the selected value to a number
    this.currentPage = 1; // Reset the current page to 1 when entries per page changes
  }

  sortByName(): void {
    this.isSortedAscending = !this.isSortedAscending;
    this.tasks.sort((a, b) => {
      const order = this.isSortedAscending ? 1 : -1;
      return a.NomTache.localeCompare(b.NomTache) * order;
    });
  }
}