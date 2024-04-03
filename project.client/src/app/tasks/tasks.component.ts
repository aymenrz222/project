import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Interface Employee pour représenter un employé

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  newEmployeeForm: FormGroup;
  employees: Array<{ name: string, firstName: string, cin: string, actions: Array<{ type: string, callback: Function }> }> = [];
  filteredEmployees: any[] = [];
  searchQuery: string = '';
  openpopup: boolean = false;
  employeer: any;
  showConfirmation: boolean = false;
  employeeToDelete: any;
  showEditPopup: boolean = false;
  employeeToEdit: any;
  currentPage: number = 1;
  entriesPerPage: number = 2; // Nombre d'éléments à afficher par page
  sortDirection: number = 1; // 1 pour trier de A à Z, -1 pour trier de Z à A
  sortField: string = 'name';
  
  showPopup: boolean = false;
  showAddPopup: boolean = false;
  isSortedAscending: boolean = true;
  constructor() {
    this.newEmployeeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      cin: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      dueDate:new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
   
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
  checkDuplicateEmployee(cin: string): boolean {
    return this.employees.some(employee => employee.cin === cin);
  }

  addEmployee(newEmployeeData: any): void {
    const { nom, prenom, cin, age, telephone, duedate, description, category, pudget, } = newEmployeeData;
    const statusElement = document.querySelector('input[name="status"]:checked');
    const status = statusElement ? prenom.value : 'En cours'; // Valeur par défaut si aucun bouton n'est sélectionné
   

    
    // Check if all required fields are filled
   

    // Check if CIN is unique
 

  
        const newEmployee = {
            name: nom,
            firstName: prenom,
            cin: cin,
            age: age,
            phoneNumber: telephone,
            dueDate: duedate,
            description: description,
            category: category,
            budget: pudget,
            status: status, // Include the project status
            actions: [
                { type: 'view', callback: this.viewEmployee.bind(this) },
                { type: 'edit', callback: this.openEditPopup.bind(this) },
                { type: 'delete', callback: this.deleteEmployeeConfirmation.bind(this) }
            ]
        };

        // Only add the employee if the CIN is unique
        this.employees.push(newEmployee);
    }


  viewEmployee(employee: { name: string, firstName: string, cin: string }): void {
    this.employeer = employee;
    this.openpopup = true;
  }

 
  openEditPopup(employee: any): void {
    this.showEditPopup = true;
    this.employeeToEdit = employee;
  }

  saveModifiedEmployee(newEmployeeData: any): void {
    const { nom, prenom, cin, age, telephone,duedate} = newEmployeeData;
   
    this.employeeToEdit.name = nom;
    this.employeeToEdit.firstName = prenom;
    this.employeeToEdit.cin = cin;
    this.employeeToEdit.age = age;
    
    this.employeeToEdit.phoneNumber = telephone;

    this.showEditPopup = false;
  }
  deleteEmployeeConfirmation(employee: any): void {
    this.showConfirmation = true;
    this.employeeToDelete = employee;
  }

  deleteEmployee(confirmed: boolean): void {
    if (confirmed) {
      const index = this.employees.indexOf(this.employeeToDelete);
      if (index > -1) {
        this.employees.splice(index, 1);
      }
    }
    this.showConfirmation = false;
  
  }


  searchEmployee(): void {
    // Filtrer les employés en fonction du terme de recherche
    this.filteredEmployees = this.employees.filter(employee => {
      return (
        employee.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        employee.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        employee.cin.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
  
  // Afficher les résultats de la recherche dans le tableau
  this.currentPage = 1; // Revenir à la première page
}
  

  displayEmployeeDetails(employee: any): void {
    const message = `
      Name: ${employee.name}
      First Name: ${employee.firstName}
      CIN: ${employee.cin}
      Age: ${employee.age}
      Email: ${employee.email}
      Phone Number: ${employee.phoneNumber}
    `;

    alert(message);
  }

 getEmployeesForCurrentPage(): Array<any> {
    const startIndex = (this.currentPage - 1) * this.entriesPerPage;
    const endIndex = startIndex + this.entriesPerPage;
    return this.employees.slice(startIndex, endIndex);
  }

  getFirstEntryIndex(): number {
    return (this.currentPage - 1) * this.entriesPerPage + 1;
  }

  getLastEntryIndex(): number {
    const endIndex = this.currentPage * this.entriesPerPage;
    return endIndex > this.employees.length ? this.employees.length : endIndex;
  }

  getTotalPages(): number {
    return Math.ceil(this.employees.length / this.entriesPerPage);
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
    // Handle the selected value as needed
    console.log('Selected entries per page:', selectedValue);
    this.entriesPerPage = +selectedValue; // Convert the selected value to a number
    this.currentPage =1; // Reset the current page to 1 when entries per page changes
  }

  // Method to handle sorting by name
  sortByName(): void {
    this.isSortedAscending = !this.isSortedAscending;
    this.employees.sort((a, b) => {
      const order = this.isSortedAscending ? 1 : -1;
      return a.name.localeCompare(b.name) * order;
    });
  }
}
